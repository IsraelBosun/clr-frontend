import Head from "next/head";
import React, { useState } from 'react';
import FileUploadButton from "./components/UploadButton";
import Angola from "./components/Angola"; 
import Botswana from "./components/Botswana";
import Kenya from "./components/Kenya";

const Home = () => {
  const [angolaData, setAngolaData] = useState([]);
  const [botswanaData, setBotswanaData] = useState([]);
  const [kenyaData, setKenyaData] = useState([]);

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
        <FileUploadButton
          title="Kenya's CLR Analyser"
          url="https://clr-1.onrender.com/kenya"
          onDataLoaded={setKenyaData}
        />
        {kenyaData.length > 0 && <Kenya data={kenyaData} />}
      </div>
    </div>
  );
};

export default Home;
