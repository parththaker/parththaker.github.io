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
   pub=['QCQPs: when they are tractable', 'Phase retrieval with a benign landscape', 'Quadratic feasibility: sample complexity', 'Projected gradient descent on nonconvex sets'],
   wri=['Nonconvex landscape of quadratic feasibility', 'Projected gradient descent skipping', 'Optimization discipline for LLM systems']),
 'bandits': dict(n=(12, 70, 14, 5, 4), name='BANDITS & LEARNING', title='Bandits & learning', years='2017–2023',
   pub=['Best-arm identification: matching lower bounds', 'Pure exploration with graph side information', 'Non-stationary bandits via Ramanujan transforms', 'When to arrive: learning congestion equilibria'],
   wri=['Pure exploration with graph side information (post)', 'Periodic bandits with Ramanujan transforms (post)', 'When to arrive: a congestion game (post)', 'Graph side-information bandits (idea)', 'Graph bandits (draft)']),
 'robotics': dict(n=(6, 25, 4, 1, 2), name='ROBOTICS', title='Robotics', years='2019–2023',
   pub=['Bandit-based multi-agent search under noisy observations', 'Controlling search agents under noise (patent)'],
   wri=['Multi-agent search with bandits (post)']),
 'ai': dict(n=(180, 10, 15, 3, 3), name='AI SYSTEMS', title='AI systems', years='2023–now',
   pub=['LLM agents as first-class workloads on Kubernetes', 'Retrieval-augmented generation over internal documents', 'Zero-copy privacy-safe test data for LLM workflows'],
   wri=['RAG: outline chunking, image grounding (post)', 'Zero-copy privacy-safe test data (post)', 'Prompt compression experiments (notes)']),
 'cloud': dict(n=(30, 0, 6, 2, 3), name='CLOUD INFRA', title='Cloud infra', years='2022–now',
   pub=['Kubernetes platform for research workloads', 'Cross-region eBPF service mesh', 'Data pipeline performance work'],
   wri=['Platform notes (post)', 'Pipeline profiling (post)']),
 'catan': dict(n=(25, 0, 3, 1, 0), name='CATAN RL LAB', title='Catan RL lab', years='2025–now', pub=[], wri=['Catan RL lab: engine, teachers, expert iteration (notes)']),
 'hyper': dict(n=(0, 30, 2, 1, 1), name='HYPERSPECTRAL', title='Hyperspectral unmixing', years='2021',
   pub=['Differentiable programming for hyperspectral unmixing'], wri=['Differentiable physics for hyperspectral unmixing (post)']),
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
for (a, b), m in shared.items():
    mc = cum(m)
    for k in range(L - 1, -1, -1):
        mn = min(fields[a]['cum'][k], fields[b]['cum'][k])
        if mn and mc[k] / mn >= THRESH: target[(a, b)] = fields[a]['r'][k] + fields[b]['r'][k] + GAP; break
pos = {k: [W / 2 + random.uniform(-120, 120), H / 2 + random.uniform(-80, 80)] for k in keys}
for it in range(4000):
    for a, b in itertools.combinations(keys, 2):
        pa, pb = pos[a], pos[b]; dx, dy = pb[0] - pa[0], pb[1] - pa[1]; d = math.hypot(dx, dy) or 1e-6
        if (a, b) in target or (b, a) in target: f = 0.05 * (d - target.get((a, b), target.get((b, a))))
        else:
            mind = fields[a]['r'][0] + fields[b]['r'][0] + 36; f = 0.05 * (d - mind) if d < mind else 0
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
for (a, b), m in shared.items():
    fa, fb = fields[a], fields[b]; mc = cum(m); d = seg_dist(fa['c'], fb['c'])
    for k in range(L):
        ca, cb = fa['cum'][k], fb['cum'][k]
        if mc[k] == 0 or min(ca, cb) == 0: continue
        small = fa if ca <= cb else fb; rho = small['r'][k] * min(1.0, mc[k] / min(ca, cb))
        Z = np.maximum(Z, np.where(d <= rho, k + 1, 0))
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
def ring_paths(ring, z):
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
            if extrude: d = 'M' + 'L'.join(fmt(x, y) for x, y in pts) + 'L' + 'L'.join(fmt(x, y + ZS) for x, y in reversed(pts)) + 'Z'
            else: d = 'M' + 'L'.join(fmt(x, y) for x, y in pts)
            out.setdefault(s, []).append(d); i += len(run)
        return out
    ris = strips(side, True); tan = strips(lit, False)
    return ''.join(ris.get('w', [])), ''.join(ris.get('e', [])), 'M' + 'L'.join(fmt(x, y) for x, y in top) + 'Z', ''.join(tan.get('L', [])), ''.join(tan.get('S', []))

# ---- build the SVG ----
svg = []
# shelf (layer 1) flat at sea level
for ring in rings_at(0.5):
    svg.append('<path class="shelf" d="M' + 'L'.join(fmt(x, y) for x, y in simplify_ring(ring, 0.9)) + 'Z"/>')
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
        if w: svg.append(f'<path class="rw r{k}" d="{w}"/>')
        if e: svg.append(f'<path class="re r{k}" d="{e}"/>')
        svg.append(f'<path class="tp t{k}" d="{t}"/>')
        if lit: svg.append(f'<path class="tk lit" d="{lit}"/>')
        if shd: svg.append(f'<path class="tk shd" d="{shd}"/>')
svg.append('</g>')
# hit areas per field (plan circles, sheared position unchanged)
for key, f in fields.items():
    svg.append(f'<circle class="hit" data-f="{key}" cx="{f["c"][0]}" cy="{f["c"][1] - 1.5 * ZS:.0f}" r="{f["r"][1] + 6:.0f}"><title>{html.escape(f["title"])}</title></circle>')
# hoodoos (blocks) for published (layer 5) and written (layer 4) items
items = []
BR, BH = 2.3, 2.8
for key, f in fields.items():
    cx, cy = f['c']; ph = seed(key)
    for lay, names in ((5, f['pub']), (4, f['wri'])):
        if not names: continue
        z = lay - 1; cnt = len(names)
        rad = 0 if (lay == 5 and cnt == 1) else (f['r'][4] * 0.5 if lay == 5 else (f['r'][3] + f['r'][4]) / 2)
        for i, name in enumerate(names):
            a = 2 * math.pi * i / cnt + ph + (0.4 if lay == 4 else 0)
            x, y = cx + rad * math.cos(a), cy + rad * 0.92 * math.sin(a); yt = y - z * ZS
            idx = len(items) + 1
            bw = BR - 0.5; cw = BR + 0.4
            svg.append(f'<g class="blk" data-i="{idx}"><path class="bs" d="M{x - bw:.1f} {yt - BH:.1f}V{yt:.1f}A{bw:.1f} {bw * .5:.1f} 0 0 0 {x + bw:.1f} {yt:.1f}V{yt - BH:.1f}Z"/><path class="bc" d="M{x - cw:.1f} {yt - BH:.1f}V{yt - BH - 1.2:.1f}A{cw:.1f} {cw * .5:.1f} 0 0 1 {x + cw:.1f} {yt - BH - 1.2:.1f}V{yt - BH:.1f}A{cw:.1f} {cw * .5:.1f} 0 0 1 {x - cw:.1f} {yt - BH:.1f}Z"/><ellipse class="bt" cx="{x:.1f}" cy="{yt - BH - 1.2:.1f}" rx="{cw:.1f}" ry="{cw * .5:.1f}"/></g>')
            items.append(dict(i=idx, f=key, x=round(x, 1), y=round(yt - BH, 1), lay=lay, name=name))
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
    if n[2]: parts.append(f'{n[2]} READ')
    if not parts and n[3]: parts.append(f'{n[3]} WRITTEN')
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
    for k in range(1, 3):
        if n[k] == 0 or f['r'][k] == 0: continue
        rr = (f['r'][k] + f['r'][k + 1]) / 2 if f['r'][k + 1] > 0 else f['r'][k] * 0.6
        bx, by = cx + rr * math.cos(ang), cy + rr * math.sin(ang) - k * ZS
        labels.append(dict(f=key, kind='bench', x=round(bx), y=round(by), name=f'{n[k]} {LAYER[k].upper()}', lay=k + 1))
DATA = dict(W=W, H=H, ZS=ZS, cam0=cam0, fields={k: dict(c=f['c'], r=[round(x, 1) for x in f['r']], n=f['n'], title=f['title'], years=f['years']) for k, f in fields.items()},
            labels=labels, items=items)

tpl = open('template.html').read()
out = tpl.replace('<!--TERRAIN-->', TERRAIN).replace('/*DATA*/', json.dumps(DATA, separators=(',', ':')))
open('index.html', 'w').write(out)
print('index.html', len(out) // 1024, 'KB;', len(items), 'items;', len(labels), 'labels')
