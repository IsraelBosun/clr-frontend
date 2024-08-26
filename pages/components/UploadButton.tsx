// components/FileUploadButton.tsx
import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../api/api';

interface FileUploadButtonProps {
  title: string;
  url: string;
  onDataLoaded: (data: any[]) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ title, url, onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please upload a file.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Upload Response:', result);

      // Store result in Firestore
      const docRef = doc(db, "kenyaData", new Date().toISOString());
      await setDoc(docRef, result);

      onDataLoaded(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

      // <h1 className="text-2xl font-bold mb-4">{title}</h1>
  return (
    <div className="mb-8 flex-col items-center justify-center">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="mb-4 border border-gray-300 rounded p-2"
      />
      <button
        onClick={handleUpload}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.91-3.57L18.4 9.6A4 4 0 006 12h-2z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          'Upload and Analyze'
        )}
      </button>
    </div>
  );
};

export default FileUploadButton;