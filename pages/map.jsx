// import dynamic from "next/dynamic";

// const DynamicHeader = dynamic(() => import("./components/Map"), {
//   ssr: false,
// });

// export default DynamicHeader;
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the KenyaMap component with server-side rendering disabled
const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function MapPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client state to true when the component is mounted
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Optionally, you can return a loading indicator here
  }

  return <Map />;
}
