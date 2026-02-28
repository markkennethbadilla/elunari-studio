"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Undo2, Trash2, Download, Minus, Circle } from "lucide-react";

interface DrawingCanvasProps {
  onDrawingComplete: (blob: Blob) => void;
  drawings: Blob[];
  onRemove: (index: number) => void;
}

const COLORS = [
  "#fff", "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#000",
];

export function DrawingCanvas({ onDrawingComplete, drawings, onRemove }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#fff");
  const [brushSize, setBrushSize] = useState(3);
  const [history, setHistory] = useState<ImageData[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Dark background
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < rect.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
  }, []);

  const getPos = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((h) => [...h.slice(-20), data]);
  }, []);

  const startDraw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    saveHistory();
    setIsDrawing(true);
    lastPos.current = getPos(e);
  }, [getPos, saveHistory]);

  const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing || !lastPos.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  }, [isDrawing, color, brushSize, getPos]);

  const endDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || history.length === 0) return;
    const prev = history[history.length - 1];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  }, [history]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    saveHistory();
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < rect.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
  }, [saveHistory]);

  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) onDrawingComplete(blob);
    }, "image/png");
  }, [onDrawingComplete]);

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Colors */}
        <div className="flex gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-7 h-7 rounded-full cursor-pointer transition-transform"
              style={{
                background: c,
                border: color === c ? "2px solid var(--primary)" : "2px solid var(--border)",
                transform: color === c ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Brush size */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setBrushSize(2)}
            className="p-1.5 rounded cursor-pointer"
            style={{
              background: brushSize === 2 ? "var(--primary-subtle)" : "transparent",
              color: brushSize === 2 ? "var(--primary)" : "var(--text-muted)",
            }}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setBrushSize(5)}
            className="p-1.5 rounded cursor-pointer"
            style={{
              background: brushSize === 5 ? "var(--primary-subtle)" : "transparent",
              color: brushSize === 5 ? "var(--primary)" : "var(--text-muted)",
            }}
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setBrushSize(10)}
            className="p-1.5 rounded cursor-pointer"
            style={{
              background: brushSize === 10 ? "var(--primary-subtle)" : "transparent",
              color: brushSize === 10 ? "var(--primary)" : "var(--text-muted)",
            }}
          >
            <Circle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={undo}
            className="p-2 rounded-lg cursor-pointer"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={clear}
            className="p-2 rounded-lg cursor-pointer"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl cursor-crosshair touch-none"
        style={{
          height: "300px",
          border: "1px solid var(--border)",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />

      {/* Save */}
      <button onClick={saveDrawing} className="btn-primary cursor-pointer">
        <Download className="w-4 h-4" />
        Save Drawing
      </button>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Sketch your rough layout idea. It doesn&apos;t have to be perfect — just show us the general structure.
      </p>

      {/* Saved drawings */}
      {drawings.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Saved Drawings ({drawings.length})
          </p>
          <div className="grid grid-cols-2 gap-2">
            {drawings.map((blob, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden group" style={{ border: "1px solid var(--border)" }}>
                <img src={URL.createObjectURL(blob)} alt={"Drawing " + (i + 1)} className="w-full h-24 object-cover" />
                <button
                  onClick={() => onRemove(i)}
                  className="absolute top-1 right-1 p-1 rounded bg-black/60 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
