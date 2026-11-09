#!/usr/bin/env python3
"""Marker option sheet v2: six live candidates on the Bandits summit at mesa scale, plus a 3x detail strip."""
import json, math
D = json.load(open('/home/pkt/ParthPersonal/portfolio/src/data/expertise-landscape.json'))
PAL = dict(sea='#F0F5F3', shelf='#D7E6E0', t5='#DCCDB9', t4='#D0AC93', t3='#C2947B', t2='#AB7B6F',
           rw5='#C8B6A1', re5='#A2907F', rw4='#BD967D', re4='#96725F', rw3='#AF7E65', re3='#885B49', rw2='#98655A', re2='#71443E',
           edge='#56423D', ink='#3A2A24', rim='#FFFFFF', shade='#4A2F26', red='#E5231B')
items = [it for it in D['items'] if it['f'] == 'bandits' and it['type'] != 'overflow']
rows = {}
for it in items: rows.setdefault(it['lay'], []).append(it)
for lay, its in rows.items():
    its.sort(key=lambda i: (i.get('year') or 0, i['name']))
    y = sum(i['y'] for i in its) / len(its); x0 = sum(i['x'] for i in its) / len(its) - 17 * (len(its) - 1) / 2
    for k, i in enumerate(its): i['px'], i['py'] = x0 + 17 * k, y
CX, CY, CW, CH, SC = 446, 170, 120, 84, 3.2
PW, PH = CW * SC, CH * SC
def terrain_group():
    out = [f'<g transform="translate({PW/2 - CX*SC:.1f} {PH/2 - CY*SC:.1f}) scale({SC})">', f'<rect x="{CX-CW}" y="{CY-CH}" width="{2*CW}" height="{2*CH}" fill="{PAL["sea"]}"/>']
    for p in D['terrain']:
        cls = p['c'].split()
        if cls[0] == 'shelf': fill = PAL['shelf']; stroke = ''
        elif cls[0] == 'rw': fill = PAL['rw' + cls[1][1]]; stroke = ''
        elif cls[0] == 're': fill = PAL['re' + cls[1][1]]; stroke = ''
        elif cls[0] == 'tp': fill = PAL[cls[1]]; stroke = f' stroke="{PAL["edge"]}" stroke-width="0.15"'
        else: continue
        out.append(f'<path d="{p["d"]}" fill="{fill}"{stroke}/>')
    out.append('</g>'); return '\n'.join(out)
def S(x, y): return (PW / 2 + (x - CX) * SC, PH / 2 + (y - CY) * SC)
draft = lambda it: not it.get('public', True)
MONO = 'font-family="JetBrains Mono, ui-monospace, monospace"'
def num(x, y, it, dx=5.5, fill=None, size=7.5):
    return f'<text x="{x + dx:.1f}" y="{y + 2.7:.1f}" {MONO} font-size="{size}" fill="{fill or PAL["ink"]}">{it["i"]:02d}</text>'
# type signs: straight strokes on a 5x5 grid (Opus): paper square, patent square+diagonal, system plus, post chevron, note dash
SIGN = {'paper': 'M0 0h5v5h-5z', 'patent': 'M0 0h5v5h-5zM0 5L5 0', 'system': 'M2.5 0v5M0 2.5h5', 'post': 'M1 0l3 2.5l-3 2.5', 'note': 'M1 2.5h3', 'talk': 'M0 0l2.5 5l2.5-5'}
def sign(x, y, it, stroke, dash=False, w=1.0):
    d = SIGN.get(it['type'], SIGN['paper']); da = ' stroke-dasharray="1 .8"' if dash else ''
    return f'<path transform="translate({x-2.5:.1f} {y-2.5:.1f})" d="{d}" fill="none" stroke="{stroke}" stroke-width="{w}" stroke-linecap="square"{da}/>'
# 1 inscription on the lit riser below the bench front (Opus + Terra)
def mark_inscr(x, y, it):
    ry = y + 10 * SC * 0.98   # down onto the riser face
    if draft(it):
        return sign(x, ry, it, PAL['shade'], dash=True, w=.8) + num(x, ry, it, 5.5, PAL['shade'])
    return (f'<g transform="translate(.45 -.45)">' + sign(x, ry, it, PAL['rim'], w=.9) + num(x, ry, it, 5.5, PAL['rim']) + '</g>'
            + sign(x, ry, it, PAL['ink']) + num(x, ry, it))
# 2 low cairn (Sol + Terra): three offset slabs, each with top / lit / shade faces, no outline
def slab(x, y, w, h, off):
    x0 = x + off - w / 2
    return (f'<path d="M{x0:.1f} {y:.1f}h{w:.1f}v{h:.1f}h{-w:.1f}z" fill="{PAL["rw4"]}"/>'
            f'<path d="M{x0:.1f} {y:.1f}h{w:.1f}v{h*0.45:.1f}h{-w:.1f}z" fill="{PAL["t5"]}"/>'
            f'<path d="M{x0+w-1.1:.1f} {y+.3:.1f}h1.1v{h-.3:.1f}h-1.1z" fill="{PAL["re4"]}"/>')
def mark_cairn(x, y, it):
    o = [slab(x, y - 2.2, 7, 2.2, 0), slab(x, y - 4.1, 5.3, 1.9, -0.7)]
    if draft(it): o.append(slab(x + 6.2, y - 1.6, 3.2, 1.6, 0))
    else: o.append(slab(x, y - 5.7, 3.2, 1.6, 0.6))
    o.append(f'<path d="M{x-3.6:.1f} {y:.1f}h7.2" stroke="{PAL["ink"]}" stroke-width=".5" opacity=".5"/>')
    return ''.join(o) + num(x, y - 2.6, it, 5.8 + (3.2 if draft(it) else 0))
# 3 benchmark disk (Sol): plan-oblique ellipse, ink socket, rim inset, top-tone face; type nicks on the front rim; draft opening back-right
def mark_disk(x, y, it):
    o = [f'<ellipse cx="{x}" cy="{y}" rx="3.5" ry="2.25" fill="{PAL["ink"]}"/>']
    if draft(it):
        o.append(f'<path d="M{x+3.0:.1f} {y-1.8:.1f}A3 1.8 0 1 0 {x+3.0:.1f} {y-1.8:.1f}" fill="none" stroke="{PAL["rim"]}" stroke-width=".9" stroke-dasharray="7.2 2.4"/>')
    else:
        o.append(f'<ellipse cx="{x-.25}" cy="{y+.25}" rx="3" ry="1.8" fill="{PAL["rim"]}"/><ellipse cx="{x-.25}" cy="{y+.25}" rx="2.4" ry="1.35" fill="{PAL["t5"]}"/>')
        nicks = {'paper': [0], 'patent': [-1.3, 1.3], 'system': [-1.3, 0, 1.3], 'post': [-1.3], 'note': [1.3]}.get(it['type'], [0])
        for n in nicks: o.append(f'<rect x="{x+n-.4:.1f}" y="{y+1.5:.1f}" width=".8" height="1" fill="{PAL["ink"]}"/>')
    return ''.join(o) + num(x, y, it, 5.6)
# 4 tinaja (Terra + Opus): irregular hollow, lit lower-left lip, dark water; draft dry
def mark_tinaja(x, y, it):
    o = [f'<path d="M{x-3.2:.1f} {y:.1f}c0-1.3 1.5-2.1 3.3-2 1.6.1 3 .9 3.1 2 .1 1.2-1.4 2.1-3.2 2.1-1.7 0-3.2-.9-3.2-2.1z" fill="{PAL["re4"]}"/>']
    if draft(it): o.append(f'<path d="M{x-2.3:.1f} {y+.2:.1f}c0-.9 1.1-1.5 2.4-1.4 1.2.1 2.2.6 2.2 1.4 0 .9-1 1.5-2.3 1.5-1.2 0-2.3-.6-2.3-1.5z" fill="{PAL["t5"]}"/>')
    else: o.append(f'<path d="M{x-2.4:.1f} {y+.2:.1f}c0-.9 1.1-1.5 2.4-1.4 1.2.1 2.3.6 2.3 1.4 0 .9-1 1.5-2.3 1.5-1.3 0-2.4-.6-2.4-1.5z" fill="{PAL["shade"]}"/><ellipse cx="{x-.9}" cy="{y-.2}" rx=".7" ry=".3" fill="{PAL["rim"]}" opacity=".55"/>')
    o.append(f'<path d="M{x-3.1:.1f} {y+.4:.1f}c.2 1 1.5 1.7 3 1.7" fill="none" stroke="{PAL["rim"]}" stroke-width=".6" opacity=".85"/>')
    return ''.join(o) + num(x, y, it, 5.6)
# 5 iron concretion: a dark weathered-out sphere half-buried in the bench
def mark_concretion(x, y, it):
    r = 2.6 if not draft(it) else 1.8
    o = [f'<ellipse cx="{x+.6}" cy="{y+.9}" rx="{r+.4}" ry="{r*.45}" fill="{PAL["ink"]}" opacity=".35"/>',
         f'<circle cx="{x}" cy="{y}" r="{r}" fill="{PAL["shade"] if not draft(it) else PAL["re4"]}"/>',
         f'<path d="M{x-r*.75:.1f} {y+r*.35:.1f}a{r} {r} 0 0 1 {r*.1:.1f} {-r*1.1:.1f}" fill="none" stroke="{PAL["rim"]}" stroke-width=".6" opacity=".7"/>']
    return ''.join(o) + num(x, y, it, r + 3)
# 6 fin (for comparison; carries height)
def mark_fin(x, y, it):
    h = 3.6 if draft(it) else 7.2
    return (f'<rect x="{x-1.1}" y="{y-h}" width="2.2" height="{h}" fill="{PAL["rw4"]}"/><rect x="{x+1.1}" y="{y-h+.6}" width=".9" height="{h-.6}" fill="{PAL["re4"]}"/>'
            f'<path d="M{x-1.1} {y-h}H{x+1.1}" stroke="{PAL["rim"]}" stroke-width=".6"/>' + num(x, y - 2, it, 4.6))
OPTIONS = [('1 · Inscription on the cliff', 'cut into the lit riser below the bench: a straight-stroke type sign and the numeral; a draft is scratched, not cut', mark_inscr),
           ('2 · Low cairn', 'three offset slabs, 7 px wide and under 6 px tall; a draft has its top stone lying beside it', mark_cairn),
           ('3 · Survey disk', 'a benchmark tablet set flush in the bench; rim nicks carry the type; a draft is an open ring', mark_disk),
           ('4 · Tinaja', 'a weathering pothole holding dark water; a draft is a dry hollow', mark_tinaja),
           ('5 · Iron concretion', 'a dark sphere weathered out of the sandstone, half buried; a draft is smaller and paler', mark_concretion),
           ('6 · Fin', 'a thin upright slab; the council rejects it because a row becomes a bar chart', mark_fin)]
COLS = 3; GAP = 18; TOP = 36
SW = COLS * (PW + GAP) + GAP; SH = 2 * (PH + TOP + GAP) + GAP + 300
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{SW:.0f}" height="{SH:.0f}" viewBox="0 0 {SW:.0f} {SH:.0f}" font-family="Archivo, Helvetica, sans-serif"><rect width="100%" height="100%" fill="#FCFCFD"/>']
for n, (title, desc, fn) in enumerate(OPTIONS):
    col, row = n % COLS, n // COLS
    ox, oy = GAP + col * (PW + GAP), GAP + row * (PH + TOP + GAP) + TOP
    svg.append(f'<defs><clipPath id="c{n}"><rect width="{PW:.0f}" height="{PH:.0f}"/></clipPath></defs>')
    svg.append(f'<text x="{ox}" y="{oy-21}" font-size="12.5" font-weight="700" letter-spacing=".08em" fill="#2B2D33">{title.upper()}</text>')
    svg.append(f'<text x="{ox}" y="{oy-7}" font-size="9.5" fill="#74767E">{desc}</text>')
    svg.append(f'<g transform="translate({ox} {oy})" clip-path="url(#c{n})">{terrain_group()}')
    for it in items:
        x, y = S(it['px'], it['py']); svg.append(fn(x, y, it))
    svg.append(f'<rect width="{PW:.0f}" height="{PH:.0f}" fill="none" stroke="#E3E4E8"/></g>')
# detail strip at 3x: paper, patent/system, draft for each option
sy = 2 * (PH + TOP + GAP) + GAP + 10
svg.append(f'<text x="{GAP}" y="{sy+12}" font-size="11" font-weight="700" letter-spacing=".08em" fill="#2B2D33">DETAIL AT 3× · PAPER, PATENT, SYSTEM, POST, DRAFT</text>')
fake = [dict(i=8, type='paper', public=True), dict(i=9, type='patent', public=True), dict(i=10, type='system', public=True), dict(i=12, type='post', public=True), dict(i=16, type='paper', public=False)]
for n, (title, desc, fn) in enumerate(OPTIONS):
    bx = GAP + (n % 3) * 396; by = sy + 24 + (n // 3) * 140
    svg.append(f'<g transform="translate({bx} {by})"><rect width="378" height="108" fill="{PAL["t5"]}"/><rect y="66" width="378" height="42" fill="{PAL["rw5"]}"/>')
    svg.append('<g transform="scale(3)">')
    for k, it in enumerate(fake):
        x, y = 10 + k * 24, 12
        svg.append(fn(x, y, it) if fn is not mark_inscr else fn(x, y - 10 * SC * 0.98 + 16.5, it))
    svg.append('</g>')
    svg.append(f'<text x="4" y="120" font-size="9.5" fill="#74767E">{title}</text></g>')
svg.append('</svg>')
open('sheet2.svg', 'w').write('\n'.join(svg))
open('sheet2.html', 'w').write('<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><body style="margin:0;background:#FCFCFD">' + '\n'.join(svg) + '</body>')
print('sheet2', SW, SH)
