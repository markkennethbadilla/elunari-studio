"use client";

import { useRef, useCallback, useState } from "react";
import { Upload, X, FileText, Image, File } from "lucide-react";

interface FileUploadProps {
  files: File[];
  onFilesAdded: (files: File[]) => void;
  onRemove: (index: number) => void;
}

const ACCEPTED = ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.pptx,.fig,.sketch,.xd,.ai,.psd,.zip";
const MAX_SIZE = 50 * 1024 * 1024; // 50MB

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return Image;
  if (type.includes("pdf")) return FileText;
  return File;
}

export function FileUpload({ files, onFilesAdded, onRemove }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const valid = Array.from(fileList).filter((f) => f.size <= MAX_SIZE);
      if (valid.length < (fileList?.length || 0)) {
        alert("Some files were too large (max 50MB each) and were skipped.");
      }
      onFilesAdded(valid);
    },
    [onFilesAdded]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        className="card flex flex-col items-center justify-center py-12 cursor-pointer transition-all"
        style={{
          borderStyle: "dashed",
          borderWidth: "2px",
          borderColor: dragOver ? "var(--primary)" : "var(--border)",
          background: dragOver ? "var(--primary-glow)" : "var(--bg-card)",
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <Upload
          className="w-10 h-10 mb-3"
          style={{ color: dragOver ? "var(--primary)" : "var(--text-muted)" }}
        />
        <p className="text-sm font-medium mb-1">
          {dragOver ? "Drop files here" : "Drag & drop files or click to browse"}
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Images, PDFs, mockups, design files — up to 50MB each
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Files ({files.length})
          </p>
          {files.map((file, i) => {
            const Icon = getFileIcon(file.type);
            return (
              <div key={i} className="card flex items-center gap-3 !py-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--primary-glow)",
                    color: "var(--primary)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{file.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatSize(file.size)}
                  </p>
                </div>
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(i);
                  }}
                  className="p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-red-500/10 flex-shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
