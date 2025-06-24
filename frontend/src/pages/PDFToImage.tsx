import React, { useState } from 'react';
import axios from 'axios';

import { PageContainer } from '../components/PageContainer';
import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';

const imageFormats = ['jpg', 'png', 'webp'];

export const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('jpg');
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
    formData.append('outputFormat', outputFormat);

    try {
      const res = await axios.post('http://localhost:5000/convert/pdf2img', formData, {
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

      setMessage('✅ PDF converted to image successfully!');
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
      <h2 className="mb-4 text-warning">PDF ➜ Image</h2>

      <FileDropzone onFileSelected={setFile} />
      {file && <p className="mt-3">Selected file: <strong>{file.name}</strong></p>}

      <div className="mt-3">
        <label htmlFor="outputFormat">Select Output Format</label>
        <select
          id="outputFormat"
          className="form-select"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          {imageFormats.map(fmt => (
            <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-warning mt-4" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Convert to Image'}
      </button>

      {isUploading && (
        <div className="progress w-100 mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && <div className="alert alert-info mt-4 text-center w-100">{message}</div>}
      
    </PageContainer>
  );
};
