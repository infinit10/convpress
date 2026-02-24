import React, { useState } from 'react';
import axios from 'axios';

import { PageContainer } from '../components/PageContainer';
import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';
import { ShuffleIcon } from '../components/Icons';
import { API_BASE } from '../config';

type AlertVariant = '' | 'success' | 'error';

export const ImageToPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<AlertVariant>('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setAlertVariant('');
    setIsUploading(true);
    setProgress(0);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE}/convert/img2pdf`, formData, {
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

      setMessage('Image converted to PDF successfully!');
      setAlertVariant('success');
    } catch (err) {
      console.error(err);
      setAlertVariant('error');
      setMessage('Conversion failed.');
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <PageContainer>
      <div className="page-header">
        <BackButton to='/convert' />
        <h2>Image ➜ PDF</h2>
      </div>

      {!file && <FileDropzone onFileSelected={setFile} />}

      {file && (
        <div className="vstack items-center mt-4">
          <p style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
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
                borderRadius: 'var(--radius-medium)',
                boxShadow: 'var(--shadow-medium)'
              }}
              onLoad={(e) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
          )}
        </div>
      )}

      <button
        className="mt-4 icon-button"
        onClick={handleUpload}
        disabled={isUploading}
      >
        <ShuffleIcon size={16} /> {isUploading ? 'Uploading...' : 'Convert to PDF'}
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
