import React, { useState } from 'react';
import axios from 'axios';

import { PageContainer } from '../components/PageContainer';
import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';
import { API_BASE } from '../config';

const imageFormats = ['jpg', 'png'];

type AlertVariant = '' | 'success' | 'error';

export const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('jpg');
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
      const res = await axios.post(`${API_BASE}/convert/pdf2img?format=${outputFormat}`, formData, {
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
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage('PDF converted to image successfully!');
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
        <h2>PDF ➜ Image</h2>
      </div>

      {!file && <FileDropzone onFileSelected={setFile} />}

      {file && (
        <p className="mt-4" style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
          Selected file: <strong>{file.name}</strong>
        </p>
      )}

      <div className="vstack mt-4 w-100" style={{ maxWidth: '400px' }}>
        <div data-field="">
          <label htmlFor="outputFormat">Select Output Format</label>
          <select
            id="outputFormat"
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
        {isUploading ? 'Uploading...' : 'Convert to Image'}
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
