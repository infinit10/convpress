import React, { useState } from "react";
import axios from "axios";

import { FileDropzone } from "./FileDropZone";
import { BackButton } from "./BackButton";
import { PageContainer } from "./PageContainer";

type CompressFormProps = {
  title: string;
  apiUrl: string;
  downloadPrefix: string;
};

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
  const [alertLevel, setAlertLevel] = useState<string>("");

  const handleCompress = async () => {
    if (!file) {
      setMessage("Please select a file.");
      setAlertLevel("warning");
      return;
    }

    setAlertLevel("");
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
      setAlertLevel("success");
    } catch (err) {
      console.error(err);
      setMessage("❌ Compression failed.");
      setAlertLevel("danger");
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <PageContainer>
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ width: "100%" }}
      >
        <BackButton to="/compress" />
        <h2 className="mb-0 text-primary">{title}</h2>
        <div className="flex-shrink-0" style={{ width: 40 }}></div>
      </div>

      {!file && <FileDropzone onFileSelected={setFile} />}

      {file && (
        <div className="mt-3 d-flex flex-column align-items-center">
          <p className="mt-3" style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
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
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onLoad={(e) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
          )}
        </div>
      )}

      <div className="mt-3 w-100" style={{ maxWidth: "400px" }}>
        <label className="mb-2 fw-semibold">Quality</label>
        <select
          className="theme-select"
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

      <button
        className="btn btn-primary mt-4 border-0"
        onClick={handleCompress}
        disabled={isUploading}
      >
        {isUploading ? "Compressing..." : "Compress"}
      </button>

      {isUploading && (
        <div className="progress w-100 mt-3" style={{ maxWidth: "400px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-info"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && (
        <div className={`alert alert-${alertLevel} mt-4 w-50 text-center`}>
          {message}
        </div>
      )}
    </PageContainer>
  );
};
