import React, { useState } from 'react';
import axios from 'axios';

import { FileDropzone } from '../components/FileDropZone';
import { BackButton } from '../components/BackButton';
import { PageContainer } from '../components/PageContainer';

const imageFormats = ['jpg', 'png'];

export const ImageToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

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
      const res = await axios.post('http://localhost:5000/convert/img2img', formData, {
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

      setMessage('✅ Image converted and downloaded!');
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
      <h2 className="mb-4 text-primary">Image ➜ Image</h2>
      <FileDropzone onFileSelected={setFile} />
      {file && <p className="mt-3">Selected file: <strong>{file.name}</strong></p>}

      <div className="mt-3 w-100" style={{ maxWidth: '400px' }}>
        <label>Output Format</label>
        <select className="form-select" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
          {imageFormats.map(fmt => (
            <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Convert'}
      </button>

      {isUploading && (
        <div className="progress w-100 mt-3" style={{ maxWidth: '400px' }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {message && <div className="alert alert-info mt-4 w-100 text-center">{message}</div>}
    </PageContainer>
  );
};
