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
      className="theme-dropzone border-2 border-dashed p-5 text-center rounded mt-3 w-50"
      style={{
        backgroundColor: isDragActive
          ? 'var(--dropzone-hover-bg)'
          : 'var(--dropzone-bg)',
        borderColor: isDragActive
          ? 'var(--dropzone-border-hover)'
          : 'var(--dropzone-border)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="fw-semibold" style={{ color: 'var(--dropzone-text-hover)' }}>
          Drop the file here ...
        </p>
      ) : (
        <p className="theme-muted-text">Drag and drop a file here, or click to select one</p>
      )}
    </div>
  );
};
