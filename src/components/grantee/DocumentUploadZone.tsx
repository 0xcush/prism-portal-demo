import { useState, useRef, useCallback } from 'react';

interface Props {
  onUpload?: (fileName: string) => void;
}

export default function DocumentUploadZone({ onUpload }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSuccess = useCallback(
    (fileName: string) => {
      setUploadedFile(fileName);
      onUpload?.(fileName);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setUploadedFile(null);
        timerRef.current = null;
      }, 3000);
    },
    [onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleSuccess(file.name);
    },
    [handleSuccess],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleSuccess(file.name);
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleSuccess],
  );

  return (
    <div
      onClick={() => !uploadedFile && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
        uploadedFile
          ? 'border-emerald-300 bg-emerald-50'
          : isDragOver
            ? 'border-navy-400 bg-navy-50/50'
            : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
      />

      <div className="flex flex-col items-center justify-center py-8 px-4">
        {uploadedFile ? (
          <>
            {/* Success state */}
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3 animate-bounce-once">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-emerald-700">
              Document uploaded successfully
            </p>
            <p className="text-xs text-emerald-600 mt-1">{uploadedFile}</p>
          </>
        ) : (
          <>
            {/* Default state */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                isDragOver ? 'bg-navy-100' : 'bg-slate-100'
              }`}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  isDragOver ? 'text-navy-600' : 'text-slate-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700">
              {isDragOver ? 'Drop file here' : 'Drag & drop a document here'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              or click to browse &middot; PDF, DOC, XLS, CSV, JPG, PNG
            </p>
          </>
        )}
      </div>
    </div>
  );
}
