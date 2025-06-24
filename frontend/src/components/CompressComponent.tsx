import React, { useState } from 'react';
import axios from 'axios';

import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';
import { PageContainer } from '../components/PageContainer';

type CompressPageProps = {
  title: string;
  apiUrl: string;
  downloadPrefix: string;
};

export const CompressPage: React.FC<CompressPageProps> = ({
  title,
  apiUrl,
  downloadPrefix = 'compressed',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<string>('medium');
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleCompress = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality);

    try {
      const res = await axios.post(apiUrl, formData, {
        responseType: 'blob',
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / (e.total || 1)));
        },
      });

      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${downloadPrefix}_${file.name}`;
      link.click();
      link.remove();

      setMessage('✅ Compression complete.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Compression failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <PageContainer>
      <BackButton to="/" />
      <h2 className="mb-4 text-primary">{title}</h2>
      <FileDropzone onFileSelected={setFile} />
      {file && <p className="mt-3">Selected file: <strong>{file.name}</strong></p>}

      <div className="mt-3 w-100" style={{ maxWidth: '400px' }}>
        <label>Quality</label>
        <select className="form-select" value={quality} onChange={(e) => setQuality(e.target.value)}>
          {['low', 'medium', 'high'].map(q => (
            <option key={q} value={q}>{q.charAt(0).toUpperCase() + q.slice(1)}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleCompress} disabled={isUploading}>
        {isUploading ? 'Compressing...' : 'Compress'}
      </button>

      {isUploading && (
        <div className="progress w-100 mt-3" style={{ maxWidth: '400px' }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {message && <div className="alert alert-info mt-4 w-100 text-center">{message}</div>}
    </PageContainer>
  );
};