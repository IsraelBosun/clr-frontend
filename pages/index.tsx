// import type { NextPage } from "next";
// import Head from "next/head";
// import React, { useState } from 'react';
// import Angola from "./components/Angola";

// const Home: NextPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false); // Add loading state

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please upload a file.');
//       return;
//     }

//     setLoading(true); // Set loading state to true before starting the fetch

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('https://clr-1.onrender.com/angola', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       setData(result.top5_customers);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setLoading(false); // Set loading state to false after fetch is complete
//     }
//   };


//   const handleUpload2= async () => {
//     if (!file) {
//       alert('Please upload a file.');
//       return;
//     }

//     setLoading(true); // Set loading state to true before starting the fetch

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('https://clr-1.onrender.com/botswana', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       setData(result.top5_customers);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setLoading(false); // Set loading state to false after fetch is complete
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <Head>
//         <title>CLR Analyzer</title>
//       </Head>
//       <div className="flex items-center justify-center">
//         <div>
//           <h1 className="text-2xl font-bold mb-4">Angola's CLR Analyser</h1>
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="mb-4 border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={handleUpload}
//             className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.91-3.57L18.4 9.6A4 4 0 006 12h-2z"></path>
//                 </svg>
//                 Loading...
//               </span>
//             ) : (
//               'Upload and Analyze'
//             )}
//           </button>
//           {data.length > 0 && <Angola data={data} />}
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold mb-4">Botswana's CLR Analyser</h1>
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="mb-4 border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={handleUpload2}
//             className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.91-3.57L18.4 9.6A4 4 0 006 12h-2z"></path>
//                 </svg>
//                 Loading...
//               </span>
//             ) : (
//               'Upload and Analyze'
//             )}
//           </button>
//           {data.length > 0 && <Angola data={data} />}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;


// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from 'react';
import FileUploadButton from "./components/UploadButton";
import Angola from "./components/Angola"; 
import Botswana from "./components/Botswana";

const Home: NextPage = () => {
  const [angolaData, setAngolaData] = useState<any[]>([]);
  const [botswanaData, setBotswanaData] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>CLR Analyzer</title>
      </Head>
      <div className="flex flex-col items-center">
        <FileUploadButton
          title="Angola's CLR Analyser"
          url="https://clr-1.onrender.com/angola"
          onDataLoaded={setAngolaData}
        />
        {angolaData.length > 0 && <Angola data={angolaData} />}

        <FileUploadButton
          title="Botswana's CLR Analyser"
          url="https://clr-1.onrender.com/botswana"
          onDataLoaded={setBotswanaData}
        />
        {botswanaData.length > 0 && <Botswana data={botswanaData} />}
      </div>
    </div>
  );
};

export default Home;

