import React, { useState, useRef } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../api/api';
import { toast } from 'react-hot-toast'; // Import toast
import * as XLSX from 'xlsx'; // Import XLSX to parse Excel files

interface FileUploadButtonProps {
  title: string;
  url: string;
  onDataLoaded: (data: any[]) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ title, url, onDataLoaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to clear file input

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      // Check if file size exceeds the limit
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds the 10MB limit.');
        setFile(null); // Reset file if it's too large
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the input field
        }
      } else {
        setFile(selectedFile); // Set file if it's within the size limit
      }
    }
  };

  // Check if the worksheet 'clr' exists in the Excel file
  const checkWorksheetExists = async (file: File) => {
    try {
      const reader = new FileReader();
      return new Promise<boolean>((resolve, reject) => {
        reader.onload = (event) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheetExists = workbook.SheetNames.includes('CLR');
          resolve(worksheetExists);
        };
        reader.onerror = () => reject('Error reading file');
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      throw new Error('Error reading the Excel file');
    }
  };

  // File upload handler
  const handleUpload = async () => {
    if (!file) {
      toast.error('Please upload a file.');
      return;
    }

    try {
      setLoading(true);

      // Clear file input field once the upload starts
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input field
      }

      // Check for 'clr' worksheet
      const worksheetExists = await checkWorksheetExists(file);
      if (!worksheetExists) {
        toast.error('No worksheet named "CLR" found in the uploaded file.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Send file to the API without Authorization header
      const response = await fetch(url, {
        method: 'POST',
        body: formData,  // Include the file in the form data
      });

      if (!response.ok) {
        // Get the error message from the response
        const errorData = await response.json();
        throw new Error(errorData.detail || `API Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Upload Response:', result);

      // Store result in Firestore
      const docRef = doc(db, "kenyaData", new Date().toISOString());
      await setDoc(docRef, result);

      toast.success('File uploaded and data saved successfully!');
      onDataLoaded(result);
    } catch (error) {
      // Handle API and Firebase errors gracefully
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`); // Show detailed error
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 flex-col items-center justify-center">
      <input
        ref={fileInputRef} // Attach ref to the input field
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
