#!/usr/bin/env python3
"""Demo 2: the plateau (round-4 verdict) as an interactive page with semantic zoom and three rock styles."""
import math, json, html, itertools, random, colorsys
import numpy as np
from numpy.lib.stride_tricks import sliding_window_view

W, H, STEP, ZS = 900, 520, 2, 12
WMIN, WUNIT, THRESH, GAP, L = 4.0, 5.2, 0.2, 14, 5
LAYER = ['to read', 'cited', 'read', 'written', 'published']

fields = {
 'optimization': dict(n=(0, 40, 8, 3, 4), name='OPTIMIZATION', title='Optimization', years='2016–2021',
   pub=[('paper', 2018, 'QCQPs: when they are tractable'), ('paper', 2019, 'Phase retrieval with a benign landscape'), ('paper', 2020, 'Quadratic feasibility: sample complexity'), ('paper', 2017, 'Projected gradient descent on nonconvex sets')],
   wri=[('post', 2021, 'Nonconvex landscape of quadratic feasibility'), ('post', 2020, 'Projected gradient descent skipping'), ('note', 2025, 'Optimization discipline for LLM systems')]),
 'bandits': dict(n=(12, 70, 14, 5, 4), name='BANDITS & LEARNING', title='Bandits & learning', years='2017–2023',
   pub=[('paper', 2021, 'Best-arm identification with matching lower bounds'), ('paper', 2022, 'Pure exploration with graph side information'), ('paper', 2020, 'Non-stationary bandits via Ramanujan transforms'), ('paper', 2019, 'When to arrive: learning congestion equilibria')],
   wri=[('post', 2023, 'Pure exploration with graph side information'), ('post', 2022, 'Periodic bandits with Ramanujan transforms'), ('post', 2021, 'When to arrive: a congestion game'), ('note', 2024, 'Graph side-information bandits'), ('paper', 2026, 'Graph bandits', False)]),
 'robotics': dict(n=(6, 25, 4, 1, 2), name='ROBOTICS', title='Robotics', years='2019–2023',
   pub=[('paper', 2023, 'Bandit-based multi-agent search under noisy observations'), ('patent', 2023, 'Controlling search agents under noisy observations')],
   wri=[('post', 2024, 'Multi-agent search with bandits')]),
 'ai': dict(n=(180, 10, 15, 3, 3), name='AI SYSTEMS', title='AI systems', years='2023–now',
   pub=[('system', 2026, 'LLM agents as first-class workloads on Kubernetes'), ('system', 2024, 'Retrieval-augmented generation over internal documents'), ('system', 2025, 'Zero-copy privacy-safe test data for LLM workflows')],
   wri=[('post', 2025, 'RAG: outline chunking and image grounding'), ('post', 2025, 'Zero-copy privacy-safe test data'), ('note', 2026, 'Prompt compression experiments')]),
 'cloud': dict(n=(30, 0, 6, 2, 3), name='CLOUD INFRA', title='Cloud infra', years='2022–now',
   pub=[('system', 2023, 'Kubernetes platform for research workloads'), ('system', 2024, 'Cross-region eBPF service mesh'), ('system', 2022, 'Data pipeline performance work')],
   wri=[('post', 2024, 'Platform notes'), ('post', 2023, 'Pipeline profiling')]),
 'catan': dict(n=(25, 0, 3, 1, 0), name='CATAN RL LAB', title='Catan RL lab', years='2025–now', pub=[], wri=[('note', 2026, 'Catan RL lab: engine, teachers, expert iteration')]),
 'hyper': dict(n=(0, 30, 2, 1, 1), name='HYPERSPECTRAL', title='Hyperspectral unmixing', years='2021',
   pub=[('paper', 2021, 'Differentiable programming for hyperspectral unmixing')], wri=[('post', 2022, 'Differentiable physics for hyperspectral unmixing')]),
}
shared = {('optimization', 'bandits'): (0, 12, 3, 0, 0), ('bandits', 'robotics'): (0, 8, 2, 0, 2), ('bandits', 'ai'): (20, 0, 4, 1, 0),
          ('ai', 'cloud'): (15, 0, 3, 1, 2), ('optimization', 'hyper'): (0, 10, 1, 0, 1), ('catan', 'ai'): (10, 0, 1, 0, 0)}

def widths(n): return [WMIN + WUNIT * math.log2(1 + v) if v > 0 else 0.0 for v in n]
def radii(n): w = widths(n); return [sum(w[k:]) for k in range(L)]
def cum(n): return [sum(n[k:]) for k in range(L)]
def seed(s): return (sum(ord(ch) * (i + 7) for i, ch in enumerate(s)) % 360) * math.pi / 180
for f in fields.values(): f['r'] = radii(f['n']); f['cum'] = cum(f['n'])

# ---- layout from data, then "locked" ----
random.seed(3); keys = list(fields); target = {}
LAND = 1   # index of the cited layer: the lowest land terrace
for (a, b), m in shared.items():
    if sum(m) > 0: target[(a, b)] = fields[a]['r'][LAND] + fields[b]['r'][LAND] + 10
pos = {k: [W / 2 + random.uniform(-120, 120), H / 2 + random.uniform(-80, 80)] for k in keys}
for it in range(8000):
    for a, b in itertools.combinations(keys, 2):
        pa, pb = pos[a], pos[b]; dx, dy = pb[0] - pa[0], pb[1] - pa[1]; d = math.hypot(dx, dy) or 1e-6
        t = target.get((a, b), target.get((b, a)))
        if t is not None: f = 0.12 * (d - t)
        else:
            mind = fields[a]['r'][LAND] + fields[b]['r'][LAND] + 36; f = 0.06 * (d - mind) if d < mind else 0
        ux, uy = dx / d, dy / d; pa[0] += f * ux; pa[1] += f * uy; pb[0] -= f * ux; pb[1] -= f * uy
    cx = sum(p[0] for p in pos.values()) / len(pos); cy = sum(p[1] for p in pos.values()) / len(pos)
    for p in pos.values(): p[0] += (W / 2 - cx) * 0.1; p[1] += (H / 2 + 24 - cy) * 0.1
for k in keys: fields[k]['c'] = (round(pos[k][0]), round(pos[k][1]))
CX = sum(f['c'][0] for f in fields.values()) / len(fields); CY = sum(f['c'][1] for f in fields.values()) / len(fields)

# ---- heightfield ----
NX, NY = W // STEP + 1, H // STEP + 1
xs = np.arange(NX) * STEP; ys = np.arange(NY) * STEP; X, Y = np.meshgrid(xs, ys)
Z = np.zeros_like(X, dtype=float)
def dist_field(key):
    f = fields[key]; cx, cy = f['c']; dx, dy = X - cx, Y - cy; th = np.arctan2(dy, dx); ph = seed(key)
    return np.hypot(dx, dy) * (1 + 0.16 * np.sin(3 * th + ph) + 0.09 * np.sin(5 * th + 2.3 * ph) + 0.05 * np.sin(7 * th - ph))
for key, f in fields.items():
    d = dist_field(key)
    for k in range(L):
        if f['r'][k] > 0: Z = np.maximum(Z, np.where(d <= f['r'][k], k + 1, 0))
def seg_dist(a, b):
    ax, ay = a; bx, by = b; vx, vy = bx - ax, by - ay; ll = vx * vx + vy * vy
    t = np.clip(((X - ax) * vx + (Y - ay) * vy) / ll, 0, 1); return np.hypot(X - (ax + t * vx), Y - (ay + t * vy))
def blur(A, rad=2):
    P = np.pad(A, rad, mode='edge'); k = 2 * rad + 1; return sliding_window_view(P, (k, k)).mean(axis=(2, 3))
F = blur(blur(Z, 2), 1)

CASES = {1: [('L', 'B')], 2: [('B', 'R')], 3: [('L', 'R')], 4: [('T', 'R')], 5: [('T', 'L'), ('B', 'R')], 6: [('T', 'B')], 7: [('T', 'L')],
         8: [('T', 'L')], 9: [('T', 'B')], 10: [('T', 'R'), ('B', 'L')], 11: [('T', 'R')], 12: [('L', 'R')], 13: [('B', 'R')], 14: [('L', 'B')]}
def rings_at(lv):
    segs = []
    for j in range(NY - 1):
        for i in range(NX - 1):
            a, b, c, d = F[j, i], F[j, i + 1], F[j + 1, i + 1], F[j + 1, i]
            idx = (8 if a > lv else 0) | (4 if b > lv else 0) | (2 if c > lv else 0) | (1 if d > lv else 0)
            if idx in (0, 15): continue
            x0, y0 = i * STEP, j * STEP
            t = lambda p, q: (lv - p) / (q - p) if q != p else 0.5
            E = {'T': (x0 + t(a, b) * STEP, y0), 'R': (x0 + STEP, y0 + t(b, c) * STEP), 'B': (x0 + t(d, c) * STEP, y0 + STEP), 'L': (x0, y0 + t(a, d) * STEP)}
            for e1, e2 in CASES[idx]: segs.append((E[e1], E[e2]))
    key = lambda p: (round(p[0] * 100), round(p[1] * 100)); at = {}
    for i, s in enumerate(segs): at.setdefault(key(s[0]), []).append(i); at.setdefault(key(s[1]), []).append(i)
    used = [False] * len(segs); out = []
    for i in range(len(segs)):
        if used[i]: continue
        used[i] = True; ring = [segs[i][0], segs[i][1]]; cur = segs[i][1]; start = key(segs[i][0])
        for _ in range(len(segs)):
            k = key(cur)
            if k == start: break
            cand = next((j for j in at.get(k, []) if not used[j]), None)
            if cand is None: break
            used[cand] = True; s = segs[cand]; cur = s[1] if key(s[0]) == k else s[0]; ring.append(cur)
        if len(ring) > 16: out.append(ring)
    return out
def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]; dx, dy = x2 - x1, y2 - y1; n = math.hypot(dx, dy) or 1e-9; dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / n
        if d > dmax: dmax, idx = d, i
    if dmax > eps: return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]
def simplify_ring(ring, eps):
    pts = ring[:-1] if ring[0] == ring[-1] else list(ring)
    i = max(range(len(pts)), key=lambda j: (pts[j][0] - pts[0][0]) ** 2 + (pts[j][1] - pts[0][1]) ** 2)
    a = rdp(pts[:i + 1], eps); b = rdp(pts[i:] + [pts[0]], eps); return a[:-1] + b[:-1]
def fmt(x, y): return f'{x:.0f} {y:.0f}'
def P(x, y, z): return (x, y - z * ZS)
LIGHT = (-0.707, 0.707)  # light from lower left (plan-oblique convention)
def ring_paths(ring, z, rise=None):
    rise = ZS if rise is None else rise
    top = [P(x, y, z) for x, y in ring]; n = len(top)
    A = sum(top[i][0] * top[(i + 1) % n][1] - top[(i + 1) % n][0] * top[i][1] for i in range(n)); sgn = 1 if A > 0 else -1
    side, lit = [], []
    for i in range(n):
        p, q = top[i], top[(i + 1) % n]; dx, dy = q[0] - p[0], q[1] - p[1]; nx, ny = sgn * dy, -sgn * dx
        nn = math.hypot(nx, ny) or 1e-9; nx, ny = nx / nn, ny / nn
        side.append(None if ny <= 0 else ('w' if nx < 0 else 'e'))
        dot = nx * LIGHT[0] + ny * LIGHT[1]; lit.append('L' if dot > 0.25 else 'S' if dot < -0.25 else None)
    def strips(cls, extrude):
        out = {}
        start = next((i for i in range(n) if cls[i] != cls[i - 1]), 0); i = 0
        while i < n:
            k = (start + i) % n; s = cls[k]
            if s is None: i += 1; continue
            run = [k]
            while i + len(run) < n and cls[(start + i + len(run)) % n] == s: run.append((start + i + len(run)) % n)
            pts = [top[j] for j in run] + [top[(run[-1] + 1) % n]]
            if extrude: d = 'M' + 'L'.join(fmt(x, y) for x, y in pts) + 'L' + 'L'.join(fmt(x, y + rise) for x, y in reversed(pts)) + 'Z'
            else: d = 'M' + 'L'.join(fmt(x, y) for x, y in pts)
            out.setdefault(s, []).append(d); i += len(run)
        return out
    ris = strips(side, True); tan = strips(lit, False)
    return ''.join(ris.get('w', [])), ''.join(ris.get('e', [])), 'M' + 'L'.join(fmt(x, y) for x, y in top) + 'Z', ''.join(tan.get('L', [])), ''.join(tan.get('S', []))

# ---- build the SVG ----
svg = []; TER = []
def add(cls, d, **kw):
    svg.append(f'<path class="{cls}" d="{d}"/>'); TER.append(dict(c=cls, d=d, **kw))
# shelf (layer 1) flat at sea level
for ring in rings_at(0.5):
    add('shelf', 'M' + 'L'.join(fmt(x, y) for x, y in simplify_ring(ring, 0.9)) + 'Z')
def point_in(poly, x, y):
    inside = False; n = len(poly)
    for i in range(n):
        (xa, ya), (xb, yb) = poly[i], poly[(i + 1) % n]
        if (ya > y) != (yb > y) and x < (xb - xa) * (y - ya) / (yb - ya + 1e-12) + xa: inside = not inside
    return inside
ring_store = {}
svg.append('<g id="rock">')
for z, lv in enumerate([1.5, 2.5, 3.5, 4.5], start=1):
    for ring in rings_at(lv):
        simp = simplify_ring(ring, 0.9); ring_store.setdefault(z, []).append(simp)
        w, e, t, lit, shd = ring_paths(simp, z)
        k = z + 1
        if w: add(f'rw r{k}', w, k=k)
        if e: add(f're r{k}', e, k=k)
        add(f'tp t{k}', t, k=k)
        if lit: add('tk lit', lit, k=k)
        if shd: add('tk shd', shd, k=k)
svg.append('</g>')
# hit areas per field (plan circles, sheared position unchanged)
for key, f in fields.items():
    svg.append(f'<circle class="hit" data-f="{key}" cx="{f["c"][0]}" cy="{f["c"][1] - 1.5 * ZS:.0f}" r="{f["r"][1] + 6:.0f}"><title>{html.escape(f["title"])}</title></circle>')
# ---- spans: exact-layer sharing ----
SPANS = []
for (a, b), m in shared.items():
    fa, fb = fields[a], fields[b]
    (ax, ay), (bx, by) = fa['c'], fb['c']; dx, dy = bx - ax, by - ay; dist = math.hypot(dx, dy); ux, uy = dx / dist, dy / dist; nx, ny = -uy, ux
    for k in range(L):
        s_k = m[k]
        if s_k == 0: continue
        ea, eb = fa['n'][k], fb['n'][k]
        small = fa if ea <= eb else fb; c_small = max(1, min(ea, eb) if min(ea, eb) > 0 else max(ea, eb))
        rho = max(1.5, small['r'][k] * min(1.0, s_k / c_small))
        # from A's layer-k edge to B's layer-k edge, overshooting 3 units into each
        ra = fa['r'][k] if fa['r'][k] > 0 else 0; rb = fb['r'][k] if fb['r'][k] > 0 else 0
        pa = (ax + ux * (ra - 3), ay + uy * (ra - 3)); pb = (bx - ux * (rb - 3), by - uy * (rb - 3))
        poly = [(pa[0] + nx * rho, pa[1] + ny * rho), (pb[0] + nx * rho, pb[1] + ny * rho), (pb[0] - nx * rho, pb[1] - ny * rho), (pa[0] - nx * rho, pa[1] - ny * rho)]
        if k == 0:
            svg.append('<path class="shelf span" d="M' + 'L'.join(fmt(x, y) for x, y in poly) + 'Z"/>'); TER.append(dict(c='shelf span', d='M' + 'L'.join(fmt(x, y) for x, y in poly) + 'Z', k=1))
        else:
            w, e, t, lit, shd = ring_paths(poly, k, rise=ZS * 0.35)
            if w: add(f'rw r{k+1} span', w, k=k+1)
            if e: add(f're r{k+1} span', e, k=k+1)
            add(f'tp t{k+1} span', t, k=k+1)
        SPANS.append(dict(a=a, b=b, layer=k + 1, shared=s_k, of=c_small, half_width=round(rho, 1)))
for sp in SPANS: print('span', sp)

# ---- markers: flush point symbols placed in rows along the front of their bench (config-driven) ----
MAT = json.load(open('/home/pkt/ParthPersonal/portfolio/src/data/materials.json'))
GAP, MARGIN, ROWGAP = MAT['placement']['pitch'], MAT['placement']['margin'], MAT['placement']['row_gap']
LAYER_IDX = {name: i for i, name in enumerate(MAT['layers'])}   # queue 0 ... published 4
def bench_rows(key, lay):
    """Candidate horizontal rows inside the bench of layer `lay` (1-based terrace level = lay) for field `key`:
    points inside the terrace ring of that level, outside the ring above, at least MARGIN from both, front (south) rows first."""
    cx, cy = fields[key]['c']
    outer = next((r for r in ring_store.get(lay, []) if point_in(r, cx, cy)), None)
    if outer is None: return []
    inner = next((r for r in ring_store.get(lay + 1, []) if point_in(r, cx, cy)), None)
    # stay within the field's own footprint at this layer so shared terraces do not pull items to a neighbour
    R = fields[key]['r'][lay] + MARGIN
    y0, y1 = cy - R, cy + R
    xs0, xs1 = cx - R, cx + R
    def ok(x, y):
        for dx, dy in ((0, 0), (MARGIN, 0), (-MARGIN, 0), (0, MARGIN), (0, -MARGIN)):
            if not point_in(outer, x + dx, y + dy): return False
            if inner is not None and point_in(inner, x + dx, y + dy): return False
        return True
    rows = []
    y = y1 - MARGIN - 2
    while y > y0 + MARGIN:
        xs = [x for x in range(int(xs0), int(xs1) + 1, GAP) if ok(x, y)]
        # keep the longest contiguous run
        best, run = [], []
        for x in xs:
            if run and x - run[-1] > GAP: 
                if len(run) > len(best): best = run
                run = []
            run.append(x)
        if len(run) > len(best): best = run
        if len(best) >= 2: rows.append((y, best))
        y -= ROWGAP
    return rows
items = []
for key, f in fields.items():
    # group items by the bench they land on (drafts fall to the draft layer)
    benches = {}
    for g in f['pub'] + f['wri']:
        typ, year, name = g[0], g[1], g[2]; public = g[3] if len(g) > 3 else True
        lay_name = MAT['materials'][typ]['layer'] if public else MAT['draft_layer']
        benches.setdefault(LAYER_IDX[lay_name], []).append((typ, year, name, public))
    for lv, group in sorted(benches.items(), reverse=True):
        rows = bench_rows(key, lv)
        ordered = sorted(group, key=lambda g: (g[1], g[2]))
        placed = []
        if rows:
            ri = 0
            for g in ordered:
                while ri < len(rows) and len(rows[ri][1]) == 0: ri += 1
                if ri >= len(rows): break
                y, xs = rows[ri]; x = xs.pop(0); placed.append((g, x, y))
        else:
            cx, cy = f['c']; placed = [(g, cx + (i - len(ordered) / 2) * GAP, cy) for i, g in enumerate(ordered)]
        for (typ, year, name, public), x, y in placed:
            m = MAT['materials'][typ]; idx = len(items) + 1
            items.append(dict(i=idx, f=key, type=typ, year=year, name=name, x=round(x, 1), y=round(y - lv * ZS, 1), lay=lv + 1,
                              glyph=m['glyph'], public=public, evidence=m.get('evidence', True), label=m['label']))
        if len(placed) < len(ordered):
            items.append(dict(i=len(items) + 1, f=key, type='overflow', name=f'+{len(ordered) - len(placed)} more', x=round(placed[-1][1] + GAP, 1), y=round(placed[-1][2] - lv * ZS, 1), lay=lv + 1, glyph='plus', public=True, evidence=False, label='more'))
TERRAIN = '\n'.join(svg)

# ---- overview camera: fit the shelf extent with room for perimeter labels ----
shelf_pts = [p for ring in rings_at(0.5) for p in ring]
bx0, bx1 = min(p[0] for p in shelf_pts), max(p[0] for p in shelf_pts); by0, by1 = min(p[1] for p in shelf_pts) - 4 * ZS, max(p[1] for p in shelf_pts)
MX, MYT, MYB = 150, 80, 30
s0 = min((W - 2 * MX) / (bx1 - bx0), (H - MYT - MYB) / (by1 - by0), 1.0)
cam0 = dict(cx=round((bx0 + bx1) / 2, 1), cy=round((by0 + by1) / 2 - (MYT - MYB) / 2 / s0, 1), s=round(s0, 4))
to_world = lambda sx, sy: (cam0['cx'] + (sx - W / 2) / s0, cam0['cy'] + (sy - H / 2) / s0)
to_screen = lambda wx, wy: (W / 2 + (wx - cam0['cx']) * s0, H / 2 + (wy - cam0['cy']) * s0)
# ---- label anchors ----
labels = []
SCX, SCY = to_screen(CX, CY); A, B = W / 2 - 118, H / 2 - 30
far = {}
for key, f in fields.items():
    sx, sy = to_screen(*f['c']); th = math.atan2((sy - SCY) / B, (sx - SCX) / A)
    far[key] = [SCX + A * math.cos(th), SCY + B * math.sin(th), th]
for half in (lambda th: math.cos(th) >= 0, lambda th: math.cos(th) < 0):
    ks = sorted([k for k in far if half(far[k][2])], key=lambda k: far[k][1])
    for i in range(1, len(ks)):
        if far[ks[i]][1] - far[ks[i - 1]][1] < 30: far[ks[i]][1] = far[ks[i - 1]][1] + 30
for key, f in fields.items():
    cx, cy = f['c']; n = f['n']; fx, fy, th = far[key]
    top = 4 if f['r'][4] > 0 else 3
    anchor = 'middle' if abs(math.cos(th)) < 0.35 else ('start' if math.cos(th) > 0 else 'end')
    parts = []
    if n[4]: parts.append(f'{n[4]} PUBLISHED')
    elif n[3]: parts.append(f'{n[3]} WRITTEN')
    if n[2]: parts.append(f'{n[2]} READ')
    near_y = cy - f['r'][top] - top * ZS - 10
    for lv in range(4, 0, -1):
        hit = next((r for r in ring_store.get(lv, []) if point_in(r, cx, cy)), None)
        if hit: near_y = min(p[1] for p in hit) - lv * ZS - 9; break
    sub = f"{f['years']} · " + ' · '.join(parts); tw = max(len(f['name']) * 7.6, len(sub) * 5.5)
    if anchor == 'start': fx = min(fx, W - 12 - tw)
    elif anchor == 'end': fx = max(fx, 12 + tw)
    else: fx = min(max(fx, 12 + tw / 2), W - 12 - tw / 2)
    fy = min(max(fy, 22), H - 18)
    wfx, wfy = to_world(fx, fy)
    labels.append(dict(f=key, kind='field', name=f['name'], sub=sub, far=[round(wfx, 1), round(wfy, 1)],
                       near=[cx, round(near_y)], anchor=anchor, tgt=[cx, round(cy - top * ZS)]))
    ang = math.atan2(cy - CY, cx - CX)
    for k in range(0, 3):
        if n[k] == 0 or f['r'][k] == 0: continue
        rr = (f['r'][k] + f['r'][k + 1]) / 2 if f['r'][k + 1] > 0 else f['r'][k] * 0.6
        bx, by = cx + rr * math.cos(ang), cy + rr * math.sin(ang) - k * ZS
        labels.append(dict(f=key, kind='bench', x=round(bx), y=round(by), name=f'{n[k]} {LAYER[k].upper()}', lay=k + 1))
DATA = dict(W=W, H=H, ZS=ZS, cam0=cam0, materials=MAT['materials'], spans=SPANS, terrain=TER, hits=[dict(f=k, cx=f['c'][0], cy=round(f['c'][1] - 1.5 * ZS), r=round(f['r'][1] + 6)) for k, f in fields.items()], fields={k: dict(c=f['c'], r=[round(x, 1) for x in f['r']], n=f['n'], title=f['title'], years=f['years']) for k, f in fields.items()},
            labels=labels, items=items)


pass
import os
open('/tmp/claude-1000/-home-pkt-ParthPersonal/aaf04bbc-a718-4fb0-a8a4-82dd965e2010/scratchpad/proto7/landscape7.json', 'w').write(json.dumps(DATA, separators=(',', ':')))
print('landscape.json', len(json.dumps(DATA)) // 1024, 'KB')
print(len(items), 'items;', len(labels), 'labels')
