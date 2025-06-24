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

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

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
    } catch (err) {
      console.error(err);
      setMessage('❌ Conversion failed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <PageContainer>
      <BackButton />
      <h2 className="mb-4 text-success">Image ➜ PDF</h2>

      <FileDropzone onFileSelected={setFile} />
      {file && <p className="mt-3">Selected file: <strong>{file.name}</strong></p>}

      <button className="btn btn-success mt-4" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Convert to PDF'}
      </button>

      {isUploading && (
        <div className="progress w-100 mt-3">
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {message && <div className="alert alert-info mt-4 text-center w-100">{message}</div>}
    </PageContainer>
  );
};
