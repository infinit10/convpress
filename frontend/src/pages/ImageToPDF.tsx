import React, { useState } from 'react';
import axios from 'axios';

import { PageContainer } from '../components/PageContainer';
import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';

export const ImageToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [alertLevel, setAlertLevel] = useState<string>('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setAlertLevel('');
    setIsUploading(true);
    setProgress(0);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/convert/img2pdf', formData, {
        responseType: 'blob',
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
        },
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage('✅ Image converted to PDF successfully!');
      setAlertLevel('success');
    } catch (err) {
      console.error(err);
      setAlertLevel('danger');
      setMessage('❌ Conversion failed.');
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
        <BackButton to='/convert' />
        <h2 className="mb-4 text-primary">Image ➜ PDF</h2>
        <div className="flex-shrink-0" style={{ width: 40 }}></div>
      </div>

      {!file && <FileDropzone onFileSelected={setFile} />}

      {file && (
        <div className="mt-3 d-flex flex-column align-items-center">
          <p className="mt-3" style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
            Selected file: <strong>{file.name}</strong>
          </p>
          {file.type.startsWith('image/') && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
                marginTop: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onLoad={(e) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
          )}
        </div>
      )}

      <button
        className="btn btn-primary mt-4 border-0"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Convert to PDF'}
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

      {message && <div className={`alert alert-${alertLevel} mt-4 w-50 text-center`}>{message}</div>}
    </PageContainer>
  );
};
