"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Looping pixel-art animations recreated from the Figma "pixel" designs.
 * Each draws 4x4 blocks on a 32x32 canvas that is upscaled with
 * image-rendering: pixelated, and advances in discrete randomized ticks
 * so the motion feels programmatic rather than tweened.
 */

const CANVAS_SIZE = 32;
const PX = 4;
const ROTATING_TICK_MS = 120;

const PALETTE = ["#E09CEC", "#B5EC00", "#8366F7", "#99C4FF"] as const;
type Color = (typeof PALETTE)[number];
const [PURPLE, LIME, GRAPE, SKY] = PALETTE;

function randomColor(exclude?: Color): Color {
  const options = exclude ? PALETTE.filter((c) => c !== exclude) : PALETTE;
  return options[Math.floor(Math.random() * options.length)];
}

type DrawFrame = (ctx: CanvasRenderingContext2D) => void;

/** Factory returns a stateful frame renderer; first call draws the design as-is. */
type FrameFactory = () => DrawFrame;

function usePixelLoop(createFrame: FrameFactory, tickMs: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const drawFrame = createFrame();
    drawFrame(ctx);
    if (reducedMotion) return;

    let rafId = 0;
    let lastTick = 0;
    let running = false;
    let inView = false;

    const tick = (now: number) => {
      if (!running) {
        rafId = 0;
        return;
      }

      if (now - lastTick >= tickMs) {
        drawFrame(ctx);
        lastTick = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTick = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop();
      else if (inView) start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, [createFrame, reducedMotion, tickMs]);

  return canvasRef;
}

function PixelCanvas({
  createFrame,
  tickMs,
  label,
}: {
  createFrame: FrameFactory;
  tickMs: number;
  label: string;
}) {
  const canvasRef = usePixelLoop(createFrame, tickMs);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      role="img"
      aria-label={label}
      className="size-7 shrink-0 [image-rendering:pixelated]"
    />
  );
}

/* ------------------------------ Rotating ------------------------------ */

// Ring positions in clockwise order starting from the top.
const RING: ReadonlyArray<readonly [number, number]> = [
  [14, 1],
  [18, 3],
  [22, 6],
  [25, 10],
  [27, 14],
  [25, 18],
  [22, 22],
  [18, 25],
  [14, 27],
  [10, 25],
  [6, 22],
  [3, 18],
  [1, 14],
  [3, 10],
  [6, 6],
  [10, 3],
];

const SLIDING_TICK_MS = Math.round(
  (RING.length * ROTATING_TICK_MS) / CANVAS_SIZE,
);

const RING_COLORS: readonly Color[] = [
  PURPLE, LIME, PURPLE, SKY, LIME, GRAPE, PURPLE, SKY,
  LIME, SKY, GRAPE, PURPLE, SKY, GRAPE, LIME, SKY,
];

const createRotatingFrame: FrameFactory = () => {
  const colors = [...RING_COLORS];
  let started = false;

  return (ctx) => {
    if (started) {
      // Rotate the colors one step around the ring, with occasional mutation.
      colors.unshift(colors.pop() as Color);
      if (Math.random() < 0.2) {
        const i = Math.floor(Math.random() * colors.length);
        colors[i] = randomColor(colors[i]);
      }
    }
    started = true;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    RING.forEach(([x, y], i) => {
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, PX, PX);
    });
  };
};

export function RotatingPixels() {
  return (
    <PixelCanvas
      createFrame={createRotatingFrame}
      tickMs={ROTATING_TICK_MS}
      label="Rotating ring of pixels"
    />
  );
}

/* ------------------------------- Sliding ------------------------------ */

type SlideCell = { x: number; color: Color };

const SLIDE_ROWS: ReadonlyArray<{
  y: number;
  speed: number;
  cells: SlideCell[];
}> = [
  {
    y: 7,
    speed: 1,
    cells: [
      { x: 2, color: PURPLE },
      { x: 5, color: SKY },
      { x: 8, color: LIME },
      { x: 14, color: GRAPE },
      { x: 17, color: PURPLE },
      { x: 23, color: LIME },
      { x: 26, color: SKY },
    ],
  },
  {
    y: 14,
    speed: 1,
    cells: [
      { x: 6, color: LIME },
      { x: 9, color: SKY },
      { x: 12, color: GRAPE },
      { x: 19, color: PURPLE },
      { x: 21, color: LIME },
      { x: 23, color: SKY },
    ],
  },
  {
    y: 21,
    speed: 1,
    cells: [
      { x: 2, color: PURPLE },
      { x: 5, color: GRAPE },
      { x: 8, color: LIME },
      { x: 16, color: SKY },
      { x: 17, color: GRAPE },
      { x: 20, color: PURPLE },
    ],
  },
];

const createSlidingFrame: FrameFactory = () => {
  const rows = SLIDE_ROWS.map((row) => ({
    ...row,
    cells: row.cells.map((cell) => ({ ...cell })),
    offset: 0,
  }));
  let started = false;

  return (ctx) => {
    if (started) {
      for (const row of rows) {
        row.offset = (row.offset + row.speed + CANVAS_SIZE) % CANVAS_SIZE;
        if (Math.random() < 0.06) {
          const cell = row.cells[Math.floor(Math.random() * row.cells.length)];
          cell.color = randomColor(cell.color);
        }
      }
    }
    started = true;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    for (const row of rows) {
      for (const cell of row.cells) {
        const x = (cell.x + row.offset) % CANVAS_SIZE;
        ctx.fillStyle = cell.color;
        ctx.fillRect(x, row.y, PX, PX);
        if (x + PX > CANVAS_SIZE) {
          ctx.fillRect(0, row.y, x + PX - CANVAS_SIZE, PX);
        }
      }
    }
  };
};

export function SlidingPixels() {
  return (
    <PixelCanvas
      createFrame={createSlidingFrame}
      tickMs={SLIDING_TICK_MS}
      label="Sliding rows of pixels"
    />
  );
}

/* ------------------------ Morphing shape outlines ------------------------ */

type Vec2 = { x: number; y: number };

const SHAPE_HOLD_TICKS = 28;
const SHAPE_SCALE = 12;

function toCanvas(v: Vec2): Vec2 {
  return {
    x: CANVAS_SIZE / 2 + v.x * SHAPE_SCALE,
    y: CANVAS_SIZE / 2 - v.y * SHAPE_SCALE,
  };
}

function snapBlock(x: number, y: number): readonly [number, number] {
  const bx = Math.round(x / PX) * PX;
  const by = Math.round(y / PX) * PX;
  return [
    Math.max(0, Math.min(CANVAS_SIZE - PX, bx)),
    Math.max(0, Math.min(CANVAS_SIZE - PX, by)),
  ];
}

function blockKey(x: number, y: number): string {
  const [bx, by] = snapBlock(x, y);
  return `${bx},${by}`;
}

function addBlock(keys: Set<string>, x: number, y: number) {
  keys.add(blockKey(x, y));
}

function drawLine(keys: Set<string>, a: Vec2, b: Vec2) {
  const pa = toCanvas(a);
  const pb = toCanvas(b);

  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy), 1);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    addBlock(keys, pa.x + dx * t, pa.y + dy * t);
  }
}

function drawPolyline(keys: Set<string>, points: readonly Vec2[]) {
  for (let i = 0; i < points.length - 1; i++) {
    drawLine(keys, points[i], points[i + 1]);
  }
}

function drawClosed(keys: Set<string>, points: readonly Vec2[]) {
  drawPolyline(keys, [...points, points[0]]);
}

type ShapeBuilder = (keys: Set<string>) => void;

const addSquareShape: ShapeBuilder = (keys) => {
  drawClosed(keys, [
    { x: -0.95, y: -0.95 },
    { x: 0.95, y: -0.95 },
    { x: 0.95, y: 0.95 },
    { x: -0.95, y: 0.95 },
  ]);
};

const addTriangleShape: ShapeBuilder = (keys) => {
  drawClosed(keys, [
    { x: 0, y: 1.05 },
    { x: 1.05, y: -0.85 },
    { x: -1.05, y: -0.85 },
  ]);
};

const addXShape: ShapeBuilder = (keys) => {
  drawLine(keys, { x: -0.95, y: 0.95 }, { x: 0.95, y: -0.95 });
  drawLine(keys, { x: -0.95, y: -0.95 }, { x: 0.95, y: 0.95 });
};

const SHAPE_BUILDERS = [addSquareShape, addTriangleShape, addXShape] as const;

/** Center a shape's pixel blocks within the 32×32 canvas. */
function centerShapeBlocks(blocks: Vec2[]): Vec2[] {
  if (blocks.length === 0) return blocks;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const { x, y } of blocks) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const shapeWidth = maxX - minX + PX;
  const shapeHeight = maxY - minY + PX;
  const offsetX = Math.round((CANVAS_SIZE - shapeWidth) / 2) - minX;
  const offsetY = Math.round((CANVAS_SIZE - shapeHeight) / 2) - minY;

  return blocks.map(({ x, y }) => ({
    x: Math.max(0, Math.min(CANVAS_SIZE - PX, x + offsetX)),
    y: Math.max(0, Math.min(CANVAS_SIZE - PX, y + offsetY)),
  }));
}

/** Rasterize a shape once and order its blocks by angle around the center,
 * so morph pairings travel around the outline instead of criss-crossing. */
function shapeBlocks(builder: ShapeBuilder): Vec2[] {
  const keys = new Set<string>();
  builder(keys);
  const blocks = [...keys].map((key) => {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
  });
  const centered = centerShapeBlocks(blocks);
  const center = (CANVAS_SIZE - PX) / 2;
  return centered.toSorted(
    (a, b) =>
      Math.atan2(a.y - center, a.x - center) -
      Math.atan2(b.y - center, b.x - center),
  );
}

const SHAPE_BLOCKS = SHAPE_BUILDERS.map(shapeBlocks);

const MORPH_TICKS = 8;

type MorphPixel = { fromX: number; fromY: number; toX: number; toY: number; color: Color };

function easeInOut(t: number): number {
  return t * t * (3 - 2 * t);
}

const createShapeMorphFrame: FrameFactory = () => {
  let shapeIndex = 0;
  let ticks = 0;
  let morphing = false;
  let pixels = SHAPE_BLOCKS[0].map((p) => ({ ...p, color: randomColor() }));
  let morphPairs: MorphPixel[] = [];
  let started = false;

  const startMorph = () => {
    const targets = SHAPE_BLOCKS[(shapeIndex + 1) % SHAPE_BLOCKS.length];
    const count = Math.max(pixels.length, targets.length);
    morphPairs = [];
    for (let i = 0; i < count; i++) {
      const from = pixels[i % pixels.length];
      const to = targets[i % targets.length];
      morphPairs.push({
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
        color: from.color,
      });
    }
    morphing = true;
    ticks = 0;
  };

  const finishMorph = () => {
    shapeIndex = (shapeIndex + 1) % SHAPE_BLOCKS.length;
    const targets = SHAPE_BLOCKS[shapeIndex];
    pixels = targets.map((p, i) => ({ ...p, color: morphPairs[i].color }));
    morphing = false;
    ticks = 0;
  };

  return (ctx) => {
    if (started) {
      ticks += 1;

      if (morphing) {
        if (ticks >= MORPH_TICKS) finishMorph();
      } else {
        // Shuffle a couple of pixel colors each tick so the outline stays lively.
        const swaps = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < swaps; i++) {
          const pixel = pixels[Math.floor(Math.random() * pixels.length)];
          pixel.color = randomColor(pixel.color);
        }
        if (ticks >= SHAPE_HOLD_TICKS) startMorph();
      }
    }
    started = true;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (morphing) {
      const t = easeInOut(Math.min(ticks / MORPH_TICKS, 1));
      for (const pair of morphPairs) {
        const [x, y] = snapBlock(
          pair.fromX + (pair.toX - pair.fromX) * t,
          pair.fromY + (pair.toY - pair.fromY) * t,
        );
        ctx.fillStyle = pair.color;
        ctx.fillRect(x, y, PX, PX);
      }
    } else {
      for (const pixel of pixels) {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x, pixel.y, PX, PX);
      }
    }
  };
};

export function GridPixels() {
  return (
    <PixelCanvas
      createFrame={createShapeMorphFrame}
      tickMs={ROTATING_TICK_MS}
      label="Cycling pixel shape outlines"
    />
  );
}
