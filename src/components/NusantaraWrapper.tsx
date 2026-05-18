'use client';

import { useEffect, useRef } from 'react';

// Simplified island polygons as [lon, lat] pairs
const ISLANDS = [
  { name: 'Sumatra', coords: [[95.2,5.6],[97.0,4.2],[98.5,3.9],[100.5,2.2],[101.5,0.5],[103.5,0.5],[104.5,-1.0],[105.5,-2.5],[107.0,-5.5],[106.0,-5.8],[104.5,-5.5],[103.0,-4.5],[101.5,-3.5],[100.0,-2.5],[98.5,-1.5],[97.0,0.0],[95.5,2.5],[95.2,5.6]] },
  { name: 'Java',     coords: [[105.2,-5.9],[106.5,-6.1],[108.0,-6.8],[110.0,-7.8],[111.5,-7.8],[112.5,-7.5],[113.5,-7.5],[114.5,-8.0],[114.5,-8.4],[112.5,-8.7],[110.5,-8.5],[108.5,-8.0],[107.0,-7.8],[105.5,-7.3],[105.2,-5.9]] },
  { name: 'Kalimantan', coords: [[108.0,1.5],[110.5,2.7],[113.5,2.0],[116.5,3.5],[118.5,4.4],[119.0,3.5],[118.5,2.0],[118.0,0.5],[118.5,-1.5],[116.5,-3.5],[114.5,-4.0],[112.5,-3.0],[110.5,-1.5],[108.5,0.5],[108.0,1.5]] },
  { name: 'Sulawesi',  coords: [[120.0,1.0],[121.5,0.5],[122.5,-0.5],[122.0,-2.0],[121.0,-3.5],[120.5,-5.0],[120.8,-5.8],[122.0,-5.7],[122.5,-4.5],[121.8,-3.2],[122.5,-1.8],[124.0,-1.0],[124.5,0.5],[124.5,1.0],[123.0,1.5],[121.5,1.5],[120.0,1.0]] },
  { name: 'Papua',     coords: [[131.0,-2.0],[132.5,-0.5],[133.5,-0.3],[135.0,-1.0],[137.0,-2.5],[138.0,-3.5],[140.0,-5.0],[141.0,-5.5],[141.0,-8.0],[139.5,-8.5],[138.0,-8.3],[136.0,-7.5],[134.5,-6.0],[132.0,-4.0],[131.0,-3.5],[130.5,-2.5],[131.0,-2.0]] },
  { name: 'Bali',      coords: [[114.5,-8.1],[115.0,-8.0],[115.7,-8.3],[115.7,-8.8],[115.2,-8.9],[114.6,-8.7],[114.5,-8.1]] },
  { name: 'Timor',     coords: [[124.0,-9.0],[125.5,-9.2],[126.5,-9.3],[127.2,-9.6],[127.0,-10.0],[126.0,-10.2],[124.5,-9.8],[124.0,-9.0]] },
  { name: 'Sumbawa',   coords: [[116.6,-8.1],[117.5,-8.2],[118.5,-8.5],[118.5,-9.0],[117.5,-9.1],[116.5,-8.8],[116.6,-8.1]] },
];

const NODES = [
  { lat: 5.5,  lon: 95.3,  label: 'Tari Saman',  color: '#E74C3C', size: 7 },
  { lat: -6.2, lon: 106.8, label: 'Betawi',       color: '#F39C12', size: 9 },
  { lat: -7.0, lon: 110.4, label: 'Gamelan',      color: '#F39C12', size: 8 },
  { lat: -8.4, lon: 115.1, label: 'Kecak',        color: '#9B59B6', size: 10 },
  { lat: -5.1, lon: 119.4, label: 'Toraja',       color: '#1ABC9C', size: 8 },
  { lat: -4.0, lon: 136.0, label: 'Papua',        color: '#3498DB', size: 7 },
  { lat: 0.0,  lon: 109.3, label: 'Dayak',        color: '#1ABC9C', size: 7 },
  { lat: -6.9, lon: 107.6, label: 'Angklung',     color: '#F39C12', size: 8 },
  { lat: -8.6, lon: 122.0, label: 'Tenun Ikat',   color: '#3498DB', size: 6 },
  { lat: -3.7, lon: 128.2, label: 'Cakalele',     color: '#E74C3C', size: 6 },
];

function project(lat: number, lon: number, rotX: number, rotY: number, radius: number, cx: number, cy: number) {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;
  let x = Math.cos(latR) * Math.cos(lonR);
  let y = Math.sin(latR);
  let z = Math.cos(latR) * Math.sin(lonR);
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 = x * cosY - z * sinY; const z1 = x * sinY + z * cosY;
  x = x1; z = z1;
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y1 = y * cosX - z * sinX; const z2 = y * sinX + z * cosX;
  y = y1; z = z2;
  return { sx: cx + x * radius, sy: cy - y * radius, z };
}

function drawIsland(ctx: CanvasRenderingContext2D, coords: number[][], rotX: number, rotY: number, radius: number, cx: number, cy: number, fillColor: string) {
  ctx.beginPath();
  let inPath = false;
  for (const [lon, lat] of coords) {
    const { sx, sy, z } = project(lat, lon, rotX, rotY, radius, cx, cy);
    if (z > 0.05) {
      if (!inPath) { ctx.moveTo(sx, sy); inPath = true; }
      else ctx.lineTo(sx, sy);
    } else { inPath = false; }
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

export default function NusantaraWrapper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ x: 0.25, y: 1.8 });
  const velRef = useRef({ x: 0, y: 0.003 });
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      const c = containerRef.current;
      if (!c || !canvas) return;
      canvas.width = c.clientWidth;
      canvas.height = c.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function isDark() { return document.documentElement.classList.contains('dark'); }

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      const radius = Math.min(W, H) * 0.38;
      const dark = isDark();

      if (!dragging.current) {
        rotRef.current.y += velRef.current.y;
        rotRef.current.x += velRef.current.x;
        velRef.current.x *= 0.92;
      }
      rotRef.current.x = Math.max(-0.85, Math.min(0.85, rotRef.current.x));
      const { x: rotX, y: rotY } = rotRef.current;

      ctx.clearRect(0, 0, W, H);

      // Outer glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.15);
      glow.addColorStop(0, dark ? 'rgba(26,188,156,0.14)' : 'rgba(26,188,156,0.08)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      // Ocean base
      const oceanGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 0, cx, cy, radius);
      if (dark) {
        oceanGrad.addColorStop(0, '#1a6b72');
        oceanGrad.addColorStop(0.5, '#0d4a52');
        oceanGrad.addColorStop(1, '#04232a');
      } else {
        oceanGrad.addColorStop(0, '#6bbfd8');
        oceanGrad.addColorStop(0.5, '#4a9dc0');
        oceanGrad.addColorStop(1, '#2e7da8');
      }
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad; ctx.fill();

      // Clip all content inside globe
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, radius - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Grid lines
      const gridColor = dark ? 'rgba(100,220,200,0.08)' : 'rgba(255,255,255,0.18)';
      ctx.strokeStyle = gridColor; ctx.lineWidth = 0.7;
      for (let lon2 = -180; lon2 < 180; lon2 += 30) {
        ctx.beginPath(); let f = true;
        for (let lat2 = -90; lat2 <= 90; lat2 += 4) {
          const p = project(lat2, lon2, rotX, rotY, radius, cx, cy);
          if (p.z < 0) { f = true; continue; }
          f ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); f = false;
        }
        ctx.stroke();
      }
      for (let lat3 = -60; lat3 <= 60; lat3 += 30) {
        ctx.beginPath(); let f = true;
        for (let lon3 = -180; lon3 <= 180; lon3 += 3) {
          const p = project(lat3, lon3, rotX, rotY, radius, cx, cy);
          if (p.z < 0) { f = true; continue; }
          f ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); f = false;
        }
        ctx.stroke();
      }

      // Islands
      const landColor = dark ? 'rgba(52,200,140,0.88)' : 'rgba(72,160,90,0.92)';
      const landStroke = dark ? 'rgba(80,230,170,0.5)' : 'rgba(40,120,60,0.4)';
      for (const island of ISLANDS) {
        drawIsland(ctx, island.coords, rotX, rotY, radius, cx, cy, landColor);
        ctx.strokeStyle = landStroke; ctx.lineWidth = 0.8; ctx.stroke();
      }

      // Specular highlight
      const spec = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, 0, cx - radius * 0.35, cy - radius * 0.35, radius * 0.55);
      spec.addColorStop(0, dark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.28)');
      spec.addColorStop(1, 'transparent');
      ctx.fillStyle = spec; ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      ctx.restore();

      // Globe border
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = dark ? 'rgba(100,220,200,0.3)' : 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5; ctx.stroke();

      // Cultural nodes
      const projected = NODES.map(n => ({ n, ...project(n.lat, n.lon, rotX, rotY, radius, cx, cy) }));
      projected.sort((a, b) => a.z - b.z);
      for (const { n, sx, sy, z } of projected) {
        if (z < 0) continue;
        const vis = Math.min(1, (z + 0.1) / 0.8);
        const pulse = 1 + Math.sin(Date.now() * 0.003 + n.lon) * 0.15;
        const r = n.size * pulse;
        // glow ring
        const ring = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3);
        ring.addColorStop(0, n.color + Math.floor(vis * 70).toString(16).padStart(2, '0'));
        ring.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = ring; ctx.fill();
        // core
        ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor(vis * 230).toString(16).padStart(2, '0');
        ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${vis * 0.85})`; ctx.fill();
        if (z > 0.3 && vis > 0.5) {
          ctx.font = `600 11px 'Plus Jakarta Sans', sans-serif`;
          ctx.fillStyle = dark ? `rgba(255,255,255,${vis * 0.9})` : `rgba(20,40,30,${vis * 0.9})`;
          ctx.textAlign = 'left';
          ctx.fillText(n.label, sx + r + 4, sy + 4);
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    // Drag — FIXED: negate dx/dy so drag right = globe rotates right
    const onDown = (e: MouseEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      velRef.current = { x: 0, y: 0 };
      canvas.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const f = 0.005;
      rotRef.current.y -= dx * f;   // negated: drag right = globe right
      rotRef.current.x += dy * f;   // positive: drag down = tilt down
      velRef.current = { x: dy * f * 0.3, y: -dx * f * 0.3 };
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
      dragging.current = false;
      if (Math.abs(velRef.current.y) < 0.001) velRef.current.y = 0.003;
      canvas.style.cursor = 'grab';
    };
    const onTouchStart = (e: TouchEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      velRef.current = { x: 0, y: 0 };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;
      const f = 0.005;
      rotRef.current.y -= dx * f;
      rotRef.current.x += dy * f;
      velRef.current = { x: dy * f * 0.3, y: -dx * f * 0.3 };
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      width: '100%', height: '520px', position: 'relative',
      borderRadius: '20px', overflow: 'hidden',
      background: 'var(--globe-bg, radial-gradient(ellipse at 50% 50%, #061a20 0%, #020d10 100%))',
      border: '1px solid rgba(100,220,200,0.2)',
      boxShadow: '0 0 60px rgba(26,188,156,0.12), inset 0 0 60px rgba(0,0,0,0.3)',
    }}>
      {/* Dynamic background that respects theme */}
      <div className="globe-bg-fill" style={{
        position: 'absolute', inset: 0,
        background: 'var(--bg-base)',
        opacity: 0,
      }} />
      <style>{`
        .dark .globe-bg-fill { opacity: 0 !important; }
        :not(.dark) [data-globe] { background: radial-gradient(ellipse at 50% 50%, #d4eef8 0%, #b8dcf0 100%) !important; border-color: rgba(46,125,168,0.3) !important; }
      `}</style>
      <div data-globe="" style={{ position: 'absolute', inset: 0, borderRadius: '20px',
        background: 'radial-gradient(ellipse at 50% 50%, #061a20 0%, #020d10 100%)' }} />
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }} />
      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, zIndex: 2,
        background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(100,220,200,0.2)', borderRadius: '10px',
        padding: '10px 16px',
      }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1ABC9C', margin: 0 }}>🌏 Nusantara 3D</p>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', margin: '2px 0 0' }}>Drag untuk memutar · {NODES.length} titik budaya aktif</p>
      </div>
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, borderRadius: '20px',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
      }} />
    </div>
  );
}
