import React, { useState } from "react";
import axios from "axios";

import { FileDropzone } from "./FileDropZone";
import { BackButton } from "./BackButton";
import { PageContainer } from "./PageContainer";
import { CompressIcon } from "./Icons";

type CompressFormProps = {
  title: string;
  apiUrl: string;
  downloadPrefix: string;
};

type AlertVariant = '' | 'success' | 'warning' | 'error';

export const CompressForm: React.FC<CompressFormProps> = ({
  title,
  apiUrl,
  downloadPrefix = "compressed",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<string>("medium");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('');

  const handleCompress = async () => {
    if (!file) {
      setMessage("Please select a file.");
      setAlertVariant("warning");
      return;
    }

    setAlertVariant('');
    setIsUploading(true);
    setProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", quality);

    try {
      const res = await axios.post(apiUrl, formData, {
        responseType: "blob",
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
        },
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${downloadPrefix}_${file.name}`;
      link.click();
      link.remove();

      setMessage("✅ Compression complete.");
      setAlertVariant("success");
    } catch (err) {
      console.error(err);
      setMessage("❌ Compression failed.");
      setAlertVariant("error");
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <PageContainer>
      <div className="page-header">
        <BackButton to="/compress" />
        <h2>{title}</h2>
      </div>

      {!file && <FileDropzone onFileSelected={setFile} />}

      {file && (
        <div className="vstack items-center mt-4">
          <p style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            Selected file: <strong>{file.name}</strong>
          </p>
          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{
                maxWidth: "300px",
                maxHeight: "200px",
                marginTop: "10px",
                borderRadius: "var(--radius-medium)",
                boxShadow: "var(--shadow-medium)",
              }}
              onLoad={(e) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
          )}
        </div>
      )}

      <div className="vstack mt-4 w-100" style={{ maxWidth: "400px" }}>
        <div data-field="">
          <label>Quality</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            {["low", "medium", "high"].map((q) => (
              <option key={q} value={q}>
                {q.charAt(0).toUpperCase() + q.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="mt-4 icon-button"
        onClick={handleCompress}
        disabled={isUploading}
      >
        <CompressIcon size={16} /> {isUploading ? "Compressing..." : "Compress"}
      </button>

      {isUploading && (
        <progress className="w-100 mt-4" value={progress} max="100" style={{ maxWidth: "400px" }} />
      )}

      {message && (
        <div role="alert" data-variant={alertVariant} className="mt-4 text-center" style={{ maxWidth: '50%' }}>
          {message}
        </div>
      )}
    </PageContainer>
  );
};
