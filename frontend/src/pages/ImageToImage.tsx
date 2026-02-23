import React, { useState } from 'react';
import axios from 'axios';

import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';
import { PageContainer } from '../components/PageContainer';
import { API_BASE } from '../config';

const imageFormats = ['jpg', 'png'];

type AlertVariant = '' | 'success' | 'error';

export const ImageToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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
      const res = await axios.post(`${API_BASE}/convert/img2img?format=${outputFormat}`, formData, {
        responseType: 'blob',
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
        },
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted.${outputFormat}`;
      link.click();
      link.remove();

      setAlertVariant('success');
      setMessage('Image converted and downloaded!');
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
        <h2>Image ➜ Image</h2>
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

      <div className="vstack mt-4 w-100" style={{ maxWidth: '400px' }}>
        <div data-field="">
          <label>Output Format</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            {imageFormats.map(fmt => (
              <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="mt-4"
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Convert'}
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
