#!/usr/bin/env python3
"""Build src/data/expertise-landscape.json, the scene behind /expertise, from the ledger.

Sources, all under content/:
  expertise/fields.yaml                 the fields (one mesa each)
  papers/*.md  blogs/*.md  projects/*.md written and published entries, via `fields:` in frontmatter
  expertise/reading.yaml                read and to-read entries, plus placeholder counts while the ledger is thin
  expertise/bib/<paper-slug>.bib        cited entries: each paper's reference list, tagged with that paper's fields

Rules (council rounds 4 and 7, docs/expertise-landscape/):
  one layer per entry, the highest reached; an entry counts once in every field it is tagged with;
  a field's stack is built from its own counts and never altered by sharing;
  two fields join at a layer only as far as they share entries at that layer (exact-layer spans);
  layout collides on the cited shore: 10 units apart when the pair shares anything, 36 when not;
  no span over a third field; the build fails loudly when the rules cannot be met.

Run:  python3 scripts/build-landscape.py        (numpy and pyyaml; the site build only reads the JSON)
"""
import itertools, json, math, random, re, sys
from datetime import date
from pathlib import Path

import numpy as np
import yaml
from numpy.lib.stride_tricks import sliding_window_view

ROOT = Path(__file__).resolve().parents[1]
CONTENT, EXP = ROOT / 'content', ROOT / 'content' / 'expertise'
OUT = ROOT / 'src' / 'data' / 'expertise-landscape.json'
MAT = json.loads((ROOT / 'src' / 'data' / 'materials.json').read_text())

W, H, STEP, ZS = 900, 520, 2, 12                 # canvas, heightfield cell, vertical shear per layer
WMIN, WUNIT = 4.0, 5.2                            # bench width = WMIN + WUNIT * log2(1 + count)
LAYERS = MAT['layers']                            # bottom to top: to-read, cited, read, written, published
L, LI = len(LAYERS), {name: i for i, name in enumerate(MAT['layers'])}
LAND = LI['cited']                                # the lowest land terrace; fields collide on this shore
GAP_SHARE, GAP_APART = 10, 36                     # shore-to-shore gaps: pairs that share, pairs that do not
SPAN_SCALE, SPAN_MIN, SLAB = 0.5, 3.0, 0.35       # span half-width = SCALE * smaller radius * share; min drawn; lone slab rise
PULL = {'to-read': 0.3, 'cited': 1.0, 'read': 1.0, 'written': 0.5, 'published': 0.35}   # layout pull per shared entry
SHOW = {'to-read': 'TO READ'}                     # bench label spelling where it differs from the id


def fail(msg):
    sys.exit('build-landscape: ' + msg)


# ---------------------------------------------------------------- fields
cfg = yaml.safe_load((EXP / 'fields.yaml').read_text())
FIELDS = [f['id'] for f in cfg['fields']]
TITLE = {f['id']: f['title'] for f in cfg['fields']}
if len(set(FIELDS)) != len(FIELDS):
    fail('fields.yaml: duplicate id')


def check_fields(fs, where):
    if not fs:
        fail(f'{where}: needs a fields: tag (ids from content/expertise/fields.yaml)')
    bad = [f for f in fs if f not in TITLE]
    if bad:
        fail(f'{where}: unknown field id(s) {bad}; see content/expertise/fields.yaml')
    return set(fs)


# ---------------------------------------------------------------- entries, one per work
entries, alias = [], {}


def norm(t):
    return re.sub(r'[^a-z0-9]+', ' ', (t or '').lower()).strip()


def keys_of(e):
    ks = []
    if e.get('doi'):
        ks.append('doi:' + str(e['doi']).lower().strip().replace('https://doi.org/', ''))
    if e.get('arxiv'):
        ks.append('arxiv:' + re.sub(r'v\d+$', '', str(e['arxiv']).lower().strip()))
    if e.get('title'):
        ks.append('t:' + norm(e['title']))
    return ks


def record(e, where):
    ks = keys_of(e)
    if not ks or not e.get('title'):
        fail(f'{where}: entry needs a title')
    hit = next((alias[k] for k in ks if k in alias), None)
    if hit is None:
        entries.append(e); hit = e
    elif hit.get('own'):
        if e.get('own'):
            fail(f'{where}: {e["title"]!r} appears twice in content/')
        # a reference to one of my own works adds nothing: it is already written or published
    elif e.get('own'):
        hit.clear(); hit.update(e)
    else:
        hit['fields'] |= e['fields']
        if e['layer'] > hit['layer']:
            for k, v in e.items():
                if k != 'fields':
                    hit[k] = v
    for k in ks:
        alias[k] = hit


def frontmatter(p):
    t = p.read_text(encoding='utf-8')
    if not t.startswith('---'):
        fail(f'{p}: no frontmatter')
    end = t.find('\n---', 3)
    if end < 0:
        fail(f'{p}: unterminated frontmatter')
    return yaml.safe_load(t[3:end]) or {}


def year_of(v):
    m = re.match(r'(\d{4})', str(v or ''))
    return int(m.group(1)) if m else None


def first_sentence(s, n=220):
    s = re.sub(r'\s+', ' ', str(s or '')).strip()
    m = re.match(r'(.+?[.!?])(\s|$)', s)
    s = m.group(1) if m else s
    return s if len(s) <= n else s[:n - 1].rstrip() + '…'


PAPER_FIELDS = {}
for folder, material, href in (('papers', 'paper', '/papers/'), ('blogs', 'post', '/blogs/'), ('projects', 'system', '/projects/')):
    for p in sorted((CONTENT / folder).glob('*.md')):
        if p.name.startswith('_'):
            continue
        fm, where = frontmatter(p), f'content/{folder}/{p.name}'
        fs = check_fields(fm.get('fields'), where)
        mat = material
        if folder == 'papers' and ('patent' in str(fm.get('venue', '')).lower() or 'Patents' in (fm.get('tags') or [])):
            mat = 'patent'
        draft = bool(fm.get('draft'))
        layer = LI[MAT['draft_layer'] if draft else MAT['materials'][mat]['layer']]
        summary = fm.get('oneLiner') or fm.get('description') or fm.get('summary') or fm.get('abstract')
        record(dict(own=True, title=str(fm['title']).strip(), year=year_of(fm.get('date')), layer=layer, fields=fs, material=mat,
                    public=not draft, slug=p.stem, href=href + p.stem + '/', summary=first_sentence(summary),
                    authors=fm.get('authors'), venue=fm.get('venue'), doi=fm.get('doi'), arxiv=fm.get('arxivId')), where)
        if folder == 'papers':
            PAPER_FIELDS[p.stem] = fs

reading = yaml.safe_load((EXP / 'reading.yaml').read_text()) or {}
for i, r in enumerate(reading.get('entries') or []):
    where = f'content/expertise/reading.yaml entry {i + 1}'
    if r.get('layer') not in ('read', 'to-read'):
        fail(f'{where}: layer must be read or to-read (cited entries come from bib/)')
    record(dict(own=False, title=str(r.get('title', '')).strip(), year=r.get('year'), layer=LI[r['layer']],
                fields=check_fields(r.get('fields'), where), authors=r.get('authors'), url=r.get('url'),
                doi=r.get('doi'), arxiv=r.get('arxiv')), where)


def parse_bib(text):
    """Minimal BibTeX reader: entry type, then name = {value} | "value" | bare pairs. Braces may nest."""
    out, i, n = [], 0, len(text)
    while True:
        at = text.find('@', i)
        if at < 0:
            break
        m = re.match(r'@(\w+)\s*\{', text[at:])
        if not m:
            i = at + 1; continue
        typ, j = m.group(1).lower(), at + m.end()
        depth, start = 1, j
        while j < n and depth:
            depth += {'{': 1, '}': -1}.get(text[j], 0); j += 1
        body, i = text[start:j - 1], j
        if typ in ('comment', 'preamble', 'string'):
            continue
        rest = body[body.find(',') + 1:] if ',' in body else ''
        fields, k = {}, 0
        while k < len(rest):
            mm = re.match(r'\s*([\w\-:]+)\s*=\s*', rest[k:])
            if not mm:
                nxt = rest.find(',', k)
                if nxt < 0:
                    break
                k = nxt + 1; continue
            name, k = mm.group(1).lower(), k + mm.end()
            if k >= len(rest):
                break
            if rest[k] == '{':
                d, s = 1, k + 1; k += 1
                while k < len(rest) and d:
                    d += {'{': 1, '}': -1}.get(rest[k], 0); k += 1
                val = rest[s:k - 1]
            elif rest[k] == '"':
                s = k + 1; k = rest.find('"', s); k = len(rest) if k < 0 else k
                val = rest[s:k]; k += 1
            else:
                mm2 = re.match(r'[^,]*', rest[k:]); val = mm2.group(0); k += mm2.end()
            fields[name] = re.sub(r'\s+', ' ', val.replace('{', '').replace('}', '')).strip()
            nxt = rest.find(',', k)
            if nxt < 0:
                break
            k = nxt + 1
        out.append(fields)
    return out


for p in sorted((EXP / 'bib').glob('*.bib')):
    if p.stem not in PAPER_FIELDS:
        fail(f'{p}: no paper content/papers/{p.stem}.md; name the .bib after the paper it belongs to')
    for i, b in enumerate(parse_bib(p.read_text(encoding='utf-8', errors='replace'))):
        if not b.get('title'):
            continue
        arx = b.get('eprint') if 'arxiv' in (b.get('archiveprefix', '') + b.get('eprinttype', '')).lower() else None
        if not arx:
            mm = re.search(r'(\d{4}\.\d{4,5})', ' '.join(b.get(k, '') for k in ('journal', 'url', 'note', 'howpublished')))
            arx = mm.group(1) if mm else None
        record(dict(own=False, title=b['title'], year=year_of(b.get('year')), layer=LI['cited'], fields=set(PAPER_FIELDS[p.stem]),
                    authors=b.get('author'), doi=b.get('doi'), arxiv=arx, url=b.get('url')), f'{p} entry {i + 1}')

# ---------------------------------------------------------------- counts per field and per pair, then placeholders
n = {f: [0] * L for f in FIELDS}
m = {}
for e in entries:
    for f in e['fields']:
        n[f][e['layer']] += 1
    for a, b in itertools.combinations(sorted(e['fields']), 2):
        m.setdefault((a, b), [0] * L)[e['layer']] += 1

PH_LAYERS = ('to-read', 'cited', 'read')
ph = reading.get('placeholders') or {}
ph_flag = {f: [False] * L for f in FIELDS}
for f, counts in (ph.get('counts') or {}).items():
    if f not in TITLE:
        fail(f'reading.yaml placeholders.counts: unknown field {f}')
    for lname, v in (counts or {}).items():
        if lname not in PH_LAYERS:
            fail(f'reading.yaml placeholders: only {PH_LAYERS} may have placeholders ({f}: {lname})')
        k = LI[lname]
        if n[f][k] == 0 and v:
            n[f][k] = int(v); ph_flag[f][k] = True
for s in (ph.get('shared') or []):
    fs = sorted(check_fields(s.get('fields'), 'reading.yaml placeholders.shared'))
    if len(fs) != 2:
        fail('reading.yaml placeholders.shared: exactly two fields per line')
    a, b = fs
    for lname, v in (s.get('counts') or {}).items():
        if lname not in PH_LAYERS:
            fail(f'reading.yaml placeholders.shared {a}+{b}: only {PH_LAYERS} may have placeholders')
        k = LI[lname]
        if ph_flag[a][k] and ph_flag[b][k] and v:
            if int(v) > min(n[a][k], n[b][k]):
                fail(f'reading.yaml placeholders.shared {a}+{b} {lname}: {v} exceeds the smaller count')
            m.setdefault((a, b), [0] * L)[k] = int(v)
m = {p: v for p, v in m.items() if sum(v) > 0}
PLACEHOLDERS = sorted(f'{f} {LAYERS[k]}' for f in FIELDS for k in range(L) if ph_flag[f][k])
for f in FIELDS:
    if sum(n[f]) == 0:
        fail(f'field {f!r} has no entries at any layer; tag something with it or remove it from fields.yaml')

# ---------------------------------------------------------------- radii and the warped outline
def widths(c):
    return [WMIN + WUNIT * math.log2(1 + v) if v > 0 else 0.0 for v in c]


R = {f: [sum(widths(n[f])[k:]) for k in range(L)] for f in FIELDS}


def phase(key):
    return (sum(ord(ch) * (i + 7) for i, ch in enumerate(key)) % 360) * math.pi / 180


def warp(key, th):
    p_ = phase(key)
    return 1 + 0.16 * math.sin(3 * th + p_) + 0.09 * math.sin(5 * th + 2.3 * p_) + 0.05 * math.sin(7 * th - p_)


def edge(key, k, th):
    """Distance from the field centre to its layer-k ring in direction th (the outline is warped)."""
    return R[key][k] / warp(key, th)


sharing = set(m)


def rho_of(counts, a, b, k):
    s = counts[(a, b)][k]
    if s <= 0:
        return 0.0, None
    small = a if n[a][k] <= n[b][k] else b
    if n[small][k] == 0:
        fail(f'{a}–{b} share {s} {LAYERS[k]} entries but {small} has none at that layer')
    return SPAN_SCALE * R[small][k] * min(1.0, s / n[small][k]), small


corridor = {p: max([rho_of(m, *p, k)[0] for k in range(1, L)] + [0.0]) + 4 for p in sharing}
strength = {p: 1 + min(1.0, sum(PULL[LAYERS[k]] * v for k, v in enumerate(m[p])) / 15) for p in sharing}

# ---------------------------------------------------------------- layout on the cited shore, then locked
def seg_dist(px, py, ax, ay, bx, by):
    vx, vy = bx - ax, by - ay
    ll = vx * vx + vy * vy or 1e-9
    t = max(0.0, min(1.0, ((px - ax) * vx + (py - ay) * vy) / ll))
    qx, qy = ax + t * vx, ay + t * vy
    return math.hypot(px - qx, py - qy), qx, qy


def min_dist(pos, a, b):
    th = math.atan2(pos[b][1] - pos[a][1], pos[b][0] - pos[a][0])
    return edge(a, LAND, th) + edge(b, LAND, th + math.pi) + (GAP_SHARE if (a, b) in sharing else GAP_APART)


def layout(seed):
    rnd = random.Random(seed)
    pos = {f: [W / 2 + rnd.uniform(-160, 160), H / 2 + rnd.uniform(-90, 90)] for f in FIELDS}
    pairs = list(itertools.combinations(FIELDS, 2))
    for _ in range(4000):
        for a, b in pairs:                                    # pull sharing pairs to the shore gap, push the rest apart
            pa, pb = pos[a], pos[b]
            dx, dy = pb[0] - pa[0], pb[1] - pa[1]
            d = math.hypot(dx, dy) or 1e-6
            ux, uy = dx / d, dy / d
            md = min_dist(pos, a, b)
            if (a, b) in sharing:
                f = 0.08 * strength[(a, b)] * (d - md)
            else:
                f = 0.06 * (d - md) if d < md else 0.0
            pa[0] += f * ux; pa[1] += f * uy; pb[0] -= f * ux; pb[1] -= f * uy
        for a, b in sharing:                                  # keep every third field out of the span corridor
            for c in FIELDS:
                if c in (a, b):
                    continue
                d, qx, qy = seg_dist(pos[c][0], pos[c][1], *pos[a], *pos[b])
                need = R[c][LAND] * 1.45 + corridor[(a, b)]
                if d < need:
                    if d < 1e-6:
                        nx, ny = -(pos[b][1] - pos[a][1]), pos[b][0] - pos[a][0]
                        nn = math.hypot(nx, ny) or 1.0; nx, ny = nx / nn, ny / nn
                    else:
                        nx, ny = (pos[c][0] - qx) / d, (pos[c][1] - qy) / d
                    push = 0.5 * (need - d)
                    pos[c][0] += push * nx; pos[c][1] += push * ny
        for a, b in pairs:                                    # hard projection: no two shores closer than allowed
            pa, pb = pos[a], pos[b]
            dx, dy = pb[0] - pa[0], pb[1] - pa[1]
            d = math.hypot(dx, dy) or 1e-6
            md = min_dist(pos, a, b)
            if d < md - 0.01:
                push, ux, uy = (md - d) / 2, dx / d, dy / d
                pa[0] -= push * ux; pa[1] -= push * uy; pb[0] += push * ux; pb[1] += push * uy
        cx = sum(p[0] for p in pos.values()) / len(pos); cy = sum(p[1] for p in pos.values()) / len(pos)
        for p in pos.values():
            p[0] += (W / 2 - cx) * 0.1; p[1] += (H / 2 + 24 - cy) * 0.1
    bad = []
    for a, b in pairs:
        d, md = math.dist(pos[a], pos[b]), min_dist(pos, a, b)
        if (a, b) in sharing and d > md + 8:
            bad.append(f'{a} and {b} share entries but sit {d - md:.0f} units apart at the shore')
        if d < md - 1:
            bad.append(f'{a} and {b} overlap by {md - d:.0f} units')
    for a, b in sharing:
        for c in FIELDS:
            if c not in (a, b) and seg_dist(pos[c][0], pos[c][1], *pos[a], *pos[b])[0] < R[c][LAND] * 1.45 + corridor[(a, b)] - 1:
                bad.append(f'{c} lies under the {a}–{b} span')
    err = sum((math.dist(pos[a], pos[b]) - min_dist(pos, a, b)) ** 2 for a, b in sharing)
    return pos, bad, err


pos, bad, _ = min((layout(s) for s in range(8)), key=lambda t: (len(t[1]), t[2]))
if bad:
    fail('layout cannot satisfy the rules:\n  ' + '\n  '.join(bad))
C = {f: (round(pos[f][0]), round(pos[f][1])) for f in FIELDS}
CX = sum(c[0] for c in C.values()) / len(C); CY = sum(c[1] for c in C.values()) / len(C)

# ---------------------------------------------------------------- heightfield from the fields alone
NX, NY = W // STEP + 1, H // STEP + 1
X, Y = np.meshgrid(np.arange(NX) * STEP, np.arange(NY) * STEP)
Z = np.zeros_like(X, dtype=float)
for f in FIELDS:
    cx, cy = C[f]
    dx, dy = X - cx, Y - cy
    th, p_ = np.arctan2(dy, dx), phase(f)
    d = np.hypot(dx, dy) * (1 + 0.16 * np.sin(3 * th + p_) + 0.09 * np.sin(5 * th + 2.3 * p_) + 0.05 * np.sin(7 * th - p_))
    for k in range(L):
        if R[f][k] > 0:
            Z = np.maximum(Z, np.where(d <= R[f][k], k + 1, 0))


def blur(A, rad=2):
    P = np.pad(A, rad, mode='edge'); k = 2 * rad + 1
    return sliding_window_view(P, (k, k)).mean(axis=(2, 3))


F = blur(blur(Z, 2), 1)

# ---------------------------------------------------------------- marching squares, ring chaining, simplification
CASES = {1: [('L', 'B')], 2: [('B', 'R')], 3: [('L', 'R')], 4: [('T', 'R')], 5: [('T', 'L'), ('B', 'R')], 6: [('T', 'B')], 7: [('T', 'L')],
         8: [('T', 'L')], 9: [('T', 'B')], 10: [('T', 'R'), ('B', 'L')], 11: [('T', 'R')], 12: [('L', 'R')], 13: [('B', 'R')], 14: [('L', 'B')]}


def rings_at(lv):
    segs = []
    for j in range(NY - 1):
        for i in range(NX - 1):
            a, b, c, d = F[j, i], F[j, i + 1], F[j + 1, i + 1], F[j + 1, i]
            idx = (8 if a > lv else 0) | (4 if b > lv else 0) | (2 if c > lv else 0) | (1 if d > lv else 0)
            if idx in (0, 15):
                continue
            x0, y0 = i * STEP, j * STEP
            t = lambda p, q: (lv - p) / (q - p) if q != p else 0.5
            E = {'T': (x0 + t(a, b) * STEP, y0), 'R': (x0 + STEP, y0 + t(b, c) * STEP), 'B': (x0 + t(d, c) * STEP, y0 + STEP), 'L': (x0, y0 + t(a, d) * STEP)}
            for e1, e2 in CASES[idx]:
                segs.append((E[e1], E[e2]))
    key = lambda p: (round(p[0] * 100), round(p[1] * 100))
    at = {}
    for i, s in enumerate(segs):
        at.setdefault(key(s[0]), []).append(i); at.setdefault(key(s[1]), []).append(i)
    used, out = [False] * len(segs), []
    for i in range(len(segs)):
        if used[i]:
            continue
        used[i] = True
        ring, cur, start = [segs[i][0], segs[i][1]], segs[i][1], key(segs[i][0])
        for _ in range(len(segs)):
            k = key(cur)
            if k == start:
                break
            cand = next((j for j in at.get(k, []) if not used[j]), None)
            if cand is None:
                break
            used[cand] = True
            s = segs[cand]
            cur = s[1] if key(s[0]) == k else s[0]
            ring.append(cur)
        if len(ring) > 16:
            out.append(ring)
    return out


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    nrm = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / nrm
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]


def simplify_ring(ring, eps):
    pts = ring[:-1] if ring[0] == ring[-1] else list(ring)
    i = max(range(len(pts)), key=lambda j: (pts[j][0] - pts[0][0]) ** 2 + (pts[j][1] - pts[0][1]) ** 2)
    a = rdp(pts[:i + 1], eps); b = rdp(pts[i:] + [pts[0]], eps)
    return a[:-1] + b[:-1]


def fmt(x, y):
    return f'{x:.0f} {y:.0f}'


def P(x, y, z):
    return (x, y - z * ZS)


LIGHT = (-0.707, 0.707)        # light from the lower left, the plan-oblique convention


def ring_paths(ring, z, rise=None):
    """Riser strips (west lit, east shade), the deck, and Tanaka lit/shade edge strokes for one ring at height z."""
    rise = ZS if rise is None else rise
    top = [P(x, y, z) for x, y in ring]; nn_ = len(top)
    A = sum(top[i][0] * top[(i + 1) % nn_][1] - top[(i + 1) % nn_][0] * top[i][1] for i in range(nn_))
    sgn = 1 if A > 0 else -1
    side, lit = [], []
    for i in range(nn_):
        p, q = top[i], top[(i + 1) % nn_]
        dx, dy = q[0] - p[0], q[1] - p[1]
        nx, ny = sgn * dy, -sgn * dx
        nl = math.hypot(nx, ny) or 1e-9
        nx, ny = nx / nl, ny / nl
        side.append(None if ny <= 0 else ('w' if nx < 0 else 'e'))
        dot = nx * LIGHT[0] + ny * LIGHT[1]
        lit.append('L' if dot > 0.25 else 'S' if dot < -0.25 else None)

    def strips(cls, extrude):
        out = {}
        start = next((i for i in range(nn_) if cls[i] != cls[i - 1]), 0); i = 0
        while i < nn_:
            k = (start + i) % nn_; s = cls[k]
            if s is None:
                i += 1; continue
            run = [k]
            while i + len(run) < nn_ and cls[(start + i + len(run)) % nn_] == s:
                run.append((start + i + len(run)) % nn_)
            pts = [top[j] for j in run] + [top[(run[-1] + 1) % nn_]]
            if extrude:
                d = 'M' + 'L'.join(fmt(x, y) for x, y in pts) + 'L' + 'L'.join(fmt(x, y + rise) for x, y in reversed(pts)) + 'Z'
            else:
                d = 'M' + 'L'.join(fmt(x, y) for x, y in pts)
            out.setdefault(s, []).append(d); i += len(run)
        return out

    ris, tan = strips(side, True), strips(lit, False)
    return ''.join(ris.get('w', [])), ''.join(ris.get('e', [])), 'M' + 'L'.join(fmt(x, y) for x, y in top) + 'Z', ''.join(tan.get('L', [])), ''.join(tan.get('S', []))


def point_in(poly, x, y):
    inside, nn_ = False, len(poly)
    for i in range(nn_):
        (xa, ya), (xb, yb) = poly[i], poly[(i + 1) % nn_]
        if (ya > y) != (yb > y) and x < (xb - xa) * (y - ya) / (yb - ya + 1e-12) + xa:
            inside = not inside
    return inside


# ---------------------------------------------------------------- spans to draw: a three-field entry joins along a spanning tree
m_draw = {p: list(v) for p, v in m.items()}
for e in entries:
    fs = sorted(e['fields'])
    if len(fs) < 3:
        continue
    k = e['layer']
    for a, b in itertools.combinations(fs, 2):
        m_draw[(a, b)][k] -= 1
    tree, rest = [fs[0]], fs[1:]
    while rest:
        a, b = min(((t, r) for t in tree for r in rest), key=lambda ab: math.dist(C[ab[0]], C[ab[1]]))
        m_draw[tuple(sorted((a, b)))][k] += 1
        tree.append(b); rest.remove(b)

# ---------------------------------------------------------------- paint order: shelf, then per level the terraces and their spans
TER, SPANS, SHARES, ring_store = [], [], [], {}


def add(cls, d, k):
    TER.append(dict(c=cls, d=d, k=k))


for ring in rings_at(0.5):
    add('shelf', 'M' + 'L'.join(fmt(x, y) for x, y in simplify_ring(ring, 0.9)) + 'Z', 1)
drawn_below = {}
for z in range(1, L):                                             # cited (1) up to published (4); the shelf is 0
    for ring in rings_at(z + 0.5):
        simp = simplify_ring(ring, 0.9)
        ring_store.setdefault(z, []).append(simp)
        w, e_, t, lit, shd = ring_paths(simp, z)
        k = z + 1
        if w: add(f'rw r{k}', w, k)
        if e_: add(f're r{k}', e_, k)
        add(f'tp t{k}', t, k)
        if lit: add('tk lit', lit, k)
        if shd: add('tk shd', shd, k)
    for (a, b), mm in sorted(m_draw.items()):
        s = mm[z]
        if s <= 0:
            continue
        rho, small = rho_of(m_draw, a, b, z)
        drawn = rho >= SPAN_MIN
        SHARES.append(dict(a=a, b=b, layer=LAYERS[z], n=s, of=n[small][z], drawn=drawn))
        if not drawn:
            continue
        (ax, ay), (bx, by) = C[a], C[b]
        th = math.atan2(by - ay, bx - ax)
        ux, uy = math.cos(th), math.sin(th); nx, ny = -uy, ux
        ra, rb = edge(a, z, th) - 3, edge(b, z, th + math.pi) - 3
        pa, pb = (ax + ux * ra, ay + uy * ra), (bx - ux * rb, by - uy * rb)
        poly = [(pa[0] + nx * rho, pa[1] + ny * rho), (pb[0] + nx * rho, pb[1] + ny * rho), (pb[0] - nx * rho, pb[1] - ny * rho), (pa[0] - nx * rho, pa[1] - ny * rho)]
        rise = ZS if drawn_below.get((a, b)) == z - 1 else SLAB * ZS   # a wall when the layer below is shared too
        w, e_, t, _, _ = ring_paths(poly, z, rise)
        k = z + 1
        if w: add(f'rw r{k} span', w, k)
        if e_: add(f're r{k} span', e_, k)
        add(f'tp t{k} span', t, k)
        q = [P(x, y, z) for x, y in poly]
        add('tk edge span', f'M{fmt(*q[0])}L{fmt(*q[1])}M{fmt(*q[3])}L{fmt(*q[2])}', k)   # long edges only: no seam where it lands
        drawn_below[(a, b)] = z
        SPANS.append(dict(a=a, b=b, layer=LAYERS[z], n=s, of=n[small][z], half_width=round(rho, 1),
                          mid=[round((pa[0] + pb[0]) / 2, 1), round((pa[1] + pb[1]) / 2 - z * ZS, 1)],
                          u=[round(ux, 3), round(uy, 3)], length=round(math.dist(pa, pb), 1)))

# ---------------------------------------------------------------- items: numbered marks on their bench, shared ones on their span
PITCH, MARGIN, ROWGAP = MAT['placement']['pitch'], MAT['placement']['margin'], MAT['placement']['row_gap']


def bench_rows(key, lay):
    """Rows of candidate x positions on the bench of layer `lay` for field `key`, front (south) rows first,
    inside the field's own footprint so a shared terrace never pulls an item toward a neighbour."""
    cx, cy = C[key]
    outer = next((r for r in ring_store.get(lay, []) if point_in(r, cx, cy)), None)
    if outer is None:
        return []
    inner = next((r for r in ring_store.get(lay + 1, []) if point_in(r, cx, cy)), None)
    Rr = R[key][lay] + MARGIN

    def ok(x, y):
        if math.hypot(x - cx, y - cy) > Rr:
            return False
        for dx, dy in ((0, 0), (MARGIN, 0), (-MARGIN, 0), (0, MARGIN), (0, -MARGIN)):
            if not point_in(outer, x + dx, y + dy):
                return False
            if inner is not None and point_in(inner, x + dx, y + dy):
                return False
        return True

    rows, y = [], cy + Rr - MARGIN - 2
    while y > cy - Rr + MARGIN:
        xs = [x for x in range(int(cx - Rr), int(cx + Rr) + 1, PITCH) if ok(x, y)]
        best, run = [], []
        for x in xs:
            if run and x - run[-1] > PITCH:
                if len(run) > len(best):
                    best = run
                run = []
            run.append(x)
        if len(run) > len(best):
            best = run
        if len(best) >= 2:
            rows.append((y, best))
        y -= ROWGAP
    return rows


own = sorted([e for e in entries if e.get('own')], key=lambda e: (e['year'] or 0, e['title']))
for idx, e in enumerate(own, start=1):
    e['i'] = idx
items = []


def emit(e, x, y, z):
    mt = MAT['materials'][e['material']]
    home = next(f for f in FIELDS if f in e['fields'])
    items.append(dict(i=e['i'], f=home, fields=[f for f in FIELDS if f in e['fields']], type=e['material'], year=e['year'], name=e['title'],
                      x=round(x, 1), y=round(y, 1), lay=z + 1, glyph=mt['glyph'], public=e['public'], evidence=mt.get('evidence', True),
                      label=mt['label'], href=e.get('href'), summary=e.get('summary'), authors=e.get('authors'), venue=e.get('venue')))


span_at = {(s['a'], s['b'], LI[s['layer']]): s for s in SPANS}
by_span, by_bench = {}, {}
for e in own:
    z, placed = e['layer'], False
    for a, b in itertools.combinations(sorted(e['fields']), 2):
        if (a, b, z) in span_at:
            by_span.setdefault((a, b, z), []).append(e); placed = True; break
    if not placed:
        by_bench.setdefault((next(f for f in FIELDS if f in e['fields']), z), []).append(e)
for (a, b, z), group in by_span.items():
    sp = span_at[(a, b, z)]
    (ux, uy), (mx, my) = sp['u'], sp['mid']
    for j, e in enumerate(group):
        off = (j - (len(group) - 1) / 2) * PITCH
        emit(e, mx + ux * off, my + uy * off, z)
for (f, z), group in by_bench.items():
    rows, placed = bench_rows(f, z), []
    if rows:
        ri = 0
        for e in group:
            while ri < len(rows) and not rows[ri][1]:
                ri += 1
            if ri >= len(rows):
                break
            y, xs = rows[ri]
            placed.append((e, xs.pop(0), y))
    else:
        cx, cy = C[f]
        placed = [(e, cx + (i - len(group) / 2) * PITCH, cy) for i, e in enumerate(group)]
    for e, x, y in placed:
        emit(e, x, y - z * ZS, z)
    if len(placed) < len(group):
        _, x, y = placed[-1]
        items.append(dict(i=len(items) + 1000, f=f, fields=[f], type='overflow', name=f'+{len(group) - len(placed)} more', x=round(x + PITCH, 1),
                          y=round(y - z * ZS, 1), lay=z + 1, glyph='plus', public=True, evidence=False, label='more'))

# ---------------------------------------------------------------- camera and labels
shelf_pts = [p for ring in rings_at(0.5) for p in ring]
bx0, bx1 = min(p[0] for p in shelf_pts), max(p[0] for p in shelf_pts)
by0, by1 = min(p[1] for p in shelf_pts) - 4 * ZS, max(p[1] for p in shelf_pts)
MX, MYT, MYB = 150, 80, 30
s0 = min((W - 2 * MX) / (bx1 - bx0), (H - MYT - MYB) / (by1 - by0), 1.0)
cam0 = dict(cx=round((bx0 + bx1) / 2, 1), cy=round((by0 + by1) / 2 - (MYT - MYB) / 2 / s0, 1), s=round(s0, 4))
to_world = lambda sx, sy: (cam0['cx'] + (sx - W / 2) / s0, cam0['cy'] + (sy - H / 2) / s0)
to_screen = lambda wx, wy: (W / 2 + (wx - cam0['cx']) * s0, H / 2 + (wy - cam0['cy']) * s0)

years = {}
for f in FIELDS:
    ys_ = [e['year'] for e in entries if f in e['fields'] and e.get('year')]
    years[f] = '' if not ys_ else (str(ys_[0]) if min(ys_) == max(ys_) else f'{min(ys_)}–{max(ys_)}')
labels = []
SCX, SCY = to_screen(CX, CY); A_, B_ = W / 2 - 118, H / 2 - 30
far = {}
for f in FIELDS:
    sx, sy = to_screen(*C[f]); th = math.atan2((sy - SCY) / B_, (sx - SCX) / A_)
    far[f] = [SCX + A_ * math.cos(th), SCY + B_ * math.sin(th), th]
for half in (lambda th: math.cos(th) >= 0, lambda th: math.cos(th) < 0):
    ks = sorted([k for k in far if half(far[k][2])], key=lambda k: far[k][1])
    for i in range(1, len(ks)):
        if far[ks[i]][1] - far[ks[i - 1]][1] < 30:
            far[ks[i]][1] = far[ks[i - 1]][1] + 30
for f in FIELDS:
    cx, cy = C[f]; nf = n[f]; fx, fy, th = far[f]
    top = max(k for k in range(L) if nf[k] > 0)
    anchor = 'middle' if abs(math.cos(th)) < 0.35 else ('start' if math.cos(th) > 0 else 'end')
    parts = []
    if nf[LI['published']]: parts.append(f"{nf[LI['published']]} PUBLISHED")
    elif nf[LI['written']]: parts.append(f"{nf[LI['written']]} WRITTEN")
    if nf[LI['read']]: parts.append(f"{nf[LI['read']]} READ")
    near_y = cy - R[f][top] - top * ZS - 10
    for lv in range(L - 1, 0, -1):
        hit = next((r for r in ring_store.get(lv, []) if point_in(r, cx, cy)), None)
        if hit:
            near_y = min(p[1] for p in hit) - lv * ZS - 9; break
    name = TITLE[f].upper()
    sub = ' · '.join(([years[f]] if years[f] else []) + parts)
    tw = max(len(name) * 7.6, len(sub) * 5.5)
    if anchor == 'start': fx = min(fx, W - 12 - tw)
    elif anchor == 'end': fx = max(fx, 12 + tw)
    else: fx = min(max(fx, 12 + tw / 2), W - 12 - tw / 2)
    fy = min(max(fy, 22), H - 18)
    wfx, wfy = to_world(fx, fy)
    labels.append(dict(f=f, kind='field', name=name, sub=sub, far=[round(wfx, 1), round(wfy, 1)], near=[cx, round(near_y)], anchor=anchor, tgt=[cx, round(cy - top * ZS)]))
    # bench labels sit on the front skirt: outward from the plateau centre when that points down, else on a front
    # diagonal; among the candidates take the one farthest from any span leaving this field
    out = math.atan2(cy - CY, cx - CX)
    cands = ([out] if math.sin(out) >= 0.35 else []) + [math.pi / 4, 3 * math.pi / 4]
    partners = [math.atan2(C[o][1] - cy, C[o][0] - cx) for (a_, b_) in sharing for o in (a_, b_) if f in (a_, b_) and o != f]
    gap = lambda th: min([abs(math.atan2(math.sin(th - q), math.cos(th - q))) for q in partners] or [math.pi])
    ang = max(cands, key=gap)
    for k in range(0, LI['read'] + 1):
        if nf[k] == 0 or R[f][k] == 0:
            continue
        rr = (R[f][k] + R[f][k + 1]) / 2 if R[f][k + 1] > 0 else R[f][k] * 0.6
        labels.append(dict(f=f, kind='bench', x=round(cx + rr * math.cos(ang)), y=round(cy + rr * math.sin(ang) - k * ZS),
                           name=f'{nf[k]} {SHOW.get(LAYERS[k], LAYERS[k]).upper()}', lay=k + 1))

DATA = dict(W=W, H=H, ZS=ZS, cam0=cam0, built=date.today().isoformat(), layers=LAYERS, materials=MAT['materials'],
            placeholders=PLACEHOLDERS, terrain=TER, spans=SPANS, shares=SHARES,
            hits=[dict(f=f, cx=C[f][0], cy=round(C[f][1] - 1.5 * ZS), r=round(R[f][LAND] + 6)) for f in FIELDS],
            fields={f: dict(c=list(C[f]), r=[round(x, 1) for x in R[f]], n=n[f], title=TITLE[f], years=years[f]) for f in FIELDS},
            labels=labels, items=items)
OUT.write_text(json.dumps(DATA, separators=(',', ':'), ensure_ascii=False))

print(f'{OUT.relative_to(ROOT)}: {len(json.dumps(DATA)) // 1024} KB, {len(entries)} entries, {len(items)} marks, {len(SPANS)} spans drawn, '
      f'{sum(1 for s in SHARES if not s["drawn"])} shares listed only, {len(PLACEHOLDERS)} placeholder counts in use')
for f in FIELDS:
    print(f'  {f:14s} ' + '  '.join(f'{LAYERS[k]} {n[f][k]}{"*" if ph_flag[f][k] else ""}' for k in range(L)) + f'  at {C[f]}')
for s in SPANS:
    print(f'  span {s["a"]}–{s["b"]} {s["layer"]} {s["n"]}/{s["of"]} half-width {s["half_width"]} length {s["length"]}')
for s in SHARES:
    if not s['drawn']:
        print(f'  listed {s["a"]}–{s["b"]} {s["layer"]} {s["n"]}/{s["of"]} (too thin to draw)')
