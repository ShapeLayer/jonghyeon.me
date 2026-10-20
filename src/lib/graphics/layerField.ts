/** Rasterize a rotating 3D sculpture onto a fixed grid of square screen pixels. */
export function createLayerField(canvas: HTMLCanvasElement, onPhase: (phase: string) => void) {
  const context = canvas.getContext('2d');
  if (!context) return { destroy() {}, setPaused(_value: boolean) {} };
  const ctx = context;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0,
    height = 0,
    frame = 0,
    elapsed = 0,
    previous = 0;
  let paused = false,
    visible = true,
    destroyed = false,
    lastPhase = '';
  const smooth = (x: number) => {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
  };
  function draw() {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const cell = width < 380 ? 4 : 4.5,
      scale = Math.min(width / 440, height / 430);
    const cx = Math.round((width * 0.5) / cell) * cell,
      cy = Math.round((height * 0.52) / cell) * cell;
    const angle = 0.58 + elapsed * 0.045,
      sequence = elapsed % 52,
      cycle = Math.max(0, sequence - 20);
    // Close the cuts before melting; reopen them while the volume is still soft.
    const fluid = smooth((sequence - 7) / 4) * (1 - smooth((sequence - 17) / 5));
    const joined = smooth((sequence - 3) / 4) * (1 - smooth((sequence - 14) / 5));
    const build = 1,
      twist = smooth((cycle - 7) / 5) * (1 - smooth((cycle - 24) / 5));
    const fan = smooth((cycle - 16) / 5) * (1 - smooth((cycle - 24) / 5)),
      dissolve = 1;
    const phase =
      sequence >= 3 && sequence < 7
        ? 'MERGING'
        : sequence >= 14 && sequence < 22
          ? 'SLICING'
          : fluid > 0.01
            ? 'FLUID'
            : cycle < 9
              ? 'LAYERS'
              : cycle < 17
                ? 'TWIST'
                : cycle < 25
                  ? 'UNFOLD'
                  : 'REFORM';
    if (phase !== lastPhase) {
      lastPhase = phase;
      onPhase(phase);
    }
    const project = (x: number, y: number, z: number) => {
      const rx = x * Math.cos(angle) + z * Math.sin(angle),
        rz = -x * Math.sin(angle) + z * Math.cos(angle);
      return { x: cx + rx * scale, y: cy + (rz * 0.46 - y) * scale, depth: rz + y * 0.46 };
    };
    ctx.fillStyle = '#796d59';
    for (let x = cell; x < width - cell; x += cell)
      for (let y = 28; y < height - 22; y += cell) {
        const distance = Math.hypot((x - cx) / (width * 0.58), (y - cy) / (height * 0.57));
        ctx.globalAlpha = Math.max(0, 1 - distance) * 0.45;
        ctx.fillRect(x, y, 1, 1);
      }
    ctx.globalAlpha = 1;
    const pixels = new Map<
      number,
      { x: number; y: number; depth: number; color: string; size: number }
    >();
    const columns = Math.ceil(width / cell) + 1;
    const surfaceDepth = new Map<number, number>();
    function mark(x: number, y: number, z: number, color: string, size: number) {
      const p = project(x, y, z),
        gx = Math.round(p.x / cell),
        gy = Math.round(p.y / cell);
      if (gx < 0 || gy < 0 || gx * cell >= width || gy * cell >= height) return;
      const key = gy * columns + gx,
        old = pixels.get(key);
      // Keep solid coverage separately so labels cannot show through pixel gaps.
      if (size > 2 && p.depth > (surfaceDepth.get(key) ?? -Infinity)) {
        surfaceDepth.set(key, p.depth);
      }
      // The camera is above the origin: larger depth is closer to the viewer.
      if (!old || p.depth > old.depth)
        pixels.set(key, { x: gx * cell, y: gy * cell, depth: p.depth, color, size });
    }
    for (let k = -185; k <= 190; k += 5) {
      // All three axes meet at the same origin inside the sculpture.
      mark(k, 0, 0, '#a2937d', 2);
      mark(0, k, 0, '#c5b79e', 2);
      mark(0, 0, k, '#a2937d', 2);
    }
    function surface(x: number, y: number, z: number, color: string) {
      if (fluid > 0) {
        // Spherify the layer volume, then apply coherent, volume-like waves.
        const nx = x / 102,
          ny = (y - 2) / 92,
          nz = z / 102;
        const sphere = (a: number, b: number, c: number) =>
          a * Math.sqrt(Math.max(0.05, 1 - (b * b) / 2 - (c * c) / 2 + (b * b * c * c) / 3));
        const sx = sphere(nx, ny, nz),
          sy = sphere(ny, nz, nx),
          sz = sphere(nz, nx, ny);
        const pulse = Math.sin(elapsed * 0.9);
        const fx = sx * (116 + pulse * 12) + Math.sin(sy * 3 + elapsed * 0.8) * 16;
        const fy = sy * (99 - pulse * 10) + Math.sin(sx * 3 - elapsed * 0.7) * 12;
        const fz = sz * 109 + Math.sin(sy * 3 + sx * 2 - elapsed * 0.65) * 16;
        x += (fx - x) * fluid;
        y += (fy - y) * fluid;
        z += (fz - z) * fluid;
      }
      mark(x, y, z, color, cell - 1.5);
    }
    for (let layer = 0; layer < 10; layer++) {
      const arrival = smooth((build * 12 - layer) / 2) * dissolve;
      if (arrival <= 0) continue;
      const rotation = (layer - 4.5) * 0.13 * twist,
        offset = Math.sin(layer * 0.45) * fan * 45;
      const y = -85 + layer * 18 + (1 - arrival) * 100,
        half = 102 - Math.abs(layer - 4.5) * twist * 3;
      const palette = ['#eee7d9', '#dbc9a8', '#c4a67b', '#ad8759', '#947047'];
      const color = palette[Math.min(4, Math.floor(layer / 2))];
      // Stable mesh topology: thickness changes move existing samples rather than
      // adding whole rows of points at once.
      const thickness = 6 + joined * 12;
      const sideColor =
        '#' +
        [0, 1, 2]
          .map((channel) => {
            const start = parseInt('65523c'.slice(channel * 2, channel * 2 + 2), 16);
            const end = parseInt(color.slice(1 + channel * 2, 3 + channel * 2), 16);
            return Math.round(start + (end - start) * joined)
              .toString(16)
              .padStart(2, '0');
          })
          .join('');
      const segments = Math.ceil(204 / ((cell / scale) * 0.58));
      for (let ia = 0; ia <= segments; ia++) {
        const a = -half + (ia / segments) * half * 2;
        for (let ib = 0; ib <= segments; ib++) {
          const b = -half + (ib / segments) * half * 2;
          const x = (a * Math.cos(rotation) - b * Math.sin(rotation)) * arrival + offset;
          const z = (a * Math.sin(rotation) + b * Math.cos(rotation)) * arrival;
          const lift = fan * a * Math.sin(layer * 0.36) * 0.45;
          surface(x, y + lift, z, color);
          // Include the underside so each opening reveals a real slice.
          surface(x, y + lift - thickness, z, sideColor);
          if (ia === 0 || ib === 0 || ia === segments || ib === segments) {
            for (let step = 1; step < 10; step++) {
              surface(x, y + lift - (thickness * step) / 10, z, sideColor);
            }
          }
        }
      }
    }
    for (const p of pixels.values()) {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.font = 'italic 12px Georgia';
    ctx.fillStyle = '#d0c3ab';
    for (const [label, x, y, z] of [
      ['x', 202, 0, 0],
      ['y', 0, 202, 0],
      ['z', 0, 0, 202]
    ] as const) {
      const p = project(x, y, z);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      // Subtract foreground surface cells from the label's drawing region.
      for (const [key, depth] of surfaceDepth) {
        if (depth <= p.depth) continue;
        const gx = key % columns,
          gy = Math.floor(key / columns);
        if (
          gx * cell > p.x + 20 ||
          (gx + 1) * cell < p.x + 4 ||
          gy * cell > p.y + 4 ||
          (gy + 1) * cell < p.y - 14
        )
          continue;
        ctx.rect(gx * cell, gy * cell, cell, cell);
      }
      ctx.clip('evenodd');
      ctx.fillText(label, p.x + 6, p.y);
      ctx.restore();
    }
  }
  function tick(now: number) {
    frame = 0;
    if (destroyed || paused || !visible || document.hidden || reducedMotion.matches) {
      previous = 0;
      return;
    }
    if (previous) elapsed += Math.min((now - previous) / 1000, 0.05);
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    draw();
    if (!destroyed && !paused && visible && !document.hidden && !reducedMotion.matches)
      frame = requestAnimationFrame(tick);
  }
  const resize = new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  });
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  resize.observe(canvas);
  intersection.observe(canvas);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  sync();
  return {
    setPaused(value: boolean) {
      paused = value;
      sync();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
    }
  };
}
