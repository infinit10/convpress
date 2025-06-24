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
      className={`border-2 border-dashed p-5 text-center rounded mt-3 bg-light ${
        isDragActive ? 'border-primary bg-opacity-25' : 'border-secondary'
      }`}
      style={{ cursor: 'pointer' }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-primary fw-semibold">Drop the file here ...</p>
      ) : (
        <p className="text-muted">Drag and drop a file here, or click to select one</p>
      )}
    </div>
  );
};
