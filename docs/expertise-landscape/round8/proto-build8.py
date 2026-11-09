#!/usr/bin/env python3
"""Round-8 connector prototypes. Takes field positions and radii from the live JSON, redraws the joins.
   python3 build8.py <variant>   variant = plank | mask | arch | arch-shadow | arch-dark
"""
import json, math, sys, html
import numpy as np
from numpy.lib.stride_tricks import sliding_window_view

VAR = sys.argv[1] if len(sys.argv) > 1 else 'arch'
D = json.load(open('/home/pkt/ParthPersonal/portfolio/src/data/expertise-landscape.json'))
W, H, STEP, ZS, L = 900, 520, 2, 12, 5
FIELDS = list(D['fields']); C = {f: tuple(D['fields'][f]['c']) for f in FIELDS}; R = {f: D['fields'][f]['r'] for f in FIELDS}; N = {f: D['fields'][f]['n'] for f in FIELDS}
LAYERS = D['layers']; LI = {n: i for i, n in enumerate(LAYERS)}
SLAB, WAIST, FLARE_IN = 0.35, (0.80 if VAR.startswith(('arch2', 'arch3')) else 0.72), 6.0

# shares: from the live JSON, then forced cases for the prototype
m = {}
for s in D['shares']:
    m.setdefault((s['a'], s['b']), [0] * L)[LI[s['layer']]] = (s['n'], s['of'])
m[('bandits', 'robotics')] = [0, 0, 0, 0, (2, 2)]          # arch case: summit only
m[('ai-systems', 'cloud')] = [0, 0, (3, 6), (2, 3), 0]      # read slab with a written wall on it (as live)
def rho_of(a, b, k):
    v = m[(a, b)][k]
    if not v: return 0.0
    small = a if N[a][k] <= N[b][k] else b
    return 0.5 * R[small][k] * min(1.0, v[0] / v[1])

def phase(key): return (sum(ord(ch) * (i + 7) for i, ch in enumerate(key)) % 360) * math.pi / 180
def warp(key, th):
    p_ = phase(key); return 1 + 0.16 * math.sin(3 * th + p_) + 0.09 * math.sin(5 * th + 2.3 * p_) + 0.05 * math.sin(7 * th - p_)
def edge(key, k, th): return R[key][k] / warp(key, th)

CXm = sum(c[0] for c in C.values()) / len(C); CYm = sum(c[1] for c in C.values()) / len(C)
NX, NY = W // STEP + 1, H // STEP + 1
X, Y = np.meshgrid(np.arange(NX) * STEP, np.arange(NY) * STEP)
Z = np.zeros_like(X, dtype=float)
for f in FIELDS:
    cx, cy = C[f]; dx, dy = X - cx, Y - cy; th, p_ = np.arctan2(dy, dx), phase(f)
    d = np.hypot(dx, dy) * (1 + 0.16 * np.sin(3 * th + p_) + 0.09 * np.sin(5 * th + 2.3 * p_) + 0.05 * np.sin(7 * th - p_))
    for k in range(L):
        if R[f][k] > 0: Z = np.maximum(Z, np.where(d <= R[f][k], k + 1, 0))
def blur(A, rad=2):
    P = np.pad(A, rad, mode='edge'); k = 2 * rad + 1; return sliding_window_view(P, (k, k)).mean(axis=(2, 3))

# join geometry per layer: axis, half-width profile with a waist, extended FLARE_IN into each terrace
JOINS = {}
for (a, b), mm in m.items():
    for k in range(1, L):
        rho = rho_of(a, b, k)
        if rho < 3: continue
        (ax, ay), (bx, by) = C[a], C[b]; th = math.atan2(by - ay, bx - ax); ux, uy = math.cos(th), math.sin(th)
        ra, rb = edge(a, k, th) - FLARE_IN, edge(b, k, th + math.pi) - FLARE_IN
        pa, pb = (ax + ux * ra, ay + uy * ra), (bx - ux * rb, by - uy * rb)
        length = math.dist(pa, pb); nx, ny = -uy, ux
        sag = 0.09 * length if VAR.startswith('arch3') else 0.0
        mid = ((pa[0] + pb[0]) / 2, (pa[1] + pb[1]) / 2)
        if (mid[0] - CXm) * nx + (mid[1] - CYm) * ny < 0: nx, ny = -nx, -ny       # bulge away from the plateau centre
        pts = [(pa[0] + (pb[0] - pa[0]) * t + nx * sag * math.sin(math.pi * t), pa[1] + (pb[1] - pa[1]) * t + ny * sag * math.sin(math.pi * t)) for t in [i / 24 for i in range(25)]]
        JOINS.setdefault(k, []).append(dict(a=a, b=b, pa=pa, pb=pb, u=(ux, uy), rho=rho, length=length, pts=pts))
def capsule_mask(j, extra=0.0):
    pts = j['pts']; n_ = len(pts) - 1; dist = np.full(X.shape, 1e9); t = np.zeros(X.shape)
    for i in range(n_):
        (ax, ay), (bx, by) = pts[i], pts[i + 1]; vx, vy = bx - ax, by - ay; ll = vx * vx + vy * vy or 1e-9
        tt = np.clip(((X - ax) * vx + (Y - ay) * vy) / ll, 0, 1); d_ = np.hypot(X - (ax + tt * vx), Y - (ay + tt * vy))
        closer = d_ < dist; dist = np.where(closer, d_, dist); t = np.where(closer, (i + tt) / n_, t)
    e = np.clip(np.minimum(t, 1 - t) / 0.35, 0, 1); e = e * e * (3 - 2 * e)          # smoothstep 0 at the ends, 1 from 35% in
    prof = j['rho'] * (1 - (1 - WAIST) * e) if VAR != 'plank' else j['rho']
    return dist <= prof + extra
def join_param(j, x, y):
    """(t along the join, lateral distance) for a plan point, measured along the join's polyline."""
    pts = j['pts']; n_ = len(pts) - 1; best = (0.0, 1e9)
    for i in range(n_):
        (ax, ay), (bx, by) = pts[i], pts[i + 1]; vx, vy = bx - ax, by - ay; ll = vx * vx + vy * vy or 1e-9
        tt = ((x - ax) * vx + (y - ay) * vy) / ll; tc = min(max(tt, 0.0), 1.0); d_ = math.hypot(x - (ax + tc * vx), y - (ay + tc * vy))
        if d_ < best[1]: best = ((i + tt) / n_, d_)
    return best

# per-level union masks, blurred, contoured at 0.5
U = {}
for z in range(0, L):
    B = (Z >= z + 1)
    if VAR != 'plank':
        for j in JOINS.get(z, []): B = B | capsule_mask(j)
    U[z] = blur(blur(B.astype(float), 2), 1)

CASES = {1: [('L', 'B')], 2: [('B', 'R')], 3: [('L', 'R')], 4: [('T', 'R')], 5: [('T', 'L'), ('B', 'R')], 6: [('T', 'B')], 7: [('T', 'L')],
         8: [('T', 'L')], 9: [('T', 'B')], 10: [('T', 'R'), ('B', 'L')], 11: [('T', 'R')], 12: [('L', 'R')], 13: [('B', 'R')], 14: [('L', 'B')]}
def rings_at(F, lv):
    segs = []
    for jj in range(NY - 1):
        for i in range(NX - 1):
            a, b, c, d = F[jj, i], F[jj, i + 1], F[jj + 1, i + 1], F[jj + 1, i]
            idx = (8 if a > lv else 0) | (4 if b > lv else 0) | (2 if c > lv else 0) | (1 if d > lv else 0)
            if idx in (0, 15): continue
            x0, y0 = i * STEP, jj * STEP
            t = lambda p, q: (lv - p) / (q - p) if q != p else 0.5
            E = {'T': (x0 + t(a, b) * STEP, y0), 'R': (x0 + STEP, y0 + t(b, c) * STEP), 'B': (x0 + t(d, c) * STEP, y0 + STEP), 'L': (x0, y0 + t(a, d) * STEP)}
            for e1, e2 in CASES[idx]: segs.append((E[e1], E[e2]))
    key = lambda p: (round(p[0] * 100), round(p[1] * 100)); at = {}
    for i, s in enumerate(segs): at.setdefault(key(s[0]), []).append(i); at.setdefault(key(s[1]), []).append(i)
    used, out = [False] * len(segs), []
    for i in range(len(segs)):
        if used[i]: continue
        used[i] = True; ring, cur, start = [segs[i][0], segs[i][1]], segs[i][1], key(segs[i][0])
        for _ in range(len(segs)):
            k = key(cur)
            if k == start: break
            cand = next((jx for jx in at.get(k, []) if not used[jx]), None)
            if cand is None: break
            used[cand] = True; s = segs[cand]; cur = s[1] if key(s[0]) == k else s[0]; ring.append(cur)
        if len(ring) > 16: out.append(ring)
    return out
def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]; dx, dy = x2 - x1, y2 - y1; nrm = math.hypot(dx, dy) or 1e-9; dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / nrm
        if d > dmax: dmax, idx = d, i
    if dmax > eps: return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]
def simplify_ring(ring, eps):
    pts = ring[:-1] if ring[0] == ring[-1] else list(ring)
    i = max(range(len(pts)), key=lambda jx: (pts[jx][0] - pts[0][0]) ** 2 + (pts[jx][1] - pts[0][1]) ** 2)
    a = rdp(pts[:i + 1], eps); b = rdp(pts[i:] + [pts[0]], eps); return a[:-1] + b[:-1]
def fmt(x, y): return f'{x:.1f} {y:.1f}'
def P(x, y, z): return (x, y - z * ZS)
LIGHT = (-0.707, 0.707)
def sample(F, x, y):
    i, jj = int(round(x / STEP)), int(round(y / STEP)); i = min(max(i, 0), NX - 1); jj = min(max(jj, 0), NY - 1); return F[jj, i]

def rise_at(z, x, y):
    """Riser depth below a ring vertex at level z: a full step over ground, an arch profile over a join."""
    for j in JOINS.get(z, []):
        t, lat = join_param(j, x, y)
        if -0.02 <= t <= 1.02 and lat <= j['rho'] * 1.15 + 3:
            if VAR == 'plank' or VAR == 'mask':
                ground = sample(U.get(z - 1, U[0]), x, y) > 0.5 if z - 1 >= 0 else False
                return ZS if ground else SLAB * ZS
            # arch: full depth at the abutments, slab depth at mid-span; over ground the step is full anyway
            if z - 1 >= 0 and sample(U[z - 1], x, y) > 0.5 and not any(join_param(j2, x, y)[1] <= j2['rho'] * 1.15 + 3 and -0.02 <= join_param(j2, x, y)[0] <= 1.02 for j2 in JOINS.get(z - 1, [])):
                return ZS
            t0, t1 = clear_span(z, j)
            if t1 <= t0: return SLAB * ZS
            u = (min(max(t, t0), t1) - t0) / (t1 - t0)              # 0..1 across the clear span
            a_, b_ = 0.80 * ZS, 0.20 * ZS                            # abutment and mid-span depths
            if u < 0.15 or u > 0.85: return a_
            v = (u - 0.5) / 0.35                                     # -1..1 over the central 70%
            return b_ + (a_ - b_) * (1 - math.sqrt(max(0.0, 1 - v * v)))   # half-ellipse: thinnest at mid-span
    return ZS

_cs = {}
def clear_span(z, j):
    key = (z, j['a'], j['b'])
    if key in _cs: return _cs[key]
    pts = j['pts']; ts = [i / 24 for i in range(25)]
    free = [t for t, (x_, y_) in zip(ts, pts) if not (z - 1 >= 0 and sample(U[z - 1], x_, y_) > 0.5)]
    _cs[key] = (min(free), max(free)) if free else (0.5, 0.5)
    return _cs[key]
def ring_paths(ring, z):
    top = [P(x, y, z) for x, y in ring]; nn_ = len(top)
    rises = [rise_at(z, x, y) for x, y in ring]
    A = sum(top[i][0] * top[(i + 1) % nn_][1] - top[(i + 1) % nn_][0] * top[i][1] for i in range(nn_)); sgn = 1 if A > 0 else -1
    side, lit = [], []
    for i in range(nn_):
        p, q = top[i], top[(i + 1) % nn_]; dx, dy = q[0] - p[0], q[1] - p[1]; nx, ny = sgn * dy, -sgn * dx
        nl = math.hypot(nx, ny) or 1e-9; nx, ny = nx / nl, ny / nl
        side.append(None if ny <= 0 else ('w' if nx < 0 else 'e'))
        dot = nx * LIGHT[0] + ny * LIGHT[1]; lit.append('L' if dot > 0.25 else 'S' if dot < -0.25 else None)
    def strips(cls, extrude):
        out = {}; start = next((i for i in range(nn_) if cls[i] != cls[i - 1]), 0); i = 0
        while i < nn_:
            k = (start + i) % nn_; s = cls[k]
            if s is None: i += 1; continue
            run = [k]
            while i + len(run) < nn_ and cls[(start + i + len(run)) % nn_] == s: run.append((start + i + len(run)) % nn_)
            idxs = run + [(run[-1] + 1) % nn_]
            if extrude: d = 'M' + 'L'.join(fmt(*top[jx]) for jx in idxs) + 'L' + 'L'.join(fmt(top[jx][0], top[jx][1] + rises[jx]) for jx in reversed(idxs)) + 'Z'
            else: d = 'M' + 'L'.join(fmt(*top[jx]) for jx in idxs)
            out.setdefault(s, []).append(d); i += len(run)
        return out
    ris, tan = strips(side, True), strips(lit, False)
    return ''.join(ris.get('w', [])), ''.join(ris.get('e', [])), 'M' + 'L'.join(fmt(x, y) for x, y in top) + 'Z', ''.join(tan.get('L', [])), ''.join(tan.get('S', []))

TER = []
def add(cls, d, k): TER.append(dict(c=cls, d=d, k=k))
for ring in rings_at(U[0], 0.5): add('shelf', 'M' + 'L'.join(fmt(x, y) for x, y in simplify_ring(ring, 0.9)) + 'Z', 1)
for z in range(1, L):
    if VAR == 'arch-shadow':
        for j in JOINS.get(z, []):            # soft cast shadow of the join on whatever lies beneath, offset up-right (light from lower left)
            (ax, ay), (bx, by) = j['pa'], j['pb']; ux, uy = j['u']; nx, ny = -uy, ux; r_ = j['rho'] * 0.9
            poly = [(ax + nx * r_, ay + ny * r_), (bx + nx * r_, by + ny * r_), (bx - nx * r_, by - ny * r_), (ax - nx * r_, ay - ny * r_)]
            q = [P(x + 3, y - 3, z - 1) for x, y in poly]
            add('shadow', 'M' + 'L'.join(fmt(*p) for p in q) + 'Z', z)
    for ring in rings_at(U[z], 0.5):
        simp = simplify_ring(ring, 0.9); w, e_, t, lit, shd = ring_paths(simp, z); k = z + 1
        if w: add(f'rw r{k}', w, k)
        if e_: add(f're r{k}', e_, k)
        add(f'tp t{k}', t, k)
        if lit: add('tk lit', lit, k)
        if shd: add('tk shd', shd, k)
    if VAR == 'plank':
        for j in JOINS.get(z, []):
            (ax, ay), (bx, by) = j['pa'], j['pb']; ux, uy = j['u']; nx, ny = -uy, ux; r_ = j['rho']
            poly = [(ax + nx * r_, ay + ny * r_), (bx + nx * r_, by + ny * r_), (bx - nx * r_, by - ny * r_), (ax - nx * r_, ay - ny * r_)]
            w, e_, t, _, _ = ring_paths(poly, z); k = z + 1
            if w: add(f'rw r{k} span', w, k)
            if e_: add(f're r{k} span', e_, k)
            add(f'tp t{k} span', t, k)
    if VAR == 'arch2-dark':
        for j in JOINS.get(z, []):
            (ax, ay), (bx, by) = j['pa'], j['pb']; ux, uy = j['u']; nx, ny = -uy, ux; pts = []
            for i in list(range(0, 21)) + list(range(20, -1, -1)):
                t = i / 20; e = min(t, 1 - t) / 0.35; e = min(max(e, 0), 1); e = e * e * (3 - 2 * e); r_ = j['rho'] * (1 - (1 - WAIST) * e) * 0.95
                sgn_ = 1 if len(pts) < 21 else -1
                pts.append((ax + ux * j['length'] * t + sgn_ * nx * r_, ay + uy * j['length'] * t + sgn_ * ny * r_))
            TER.append(dict(c='darkgrad', d='M' + 'L'.join(fmt(*P(x, y, z)) for x, y in pts) + 'Z', k=z + 1, g=[*P(ax, ay, z), *P(bx, by, z)]))
    if VAR == 'arch-dark':
        for j in JOINS.get(z, []):            # deck one tint darker over the join only (clipped by the capsule in plan)
            (ax, ay), (bx, by) = j['pa'], j['pb']; ux, uy = j['u']; nx, ny = -uy, ux
            pts = []
            for i in range(0, 21):
                t = i / 20; r_ = j['rho'] * (WAIST + (1 - WAIST) * math.cos(math.pi * t) ** 2) * 0.92
                pts.append((ax + ux * j['length'] * t + nx * r_, ay + uy * j['length'] * t + ny * r_))
            for i in range(20, -1, -1):
                t = i / 20; r_ = j['rho'] * (WAIST + (1 - WAIST) * math.cos(math.pi * t) ** 2) * 0.92
                pts.append((ax + ux * j['length'] * t - nx * r_, ay + uy * j['length'] * t - ny * r_))
            add('dark', 'M' + 'L'.join(fmt(*P(x, y, z)) for x, y in pts) + 'Z', z + 1)

PAL = dict(sea='#fbfbfc', shelf='#D7E6E0', shelfe='#9FB8AE', t5='#DCCDB9', t4='#D0AC93', t3='#C2947B', t2='#AB7B6F',
           rw5='#C8B6A1', re5='#A2907F', rw4='#BD967D', re4='#96725F', rw3='#AF7E65', re3='#885B49', rw2='#98655A', re2='#71443E', edge='#56423D', ink='#2B2D33')
def view(cx, cy, s, name, labels=True):
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Archivo, Helvetica, sans-serif">',
         '<defs><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>',
         f'<rect width="{W}" height="{H}" fill="{PAL["sea"]}"/>', f'<g transform="translate({W/2 - cx*s:.1f} {H/2 - cy*s:.1f}) scale({s})">']
    for p in TER:
        c = p['c'].split()
        if c[0] == 'shelf': o.append(f'<path d="{p["d"]}" fill="{PAL["shelf"]}" stroke="{PAL["shelfe"]}" stroke-width="{0.6/s:.2f}" stroke-dasharray="{2/s:.2f} {2/s:.2f}"/>')
        elif c[0] in ('rw', 're'): o.append(f'<path d="{p["d"]}" fill="{PAL[c[0] + c[1][1]]}"/>')
        elif c[0] == 'tp': o.append(f'<path d="{p["d"]}" fill="{PAL[c[1]]}" stroke="{PAL["edge"]}" stroke-width="{0.5/s:.2f}"/>')
        elif c[0] == 'tk': o.append(f'<path d="{p["d"]}" fill="none" stroke="{"#fff" if c[1] == "lit" else PAL["edge"]}" stroke-opacity="{0.6 if c[1] == "lit" else 0.45}" stroke-width="{1/s:.2f}" stroke-linecap="round"/>')
        elif c[0] == 'shadow': o.append(f'<path d="{p["d"]}" fill="#000" fill-opacity="0.13" filter="url(#sh)"/>')
        elif c[0] == 'dark': o.append(f'<path d="{p["d"]}" fill="#000" fill-opacity="0.06"/>')
        elif c[0] == 'darkgrad':
            gid = f'g{len(o)}'; x1, y1, x2, y2 = p['g']
            o.append(f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.35" stop-color="#000" stop-opacity="0.06"/><stop offset="0.65" stop-color="#000" stop-opacity="0.06"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>')
            o.append(f'<path d="{p["d"]}" fill="url(#{gid})"/>')
    o.append('</g>')
    if labels:
        for k, f in D['fields'].items():
            x, y = W/2 + (f['c'][0] - cx) * s, H/2 + (f['c'][1] - cy) * s - 5 * ZS * s - 6
            o.append(f'<text x="{x:.0f}" y="{y:.0f}" text-anchor="middle" font-size="10" font-weight="700" letter-spacing=".12em" fill="{PAL["ink"]}" stroke="{PAL["sea"]}" stroke-width="3" paint-order="stroke">{html.escape(f["title"].upper())}</text>')
    o.append('</svg>'); open(f'{name}.svg', 'w').write('\n'.join(o))
c0 = D['cam0']; view(c0['cx'], c0['cy'], c0['s'], f'{VAR}-overview')
B, Rb = C['bandits'], C['robotics']; view((B[0] + Rb[0]) / 2, (B[1] + Rb[1]) / 2 - 30, 2.6, f'{VAR}-arch')
O, Hy = C['optimization'], C['hyperspectral']; view((O[0] + Hy[0]) / 2, (O[1] + Hy[1]) / 2 - 30, 2.6, f'{VAR}-wall')
print(VAR, 'joins:', {k: [(j['a'], j['b'], round(j['rho'], 1)) for j in v] for k, v in JOINS.items()})
