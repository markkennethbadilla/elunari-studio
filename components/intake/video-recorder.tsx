"use client";

import { useState, useRef, useCallback } from "react";
import { Video, Square, Play, Trash2, Monitor, Camera } from "lucide-react";

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  recordings: Blob[];
  onRemove: (index: number) => void;
}

export function VideoRecorder({ onRecordingComplete, recordings, onRemove }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"camera" | "screen" | null>(null);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const previewRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async (recMode: "camera" | "screen") => {
    try {
      let stream: MediaStream;
      if (recMode === "camera") {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: true,
        });
      }

      streamRef.current = stream;
      if (previewRef.current) {
        previewRef.current.srcObject = stream;
        previewRef.current.play();
      }

      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "video/webm" });
        onRecordingComplete(blob);
        stream.getTracks().forEach((t) => t.stop());
        if (previewRef.current) previewRef.current.srcObject = null;
      };

      // Handle screen share stop
      stream.getVideoTracks()[0].onended = () => {
        if (isRecording) stopRecording();
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setMode(recMode);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      alert("Permission denied. Please allow access to record.");
    }
  }, [onRecordingComplete, isRecording]);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setMode(null);
    clearInterval(timerRef.current);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return m + ":" + String(s % 60).padStart(2, "0");
  };

  return (
    <div className="flex flex-col gap-4">
      {isRecording ? (
        <>
          {/* Preview */}
          <div className="relative rounded-xl overflow-hidden" style={{ background: "#000", aspectRatio: "16/9" }}>
            <video ref={previewRef} className="w-full h-full object-cover" muted playsInline />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
              <div className="recording-dot" />
              <span className="text-white text-sm font-mono">{formatTime(duration)}</span>
            </div>
          </div>
          <button onClick={stopRecording} className="btn-primary !bg-red-500 cursor-pointer">
            <Square className="w-4 h-4" />
            Stop Recording
          </button>
        </>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => startRecording("camera")}
            className="btn-secondary flex-1 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            Record Camera
          </button>
          <button
            onClick={() => startRecording("screen")}
            className="btn-secondary flex-1 cursor-pointer"
          >
            <Monitor className="w-5 h-5" />
            Record Screen
          </button>
        </div>
      )}

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Record a quick video walkthrough or screen share of a reference site. Show us exactly what you mean.
      </p>

      {/* Recordings list */}
      {recordings.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Videos ({recordings.length})
          </p>
          {recordings.map((blob, i) => (
            <div key={i} className="card flex items-center gap-3 !py-3">
              <button
                onClick={() => {
                  const url = URL.createObjectURL(blob);
                  window.open(url, "_blank");
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "var(--primary-glow)", color: "var(--primary)" }}
              >
                <Play className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <span className="text-sm">Video {i + 1}</span>
                <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                  {(blob.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <button
                onClick={() => onRemove(i)}
                className="p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-red-500/10"
                style={{ color: "var(--text-muted)" }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
