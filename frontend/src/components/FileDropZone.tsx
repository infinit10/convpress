import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';

interface Props {
  onFileSelected: (file: File) => void;
}

export const FileDropzone: React.FC<Props> = ({ onFileSelected }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="app-dropzone text-center mt-4"
      style={{
        border: `2px dashed ${isDragActive ? 'var(--primary)' : 'var(--dropzone-border)'}`,
        padding: '3rem',
        borderRadius: 'var(--radius-large)',
        width: '50%',
        backgroundColor: isDragActive ? 'var(--dropzone-hover-bg)' : 'var(--dropzone-bg)',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p><strong>Drop the file here ...</strong></p>
      ) : (
        <p className="text-light">Drag and drop a file here, or click to select one</p>
      )}
    </div>
  );
};
