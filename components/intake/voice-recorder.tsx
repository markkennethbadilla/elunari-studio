"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, Square, Play, Trash2, Pause } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  recordings: Blob[];
  onRemove: (index: number) => void;
}

export function VoiceRecorder({ onRecordingComplete, recordings, onRemove }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        onRecordingComplete(blob);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      alert("Microphone access denied. Please allow microphone access to record.");
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  }, []);

  const playRecording = useCallback((index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }
    const url = URL.createObjectURL(recordings[index]);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => {
      setPlayingIndex(null);
      URL.revokeObjectURL(url);
    };
    audio.play();
    setPlayingIndex(index);
  }, [playingIndex, recordings]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return m + ":" + String(s % 60).padStart(2, "0");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Record button */}
      <div className="flex flex-col items-center gap-4">
        {isRecording ? (
          <>
            <div className="flex items-center gap-3">
              <div className="recording-dot" />
              <span className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                Recording... {formatTime(duration)}
              </span>
            </div>
            <button onClick={stopRecording} className="btn-primary !bg-red-500 !py-3 !px-6 cursor-pointer">
              <Square className="w-4 h-4" />
              Stop Recording
            </button>
          </>
        ) : (
          <button onClick={startRecording} className="btn-primary !py-4 !px-8 cursor-pointer">
            <Mic className="w-5 h-5" />
            Start Recording
          </button>
        )}
        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          Record a voice memo describing what you want. Speak naturally — we&apos;ll
          understand.
        </p>
      </div>

      {/* Recordings list */}
      {recordings.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Recordings ({recordings.length})
          </p>
          {recordings.map((_, i) => (
            <div
              key={i}
              className="card flex items-center gap-3 !py-3"
            >
              <button
                onClick={() => playRecording(i)}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: "var(--primary-glow)",
                  color: "var(--primary)",
                }}
              >
                {playingIndex === i ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <span className="text-sm flex-1">Recording {i + 1}</span>
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
