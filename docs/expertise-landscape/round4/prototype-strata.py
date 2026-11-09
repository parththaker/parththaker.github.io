#!/usr/bin/env python3
"""Round-4 prototype: strata from item counts, bridges from shared items.
Rule: step width w_k = WMIN + WUNIT*log2(1+n_k) for exact-layer count n_k (0 if none);
radius r_k = sum_{j>=k} w_j (cumulative nesting). Bridge half-width at layer k =
r_min,k * (shared_cum_k / min_cum_k). Layer 1 (to-read) is drawn as shallows."""
import math, sys, json
import numpy as np
sys.setrecursionlimit(10000)
W, H, STEP, ZS = 900, 520, 3, 12
WMIN, WUNIT = 4.0, 5.2
THRESH, GAP = 0.2, 14
L = 5
# exact counts per layer [to-read, cited, read, written, published]
fields = {
 'optimization': dict(c=(215, 250), n=(0, 40, 8, 3, 4), name='OPTIMIZATION', lx=150, ly=120),
 'bandits':      dict(c=(345, 345), n=(12, 70, 14, 5, 4), name='BANDITS & LEARNING', lx=300, ly=470),
 'robotics':     dict(c=(470, 240), n=(6, 25, 4, 1, 2), name='ROBOTICS', lx=470, ly=130),
 'ai':           dict(c=(640, 215), n=(180, 10, 15, 3, 3), name='AI SYSTEMS', lx=700, ly=90),
 'cloud':        dict(c=(690, 355), n=(30, 0, 6, 2, 3), name='CLOUD INFRA', lx=760, ly=440),
 'catan':        dict(c=(520, 425), n=(25, 0, 3, 1, 0), name='Catan RL lab', lx=520, ly=490),
 'hyper':        dict(c=(300, 150), n=(0, 30, 2, 1, 1), name='Hyperspectral', lx=330, ly=72),
}
shared = {  # exact shared counts per layer
 ('optimization', 'bandits'): (0, 12, 3, 0, 0),
 ('bandits', 'robotics'):     (0, 8, 2, 0, 2),
 ('bandits', 'ai'):           (20, 0, 4, 1, 0),
 ('ai', 'cloud'):             (15, 0, 3, 1, 2),
 ('optimization', 'hyper'):   (0, 10, 1, 0, 1),
 ('catan', 'ai'):             (10, 0, 1, 0, 0),
}
def widths(n): return [WMIN + WUNIT * math.log2(1 + v) if v > 0 else 0.0 for v in n]
def radii(n):
    w = widths(n); return [sum(w[k:]) for k in range(L)]
def cum(n): return [sum(n[k:]) for k in range(L)]
for f in fields.values(): f['r'] = radii(f['n']); f['cum'] = cum(f['n'])
# ---- layout from data: linked pairs sit at distance r_A,k* + r_B,k* + GAP where k* is the
# highest layer whose shared fraction (of the smaller field) >= THRESH; unlinked pairs repel.
import itertools, random
random.seed(3)
keys = list(fields); target = {}
for (a, b), m in shared.items():
    mc = cum(m); kstar = None
    for k in range(L - 1, -1, -1):
        mn = min(fields[a]['cum'][k], fields[b]['cum'][k])
        if mn and mc[k] / mn >= THRESH: kstar = k; break
    if kstar is not None:
        target[(a, b)] = fields[a]['r'][kstar] + fields[b]['r'][kstar] + GAP
        print(f'  link {a}-{b}: k*={kstar + 1} target distance {target[(a, b)]:.0f}')
pos = {k: [W / 2 + random.uniform(-120, 120), H / 2 + random.uniform(-80, 80)] for k in keys}
for it in range(4000):
    for a, b in itertools.combinations(keys, 2):
        pa, pb = pos[a], pos[b]; dx, dy = pb[0] - pa[0], pb[1] - pa[1]; d = math.hypot(dx, dy) or 1e-6
        if (a, b) in target or (b, a) in target:
            t = target.get((a, b), target.get((b, a))); f = 0.05 * (d - t)
        else:
            mind = fields[a]['r'][0] + fields[b]['r'][0] + 36
            f = 0.05 * (d - mind) if d < mind else 0
        ux, uy = dx / d, dy / d
        pa[0] += f * ux; pa[1] += f * uy; pb[0] -= f * ux; pb[1] -= f * uy
    cx = sum(p[0] for p in pos.values()) / len(pos); cy = sum(p[1] for p in pos.values()) / len(pos)
    for p in pos.values(): p[0] += (W / 2 - cx) * 0.1; p[1] += (H / 2 + 24 - cy) * 0.1
for k in keys:
    fields[k]['c'] = (round(pos[k][0]), round(pos[k][1]))
    fields[k]['lx'] = fields[k]['c'][0]; ya = fields[k]['c'][1] - fields[k]['r'][0] - 4 * ZS - 10; fields[k]['ly'] = ya if ya > 16 else fields[k]['c'][1] + fields[k]['r'][0] + 16
print('positions:', {k: fields[k]['c'] for k in keys})
print('radii per field (layers 1..5):')
for k, f in fields.items(): print(f"  {k:13s} n={f['n']}  r={[round(x,1) for x in f['r']]}")

NX, NY = W // STEP + 1, H // STEP + 1
xs = np.arange(NX) * STEP; ys = np.arange(NY) * STEP
X, Y = np.meshgrid(xs, ys)
Z = np.zeros_like(X, dtype=float)
def seed(s): return (sum(ord(ch) * (i + 7) for i, ch in enumerate(s)) % 360) * math.pi / 180
for key, f in fields.items():
    cx, cy = f['c']; dx, dy = X - cx, Y - cy
    th = np.arctan2(dy, dx); ph = seed(key)
    d = np.hypot(dx, dy) * (1 + 0.16 * np.sin(3 * th + ph) + 0.09 * np.sin(5 * th + 2.3 * ph) + 0.05 * np.sin(7 * th - ph))
    for k in range(L):
        if f['r'][k] > 0: Z = np.maximum(Z, np.where(d <= f['r'][k], k + 1, 0))
def seg_dist(X, Y, a, b):
    ax, ay = a; bx, by = b; vx, vy = bx - ax, by - ay; ll = vx * vx + vy * vy
    t = np.clip(((X - ax) * vx + (Y - ay) * vy) / ll, 0, 1)
    return np.hypot(X - (ax + t * vx), Y - (ay + t * vy))
print('bridge half-widths (layers 1..5):')
for (a, b), m in shared.items():
    fa, fb = fields[a], fields[b]; mc = cum(m)
    d = seg_dist(X, Y, fa['c'], fb['c'])
    rho = []
    for k in range(L):
        ca, cb = fa['cum'][k], fb['cum'][k]
        if mc[k] == 0 or min(ca, cb) == 0: rho.append(0.0); continue
        small = fa if ca <= cb else fb
        frac = min(1.0, mc[k] / min(ca, cb))
        rho.append(small['r'][k] * frac)
        Z = np.maximum(Z, np.where(d <= rho[k], k + 1, 0))
    print(f"  {a}-{b}: shared={m} rho={[round(x,1) for x in rho]}")
# gentle smoothing of the union so corners round
from numpy.lib.stride_tricks import sliding_window_view
def blur(A, rad=2):
    P = np.pad(A, rad, mode='edge'); k = 2 * rad + 1
    return sliding_window_view(P, (k, k)).mean(axis=(2, 3))
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
            t = lambda p, q: (lv - p) / (q - p)
            E = {'T': (x0 + t(a, b) * STEP, y0), 'R': (x0 + STEP, y0 + t(b, c) * STEP), 'B': (x0 + t(d, c) * STEP, y0 + STEP), 'L': (x0, y0 + t(a, d) * STEP)}
            for e1, e2 in CASES[idx]: segs.append((E[e1], E[e2]))
    key = lambda p: (round(p[0] * 100), round(p[1] * 100))
    at = {}
    for i, s in enumerate(segs):
        at.setdefault(key(s[0]), []).append(i); at.setdefault(key(s[1]), []).append(i)
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
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; n = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / n
        if d > dmax: dmax, idx = d, i
    if dmax > eps: return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]
def simplify_ring(ring, eps):
    pts = ring[:-1] if ring[0] == ring[-1] else list(ring)
    i = max(range(len(pts)), key=lambda j: (pts[j][0] - pts[0][0]) ** 2 + (pts[j][1] - pts[0][1]) ** 2)
    a = rdp(pts[:i + 1], eps); b = rdp(pts[i:] + [pts[0]], eps)
    return a[:-1] + b[:-1]
P = lambda x, y, z: (x, y - z * ZS)
def ring_paths(ring, z):
    top = [P(x, y, z) for x, y in ring]
    n = len(top)
    A = sum(top[i][0] * top[(i + 1) % n][1] - top[(i + 1) % n][0] * top[i][1] for i in range(n))
    sgn = 1 if A > 0 else -1
    side = []
    for i in range(n):
        p, q = top[i], top[(i + 1) % n]
        dx, dy = q[0] - p[0], q[1] - p[1]; nx, ny = sgn * dy, -sgn * dx
        side.append(None if ny <= 0 else ('w' if nx < 0 else 'e'))
    # merge consecutive visible edges of the same side into strips
    out = {'w': [], 'e': []}
    start = next((i for i in range(n) if side[i] != side[i - 1]), 0)
    i = 0
    while i < n:
        k = (start + i) % n; s = side[k]
        if s is None: i += 1; continue
        run = [k]
        while i + len(run) < n and side[(start + i + len(run)) % n] == s: run.append((start + i + len(run)) % n)
        pts = [top[j] for j in run] + [top[(run[-1] + 1) % n]]
        d = 'M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in pts) + 'L' + 'L'.join(f'{x:.0f} {y + ZS:.0f}' for x, y in reversed(pts)) + 'Z'
        out[s].append(d); i += len(run)
    return ''.join(out['w']), ''.join(out['e']), 'M' + 'L'.join(f'{x:.0f} {y:.0f}' for x, y in top) + 'Z'
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" font-family="Archivo, Helvetica, Arial, sans-serif">',
 '<style>.sea{fill:#f4f3ef}.shelf{fill:#e6e9ea;stroke:#b9c2c6;stroke-width:.6;stroke-dasharray:2 2}.rw{fill:#9a948a}.re{fill:#7a746b}'
 '.t2{fill:#cbc5bb}.t3{fill:#d7d2c9}.t4{fill:#e3dfd7}.t5{fill:#efece6}.tp{stroke:#6f6a62;stroke-width:.5}'
 '.lbl{font-size:10.5px;font-weight:700;letter-spacing:.14em;fill:#222}.sub{font-size:8.5px;letter-spacing:.06em;fill:#666;font-family:"JetBrains Mono",monospace}'
 '.blk{fill:#fff;stroke:#555;stroke-width:.6}.blks{fill:#6a655d}.cap{font-size:9px;letter-spacing:.14em;fill:#777}</style>',
 f'<rect class="sea" width="{W}" height="{H}"/>']
# shallows: layer 1 drawn flat at z=0 with no riser (height of land starts at layer 2)
for ring in rings_at(0.5):
    pts = simplify_ring(ring, 1.8)
    svg.append('<path class="shelf" d="M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z"/>')
# land layers 2..5 -> z = 1..4
for z, lv in enumerate([1.5, 2.5, 3.5, 4.5], start=1):
    for ring in rings_at(lv):
        pts = simplify_ring(ring, 1.8)
        w, e, t = ring_paths(pts, z)
        svg.append(f'<path class="rw" d="{w}"/><path class="re" d="{e}"/><path class="tp t{z + 1}" d="{t}"/>')
# hoodoos: one block per published (summit) and written (bench 4) item, placed on a small ring
for key, f in fields.items():
    cx, cy = f['c']
    for lay, cnt in ((5, f['n'][4]), (4, f['n'][3])):
        if cnt == 0: continue
        z = lay - 1; rad = 0 if lay == 5 and cnt == 1 else (f['r'][lay - 1] * 0.45 if lay == 5 else (f['r'][3] + f['r'][4]) / 2 * 0.98)
        for i in range(cnt):
            a = 2 * math.pi * i / cnt + seed(key)
            x, y = cx + rad * math.cos(a), cy + rad * 0.9 * math.sin(a) - z * ZS
            r, hgt = 2.2, 2.6
            svg.append(f'<path class="blks" d="M{x - r:.1f} {y - hgt:.1f}V{y:.1f}A{r:.1f} {r * .5:.1f} 0 0 0 {x + r:.1f} {y:.1f}V{y - hgt:.1f}Z"/>'
                       f'<ellipse class="blk" cx="{x:.1f}" cy="{y - hgt:.1f}" rx="{r:.1f}" ry="{r * .5:.1f}"/>')
    n = f['n']; parts = []
    if n[4]: parts.append(f"{n[4]} PUBLISHED")
    if n[3]: parts.append(f"{n[3]} WRITTEN")
    if n[2]: parts.append(f"{n[2]} READ")
    svg.append(f'<text class="lbl" x="{f["lx"]}" y="{f["ly"]}" text-anchor="middle">{f["name"]}</text>'
               f'<text class="sub" x="{f["lx"]}" y="{f["ly"] + 11}" text-anchor="middle">{" · ".join(parts)}</text>')
svg.append(f'<text class="cap" x="16" y="{H - 12}">SHALLOWS: TO READ · STEPS: CITED, READ, WRITTEN · SUMMIT: PUBLISHED · SADDLE WIDTH: SHARE OF THE SMALLER FIELD\'S ITEMS HELD IN COMMON</text></svg>')
open('strata.svg', 'w').write('\n'.join(svg))
open('view.html', 'w').write(f'<!doctype html><meta charset="utf-8"><body style="margin:0;background:#f4f3ef">{chr(10).join(svg)}</body>')
print('wrote strata.svg', len('\n'.join(svg)) // 1024, 'KB')
