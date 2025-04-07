import React, { useState } from 'react';

function FileUpload({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    await uploadFiles(files);
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    await uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    try {
      setUploadStatus('Uploading...');
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));

      const response = await fetch('http://localhost:8080/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      setUploadStatus(result);

      if (response.ok) {
        onUploadSuccess(true);
      } else {
        onUploadSuccess(false);
      }
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      onUploadSuccess(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <p className="text-gray-600">
          Drag and drop files here or click to select files
        </p>
      </div>
      {uploadStatus && (
        <div className={`mt-4 p-3 rounded ${
          uploadStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {uploadStatus}
        </div>
      )}
    </div>
  );
}

export default FileUpload;