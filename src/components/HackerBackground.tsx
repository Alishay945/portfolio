"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   CREATIVE HACKER BACKGROUND
   Layers (bottom → top):
   1. Synthwave perspective grid floor
   2. Rotating wireframe globe (3-D projected)
   3. Animated circuit-board traces
   4. Pulsing data-ring emitters
   5. Floating neon particles
   6. Holographic scan sweep
   7. Glitch flicker
───────────────────────────────────────────────────────────── */

export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Theme helpers ─────────────────────────────────────── */
    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") ?? "dark";

    interface Palette {
      bg: string;
      c1: string; // primary accent
      c2: string; // secondary accent
      c3: string; // tertiary
      alpha: number; // overall canvas wash alpha
    }

    const palettes: Record<string, Palette> = {
      dark: {
        bg: "rgba(8,14,30,",
        c1: "#00f5ff",
        c2: "#0066ff",
        c3: "#ff00ff",
        alpha: 0.18,
      },
      light: {
        bg: "rgba(220,230,255,",
        c1: "#0044cc",
        c2: "#0088ff",
        c3: "#cc00cc",
        alpha: 0.12,
      },
      purple: {
        bg: "rgba(10,4,28,",
        c1: "#bf5fff",
        c2: "#ff2d78",
        c3: "#00e5ff",
        alpha: 0.18,
      },
      emerald: {
        bg: "rgba(2,18,10,",
        c1: "#00ff9f",
        c2: "#00cfff",
        c3: "#ffee00",
        alpha: 0.18,
      },
    };

    const P = () => palettes[getTheme()] ?? palettes.dark;

    /*────────────────────────────────────────────────────────
       LAYER 1 · PERSPECTIVE GRID
    ──────────────────────────────────────────────────────── */
    const GRID_LINES = 16;
    let gridPulse = 0;

    const drawGrid = (p: Palette) => {
      const horizon = H * 0.62;
      const vx = W / 2; // vanishing point X
      const vy = horizon; // vanishing point Y

      gridPulse += 0.008;
      const pulse = 0.4 + Math.sin(gridPulse) * 0.2;

      ctx.save();

      // Horizontal lines (receding to horizon)
      for (let i = 0; i <= GRID_LINES; i++) {
        const t = i / GRID_LINES;
        const eased = Math.pow(t, 2.5); // perspective bunching
        const y = horizon + eased * (H - horizon + 60);
        const alpha = pulse * (1 - t * 0.85) * 0.55;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `${p.c2}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 0.8 + (1 - t) * 0.4;
        ctx.stroke();
      }

      // Vertical lines converging to vanishing point
      const spread = W * 0.9;
      for (let i = 0; i <= GRID_LINES; i++) {
        const x = vx - spread / 2 + (spread / GRID_LINES) * i;
        const alpha = pulse * 0.4;

        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(x, H + 60);
        ctx.strokeStyle = `${p.c1}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Moving stripe (like data rushing toward the viewer)
      const stripe = ((Date.now() / 20) % (H - horizon));
      for (let s = 0; s < 3; s++) {
        const sy = horizon + ((stripe + s * 120) % (H - horizon + 60));
        const alpha = 0.25 * (1 - ((sy - horizon) / (H - horizon)));
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(W, sy);
        ctx.strokeStyle = `${p.c1}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Horizon glow line
      const hGrad = ctx.createLinearGradient(0, horizon - 8, 0, horizon + 8);
      hGrad.addColorStop(0, "transparent");
      hGrad.addColorStop(0.5, p.c1 + "55");
      hGrad.addColorStop(1, "transparent");
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, horizon - 8, W, 16);

      ctx.restore();
    };

    /* ────────────────────────────────────────────────────────
       LAYER 2 · WIREFRAME ROTATING GLOBE
    ──────────────────────────────────────────────────────── */
    let globeAngle = 0;
    const GLOBE_R = Math.min(W, H) * 0.22;
    const GLOBE_CX = W * 0.5;
    const GLOBE_CY = H * 0.34;
    const LAT_LINES = 9;
    const LON_LINES = 12;

    // Hotspot connection arcs
    interface Arc {
      lat1: number;
      lon1: number;
      lat2: number;
      lon2: number;
      progress: number;
      speed: number;
      label: string;
    }

    const LABELS = ["EXPLOIT", "PAYLOAD", "NMAP", "TOR", "VPN", "SSH", "ROOT", "HASH"];
    const arcs: Arc[] = Array.from({ length: 6 }, (_, i) => ({
      lat1: (Math.random() - 0.5) * Math.PI,
      lon1: Math.random() * Math.PI * 2,
      lat2: (Math.random() - 0.5) * Math.PI,
      lon2: Math.random() * Math.PI * 2,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
      label: LABELS[i % LABELS.length],
    }));

    const project3D = (lat: number, lon: number, r: number, cx: number, cy: number, angle: number) => {
      const x3 = r * Math.cos(lat) * Math.sin(lon + angle);
      const y3 = r * Math.sin(lat);
      const z3 = r * Math.cos(lat) * Math.cos(lon + angle);
      return { x: cx + x3, y: cy - y3, z: z3 };
    };

    const drawGlobe = (p: Palette) => {
      globeAngle += 0.003;

      ctx.save();

      // Globe atmosphere glow
      const glow = ctx.createRadialGradient(GLOBE_CX, GLOBE_CY, 0, GLOBE_CX, GLOBE_CY, GLOBE_R * 1.5);
      glow.addColorStop(0, p.c1 + "18");
      glow.addColorStop(0.6, p.c2 + "08");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(GLOBE_CX, GLOBE_CY, GLOBE_R * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Latitude rings
      for (let i = 0; i <= LAT_LINES; i++) {
        const lat = -Math.PI / 2 + (Math.PI / LAT_LINES) * i;
        const pts: { x: number; y: number; z: number }[] = [];
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          pts.push(project3D(lat, (Math.PI * 2 * s) / steps, GLOBE_R, GLOBE_CX, GLOBE_CY, globeAngle));
        }
        ctx.beginPath();
        let started = false;
        for (const pt of pts) {
          const visible = pt.z > 0;
          if (!visible) { started = false; continue; }
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = p.c2 + "40";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < LON_LINES; i++) {
        const lon = (Math.PI * 2 * i) / LON_LINES;
        const pts: { x: number; y: number; z: number }[] = [];
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          pts.push(project3D(-Math.PI / 2 + (Math.PI * s) / steps, lon, GLOBE_R, GLOBE_CX, GLOBE_CY, globeAngle));
        }
        ctx.beginPath();
        let started = false;
        for (const pt of pts) {
          if (pt.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = p.c1 + "30";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Globe equator highlight
      {
        const pts: { x: number; y: number; z: number }[] = [];
        for (let s = 0; s <= 120; s++) {
          pts.push(project3D(0, (Math.PI * 2 * s) / 120, GLOBE_R, GLOBE_CX, GLOBE_CY, globeAngle));
        }
        ctx.beginPath();
        let started = false;
        for (const pt of pts) {
          if (pt.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = p.c1 + "88";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Connection arcs (animated)
      for (const arc of arcs) {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.lat1 = (Math.random() - 0.5) * Math.PI;
          arc.lon1 = Math.random() * Math.PI * 2;
          arc.lat2 = (Math.random() - 0.5) * Math.PI;
          arc.lon2 = Math.random() * Math.PI * 2;
          arc.label = LABELS[Math.floor(Math.random() * LABELS.length)];
        }

        const p1 = project3D(arc.lat1, arc.lon1, GLOBE_R, GLOBE_CX, GLOBE_CY, globeAngle);
        const p2 = project3D(arc.lat2, arc.lon2, GLOBE_R, GLOBE_CX, GLOBE_CY, globeAngle);

        if (p1.z < 0 || p2.z < 0) continue;

        // Control point arching above globe
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - GLOBE_R * 0.5;

        // Draw fading trail
        const steps2 = 40;
        const trail = Math.floor(arc.progress * steps2);
        for (let s = Math.max(0, trail - 8); s < trail; s++) {
          const t1 = s / steps2;
          const t2 = (s + 1) / steps2;
          const bx1 = (1 - t1) * (1 - t1) * p1.x + 2 * (1 - t1) * t1 * mx + t1 * t1 * p2.x;
          const by1 = (1 - t1) * (1 - t1) * p1.y + 2 * (1 - t1) * t1 * my + t1 * t1 * p2.y;
          const bx2 = (1 - t2) * (1 - t2) * p1.x + 2 * (1 - t2) * t2 * mx + t2 * t2 * p2.x;
          const by2 = (1 - t2) * (1 - t2) * p1.y + 2 * (1 - t2) * t2 * my + t2 * t2 * p2.y;
          const fadeA = ((s - (trail - 8)) / 8) * 0.9;
          ctx.beginPath();
          ctx.moveTo(bx1, by1);
          ctx.lineTo(bx2, by2);
          ctx.strokeStyle = p.c3 + Math.round(fadeA * 200).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Head dot
        const tHead = arc.progress;
        const hx = (1 - tHead) * (1 - tHead) * p1.x + 2 * (1 - tHead) * tHead * mx + tHead * tHead * p2.x;
        const hy = (1 - tHead) * (1 - tHead) * p1.y + 2 * (1 - tHead) * tHead * my + tHead * tHead * p2.y;
        ctx.beginPath();
        ctx.arc(hx, hy, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.c3;
        ctx.fill();

        // Label near head
        if (arc.progress > 0.1 && arc.progress < 0.9) {
          ctx.font = "8px monospace";
          ctx.fillStyle = p.c3 + "cc";
          ctx.fillText(arc.label, hx + 5, hy - 5);
        }

        // Node dots at endpoints
        for (const pt of [p1, p2]) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.c1;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = p.c1 + "55";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    /* ────────────────────────────────────────────────────────
       LAYER 3 · CIRCUIT TRACES
    ──────────────────────────────────────────────────────── */
    interface Trace {
      x: number;
      y: number;
      path: { x: number; y: number }[];
      len: number;
      head: number;   // drawn length (in segments)
      speed: number;
      life: number;   // 0..1
      dying: boolean;
      color: "c1" | "c2";
    }

    const traces: Trace[] = [];
    const TRACE_MAX = 14;

    const spawnTrace = () => {
      const startX = Math.random() < 0.5 ? 0 : W;
      const startY = Math.random() * H;
      const path: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let cx = startX, cy = startY;
      const segments = 6 + Math.floor(Math.random() * 10);
      const STEP = 50 + Math.random() * 80;
      for (let i = 0; i < segments; i++) {
        const dir = Math.random();
        if (dir < 0.5) cx += (startX === 0 ? 1 : -1) * STEP;
        else if (dir < 0.75) cy -= STEP;
        else cy += STEP;
        cx = Math.max(0, Math.min(W, cx));
        cy = Math.max(0, Math.min(H, cy));
        path.push({ x: cx, y: cy });
      }
      traces.push({
        x: startX, y: startY, path,
        len: path.length,
        head: 0,
        speed: 0.04 + Math.random() * 0.06,
        life: 0,
        dying: false,
        color: Math.random() < 0.6 ? "c1" : "c2",
      });
    };

    const drawTraces = (p: Palette) => {
      if (traces.length < TRACE_MAX && Math.random() < 0.03) spawnTrace();

      for (let i = traces.length - 1; i >= 0; i--) {
        const tr = traces[i];
        tr.head = Math.min(tr.len - 1, tr.head + tr.speed);
        tr.life = Math.min(1, tr.life + 0.015);
        if (tr.head >= tr.len - 1) tr.dying = true;
        if (tr.dying) tr.life -= 0.01;
        if (tr.life <= 0) { traces.splice(i, 1); continue; }

        const col = tr.color === "c1" ? p.c1 : p.c2;
        const headIdx = Math.floor(tr.head);

        for (let s = 0; s < headIdx && s < tr.path.length - 1; s++) {
          const a = tr.path[s], b = tr.path[s + 1];
          const segAlpha = tr.life * (s === headIdx - 1 ? 0.9 : 0.35);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = col + Math.round(segAlpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1.5;
          ctx.shadowColor = col;
          ctx.shadowBlur = 6;
          ctx.stroke();

          // Corner pad
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = col + Math.round(segAlpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    };

    /* ────────────────────────────────────────────────────────
       LAYER 4 · DATA-RING EMITTERS
    ──────────────────────────────────────────────────────── */
    interface Ring {
      x: number;
      y: number;
      r: number;
      maxR: number;
      alpha: number;
      color: "c1" | "c2" | "c3";
    }

    const rings: Ring[] = [];
    const RING_ORIGINS = Array.from({ length: 5 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.7,
    }));
    let ringTimer = 0;

    const drawRings = (p: Palette) => {
      ringTimer++;
      if (ringTimer % 55 === 0) {
        const origin = RING_ORIGINS[Math.floor(Math.random() * RING_ORIGINS.length)];
        rings.push({
          x: origin.x, y: origin.y,
          r: 0, maxR: 80 + Math.random() * 120,
          alpha: 0.9,
          color: (["c1", "c2", "c3"] as const)[Math.floor(Math.random() * 3)],
        });
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += 1.4;
        ring.alpha -= 0.012;
        if (ring.alpha <= 0) { rings.splice(i, 1); continue; }

        const col = ring.color === "c1" ? p.c1 : ring.color === "c2" ? p.c2 : p.c3;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = col + Math.round(ring.alpha * 180).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.5;
        ctx.shadowColor = col;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Tick marks on the ring
        const ticks = 8;
        for (let t = 0; t < ticks; t++) {
          const angle = (Math.PI * 2 * t) / ticks;
          const ix = ring.x + Math.cos(angle) * ring.r;
          const iy = ring.y + Math.sin(angle) * ring.r;
          const ox = ring.x + Math.cos(angle) * (ring.r + 6);
          const oy = ring.y + Math.sin(angle) * (ring.r + 6);
          ctx.beginPath();
          ctx.moveTo(ix, iy);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = col + Math.round(ring.alpha * 200).toString(16).padStart(2, "0");
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    /* ────────────────────────────────────────────────────────
       LAYER 5 · NEON FLOATING PARTICLES
    ──────────────────────────────────────────────────────── */
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: "c1" | "c2" | "c3";
      glyph: string;
    }

    const GLYPHS = "⬡ ◈ ◉ ⬢ ⊕ ⌬ ⬟ ⁂ ✦ ⊛".split(" ");
    const PARTICLE_COUNT = 35;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      size: 8 + Math.random() * 10,
      alpha: 0.2 + Math.random() * 0.5,
      color: (["c1", "c2", "c3"] as const)[Math.floor(Math.random() * 3)],
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    }));

    const drawParticles = (p: Palette) => {
      for (const pt of particles) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < -20) pt.x = W + 20;
        if (pt.x > W + 20) pt.x = -20;
        if (pt.y < -20) pt.y = H + 20;
        if (pt.y > H + 20) pt.y = 20;

        const col = pt.color === "c1" ? p.c1 : pt.color === "c2" ? p.c2 : p.c3;
        ctx.font = `${pt.size}px sans-serif`;
        ctx.fillStyle = col + Math.round(pt.alpha * 180).toString(16).padStart(2, "0");
        ctx.shadowColor = col;
        ctx.shadowBlur = 12;
        ctx.fillText(pt.glyph, pt.x, pt.y);
        ctx.shadowBlur = 0;
      }
    };

    /* ────────────────────────────────────────────────────────
       LAYER 6 · HOLOGRAPHIC SCAN SWEEP
    ──────────────────────────────────────────────────────── */
    let scanAngle = 0;

    const drawScan = (p: Palette) => {
      scanAngle += 0.008;
      const cx = W * 0.5;
      const cy = H * 0.34; // Same as globe center
      const len = GLOBE_R * 1.6;

      // Fan gradient
      const endX = cx + Math.cos(scanAngle) * len;
      const endY = cy + Math.sin(scanAngle) * len;

      const fan = ctx.createLinearGradient(cx, cy, endX, endY);
      fan.addColorStop(0, "transparent");
      fan.addColorStop(0.6, p.c1 + "22");
      fan.addColorStop(1, p.c1 + "00");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(scanAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, len, -0.25, 0.25);
      ctx.closePath();
      ctx.fillStyle = fan;
      ctx.fill();
      ctx.restore();
    };

    /* ────────────────────────────────────────────────────────
       LAYER 7 · GLITCH FLICKER
    ──────────────────────────────────────────────────────── */
    let glitchCountdown = 200 + Math.floor(Math.random() * 300);
    let glitchFrames = 0;

    const drawGlitch = () => {
      glitchCountdown--;
      if (glitchCountdown <= 0 && glitchFrames === 0) {
        glitchFrames = 3 + Math.floor(Math.random() * 5);
        glitchCountdown = 150 + Math.floor(Math.random() * 400);
      }
      if (glitchFrames > 0) {
        const slices = 2 + Math.floor(Math.random() * 3);
        for (let s = 0; s < slices; s++) {
          const gy = Math.random() * H;
          const gh = 2 + Math.random() * 8;
          const gx = (Math.random() - 0.5) * 30;
          ctx.drawImage(canvas, 0, gy, W, gh, gx, gy, W, gh);
        }
        glitchFrames--;
      }
    };

    window.addEventListener("resize", resize, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    /* ────────────────────────────────────────────────────────
       MAIN DRAW LOOP
    ──────────────────────────────────────────────────────── */
    const draw = () => {
      if (document.hidden) return;
      const p = P();

      // Base background wash
      ctx.fillStyle = p.bg + "0.88)";
      ctx.fillRect(0, 0, W, H);

      drawGrid(p);
      drawTraces(p);
      drawRings(p);
      drawGlobe(p);
      drawScan(p);
      drawParticles(p);
      drawGlitch();

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
