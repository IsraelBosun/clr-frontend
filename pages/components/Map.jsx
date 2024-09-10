"use client";  // This directive ensures the component is rendered on the client side
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';

// Import images for the marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Import GeoJSON data for different countries
import kenyaGeoJson from './Kenya/kenyageojson';
import rwandaGeoJson from './Rwanda/rwandaGeoJson';
import angolaGeoJson from './Angola/angolaGeoJson';
import botswanaGeoJson from './Botswana/botswanaGeoJson';
import congoGeoJson from './Congo/congoGeoJson';
import gambiaGeoJson from './Gambia/gambiaGeoJson';
import ghanaGeoJson from './Ghana/ghanaGeoJson';
import guineaGeoJson from './Guinea/guineaGeoJson';
import southAfricaGeoJson from './SouthAfrica/southAfricaGeoJson';
import sierraLeoneGeoJson from './SierraLeone/sierraLeoneGeoJson';

// Fix the default icon paths for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const KenyaMap = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set client state to true when the component is mounted
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Leaflet setup code here if needed
    }
  }, []);

  if (!isClient) {
    return null; // Optionally, you can return a loading indicator here
  }

  // Custom style for the highlighted border
  const borderStyle = {
    color: "blue",
    weight: 2,
    opacity: 1,
    fillColor: "red",
  };

  const onEachFeature = (features, layer) => {
    layer.bindTooltip(features.properties.name, {
      permanent: false,
      direction: "center",
      className: "country-label"
    });

    layer.on('click', () => {
      const country = features.properties.name.toLowerCase();
      router.push(`/${country}`);
    });
  };

  // Define marker positions and routes for each country
  const countrie = [
    { name: 'Kenya', position: [-1.286389, 36.817223], route: '/Kenya' },
    { name: 'Rwanda', position: [-1.940278, 29.873888], route: '/Rwanda' },
    { name: 'Angola', position: [-8.839987, 13.289437], route: '/Angola' },
    { name: 'Botswana', position: [-24.654167, 25.908333], route: '/Botswana' },
    { name: 'Congo', position: [-4.263360, 15.242885], route: '/Congo' },
    { name: 'Gambia', position: [13.453055, -16.591667], route: '/Gambia' },
    { name: 'Ghana', position: [5.603716, -0.187000], route: '/Ghana' },
    { name: 'Guinea', position: [9.509167, -13.712222], route: '/Guinea' },
    { name: 'South Africa', position: [-25.746111, 28.188056], route: '/SouthAfrica' },
    { name: 'Zambia', position: [-15.416667, 28.283333], route: '/Zambia' },
    { name: 'Cameroon', position: [3.848000, 11.502100], route: '/Cameroon' },
    { name: 'Tanzania', position: [-6.369028, 34.888822], route: '/Tanzania' },
    { name: 'Sierra Leone', position: [8.465677, -13.231722], route: '/SierraLeone' },
    { name: 'Mozambique', position: [-25.966667, 32.583333], route: '/Mozambique' },
    { name: 'DR Congo', position: [-4.325, 15.322222], route: '/Congo' }
];


  const countries = [
    { name: "Kenya", link: "/Kenya" },
    { name: "Angola", link: "/Angola" },
    { name: "Ghana", link: "/Ghana" },
    { name: "South Africa", link: "/SouthAfrica" },
    { name: "Guinea", link: "/Guinea" },
    { name: "Zambia", link: "/zambia" },
    { name: "Cameroon", link: "/cameroon" },
    { name: "Tanzania", link: "/tanzania" },
    { name: "Gambia", link: "/Gambia" },
    { name: "Rwanda", link: "/Rwanda" },
    { name: "Sierra Leone", link: "/sierra-leone" },
    { name: "DR Congo", link: "/Congo" },
    { name: "Botswana", link: "/Botswana" },
  ];

  return (
    <div className="w-full h-screen">
      <section className = "mt-4">
        <div className="main">
            <div className="gradient" />
        </div>
        <div className="app">
            {/* <Nav /> */}
          <h1 className="head_text text-center">
            Subsidiaries CLR Analyzer {" "}
            <br className="max-md:hidden *" />
            <span className="orange_gradient text-center">And Monitor</span>
          </h1>
          <p className="desc text-center">
         A place to view key metrices for the subsidiaries at any point in time
          </p>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-4 p-6">
          {countries.map((country, index) => (
            <a
              key={index}
              href={country.link}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-white font-bold text-lg 
                 bg-green-600 hover:bg-green-700"
            >
              {country.name}
            </a>
          ))}
        </div> */}
    <div className='flex justify-center items-center h-screen'>    
      <MapContainer
        center={[0, 20]}
        zoom={3}
        className="w-[95%] items-center h-[80%] rounded-2xl shadow-md "
        style={{ height: "80vh",  }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render GeoJSON layers */}
        <GeoJSON data={kenyaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={rwandaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={angolaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={botswanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={congoGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={gambiaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={ghanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={guineaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={southAfricaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={sierraLeoneGeoJson} style={borderStyle} onEachFeature={onEachFeature} />

        {/* Render markers for each country */}
        {countrie.map((country, index) => (
          <Marker
            key={index}
            position={country.position}
            eventHandlers={{
              click: () => router.push(country.route),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div style={{ cursor: 'pointer', color: 'blue' }}>
                {country.name}
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
        </section>
    </div>
  );
};

export default KenyaMap;



// "use client";
// import React, { useEffect, useState } from 'react';
// import { Map, Marker } from 'pigeon-maps';
// import { osm } from 'pigeon-maps/providers'; // OpenStreetMap Provider
// import { useRouter } from 'next/router';

// const KenyaMap = () => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null; // Optionally, you can return a loading indicator here
//   }

//   // Define marker positions and routes for each country
//   const countries = [
//     { name: 'Kenya', position: [-1.286389, 36.817223], route: '/Kenya' },
//     { name: 'Rwanda', position: [-1.940278, 29.873888], route: '/Rwanda' },
//     { name: 'Angola', position: [-8.839987, 13.289437], route: '/Angola' },
//     { name: 'Botswana', position: [-24.654167, 25.908333], route: '/Botswana' },
//     { name: 'Congo', position: [-4.263360, 15.242885], route: '/Congo' },
//     { name: 'Gambia', position: [13.453055, -16.591667], route: '/Gambia' },
//     { name: 'Ghana', position: [5.603716, -0.187000], route: '/Ghana' },
//     { name: 'Guinea', position: [9.509167, -13.712222], route: '/Guinea' },
//   ];

//   return (
//     <div className="w-full h-screen">
//       <section className="mt-4">
//         <div className="main">
//           <div className="gradient" />
//         </div>
//         <div className="app">
//           <h1 className="head_text text-center">
//             Subsidiaries CLR Analyzer{" "}
//             <br className="max-md:hidden" />
//             <span className="orange_gradient text-center">And Monitor</span>
//           </h1>
//           <p className="desc text-center">
//             A place to view key metrics for the subsidiaries at any point in time.
//           </p>
//         </div>

//         <div className='flex justify-center items-center h-screen'>
//           <Map
//             provider={osm}  // Use OpenStreetMap tiles
//             defaultCenter={[0, 20]}
//             defaultZoom={3}
//             height={500}
//             width={800}
//           >
//             {countries.map((country, index) => (
//               <Marker
//                 key={index}
//                 width={50}
//                 anchor={country.position}
//                 onClick={() => router.push(country.route)}
//               />
//             ))}
//           </Map>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default KenyaMap;
