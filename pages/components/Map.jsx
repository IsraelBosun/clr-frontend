// "use client";  // This directive ensures the component is rendered on the client side
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, GeoJSON, Tooltip, Marker } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useRouter } from 'next/router';

// // Import images for the marker icons
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // Import GeoJSON data for different countries
// import kenyaGeoJson from './Kenya/kenyageojson';
// import rwandaGeoJson from './Rwanda/rwandaGeoJson';
// import angolaGeoJson from './Angola/angolaGeoJson';
// import botswanaGeoJson from './Botswana/botswanaGeoJson';
// import congoGeoJson from './Congo/congoGeoJson';
// import gambiaGeoJson from './Gambia/gambiaGeoJson';
// import ghanaGeoJson from './Ghana/ghanaGeoJson';
// import guineaGeoJson from './Guinea/guineaGeoJson';
// import southAfricaGeoJson from './SouthAfrica/southAfricaGeoJson';
// import sierraLeoneGeoJson from './SierraLeone/sierraLeoneGeoJson';

// // Fix the default icon paths for Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x.src,
//   iconUrl: markerIcon.src,
//   shadowUrl: markerShadow.src,
// });

// const KenyaMap = () => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Set client state to true when the component is mounted
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       // Leaflet setup code here if needed
//     }
//   }, []);

//   if (!isClient) {
//     return null; // Optionally, you can return a loading indicator here
//   }

//   // Custom style for the highlighted border
//   const borderStyle = {
//     color: "blue",
//     weight: 2,
//     opacity: 1,
//     fillColor: "red",
//   };

//   const onEachFeature = (features, layer) => {
//     layer.bindTooltip(features.properties.name, {
//       permanent: false,
//       direction: "center",
//       className: "country-label"
//     });

//     layer.on('click', () => {
//       const country = features.properties.name.toLowerCase();
//       router.push(`/${country}`);
//     });
//   };

//   // Define marker positions and routes for each country
//   const countrie = [
//     { name: 'Kenya', position: [-1.286389, 36.817223], route: '/Kenya' },
//     { name: 'Rwanda', position: [-1.940278, 29.873888], route: '/Rwanda' },
//     { name: 'Angola', position: [-8.839987, 13.289437], route: '/Angola' },
//     { name: 'Botswana', position: [-24.654167, 25.908333], route: '/Botswana' },
//     { name: 'Congo', position: [-4.263360, 15.242885], route: '/Congo' },
//     { name: 'Gambia', position: [13.453055, -16.591667], route: '/Gambia' },
//     { name: 'Ghana', position: [5.603716, -0.187000], route: '/Ghana' },
//     { name: 'Guinea', position: [9.509167, -13.712222], route: '/Guinea' },
//     { name: 'South Africa', position: [-25.746111, 28.188056], route: '/SouthAfrica' },
//     { name: 'Zambia', position: [-15.416667, 28.283333], route: '/Zambia' },
//     { name: 'Cameroon', position: [3.848000, 11.502100], route: '/Cameroon' },
//     { name: 'Tanzania', position: [-6.369028, 34.888822], route: '/Tanzania' },
//     { name: 'Sierra Leone', position: [8.465677, -13.231722], route: '/SierraLeone' },
//     { name: 'Mozambique', position: [-25.966667, 32.583333], route: '/Mozambique' },
//     { name: 'DR Congo', position: [-4.325, 15.322222], route: '/Congo' }
// ];


//   const countries = [
//     { name: "Kenya", link: "/Kenya" },
//     { name: "Angola", link: "/Angola" },
//     { name: "Ghana", link: "/Ghana" },
//     { name: "South Africa", link: "/SouthAfrica" },
//     { name: "Guinea", link: "/Guinea" },
//     { name: "Zambia", link: "/zambia" },
//     { name: "Cameroon", link: "/cameroon" },
//     { name: "Tanzania", link: "/tanzania" },
//     { name: "Gambia", link: "/Gambia" },
//     { name: "Rwanda", link: "/Rwanda" },
//     { name: "Sierra Leone", link: "/sierra-leone" },
//     { name: "DR Congo", link: "/Congo" },
//     { name: "Botswana", link: "/Botswana" },
//   ];

//   return (
//     <div className="w-full h-screen">
//       <section className = "mt-4">
//         <div className="main">
//             <div className="gradient" />
//         </div>
//         <div className="app">
//             {/* <Nav /> */}
//           <h1 className="head_text text-center">
//             Subsidiaries CLR Analyzer {" "}
//             <br className="max-md:hidden *" />
//             <span className="orange_gradient text-center">And Monitor</span>
//           </h1>
//           <p className="desc text-center">
//          A place to view key metrices for the subsidiaries at any point in time
//           </p>
//         </div>

//         {/* <div className="flex flex-wrap justify-center gap-4 p-6">
//           {countries.map((country, index) => (
//             <a
//               key={index}
//               href={country.link}
//               className="w-full sm:w-auto px-4 py-2 rounded-lg text-white font-bold text-lg 
//                  bg-green-600 hover:bg-green-700"
//             >
//               {country.name}
//             </a>
//           ))}
//         </div> */}
//     <div className='flex justify-center items-center h-screen'>    
//       <MapContainer
//         center={[0, 20]}
//         zoom={3}
//         className="w-[95%] items-center h-[80%] rounded-2xl shadow-md "
//         style={{ height: "80vh",  }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Render GeoJSON layers */}
//         <GeoJSON data={kenyaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={rwandaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={angolaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={botswanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={congoGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={gambiaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={ghanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={guineaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={southAfricaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
//         <GeoJSON data={sierraLeoneGeoJson} style={borderStyle} onEachFeature={onEachFeature} />

//         {/* Render markers for each country */}
//         {countrie.map((country, index) => (
//           <Marker
//             key={index}
//             position={country.position}
//             eventHandlers={{
//               click: () => router.push(country.route),
//             }}
//           >
//             <Tooltip direction="top" offset={[0, -10]} opacity={1}>
//               <div style={{ cursor: 'pointer', color: 'blue' }}>
//                 {country.name}
//               </div>
//             </Tooltip>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//         </section>
//     </div>
//   );
// };

// export default KenyaMap;



"use client";  // Ensure the component is rendered on the client side
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router';

// Import GeoJSON data for different countries
import kenyaGeoJson from '../../data/kenyageojson';
import rwandaGeoJson from '../../data/rwandaGeoJson';
import angolaGeoJson from '../../data/angolaGeoJson';
import botswanaGeoJson from '../../data/botswanaGeoJson';
import congoGeoJson from '../../data/congoGeoJson';
import gambiaGeoJson from '../../data/gambiaGeoJson';
import ghanaGeoJson from '../../data/ghanaGeoJson';
import guineaGeoJson from '../../data/guineaGeoJson';
import southAfricaGeoJson from '../../data/southAfricaGeoJson';
import sierraLeoneGeoJson from '../../data/sierraLeoneGeoJson';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaXNyYWVsYm9zdW4iLCJhIjoiY20weGh1OGYyMGM2NzJrc2dtc3o5ZXpmOSJ9.CXNN25n8vr2xhAWNcuIuRw';

const KenyaMap = () => {
  const mapContainer = useRef(null); // Reference for the map container
  const [map, setMap] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (mapContainer.current && !map) {
      // Initialize Mapbox map
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [20, 0], // Initial center of the map
        zoom: 3,
      });

      // Add zoom and rotation controls
      newMap.addControl(new mapboxgl.NavigationControl());

      setMap(newMap);
    }

    return () => {
      // Clean up the map on unmount
      if (map) map.remove();
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      // Add countries' GeoJSON data and styles to the map
      const countriesData = [
        { name: 'Kenya', data: kenyaGeoJson },
        { name: 'Rwanda', data: rwandaGeoJson },
        { name: 'Angola', data: angolaGeoJson },
        { name: 'Botswana', data: botswanaGeoJson },
        { name: 'Congo', data: congoGeoJson },
        { name: 'Gambia', data: gambiaGeoJson },
        { name: 'Ghana', data: ghanaGeoJson },
        { name: 'Guinea', data: guineaGeoJson },
        { name: 'South Africa', data: southAfricaGeoJson },
        { name: 'Sierra Leone', data: sierraLeoneGeoJson },
      ];

      countriesData.forEach(({ name, data }, index) => {
        map.on('load', () => {
          // Add country GeoJSON source
          map.addSource(name, {
            type: 'geojson',
            data: data,
          });

          // Define random color for each country
          const color = `hsl(${index * 30}, 80%, 60%)`;

          // Add a new layer for each country with custom styling
          map.addLayer({
            id: name,
            type: 'fill',
            source: name,
            layout: {},
            paint: {
              'fill-color': color,
              'fill-opacity': 0.5,
            },
          });

          // Add border lines for the country
          map.addLayer({
            id: `${name}-border`,
            type: 'line',
            source: name,
            layout: {},
            paint: {
              'line-color': '#000',
              'line-width': 2,
            },
          });

          // Handle hover to show the tooltip
          map.on('mouseenter', name, (e) => {
            map.getCanvas().style.cursor = 'pointer';
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${name}</strong>`)
              .addTo(map);
          });

          // Reset cursor on mouse leave
          map.on('mouseleave', name, () => {
            map.getCanvas().style.cursor = '';
          });

          // Handle click to navigate to the country page
          map.on('click', name, () => {
            const countrySlug = name.replace(/\s+/g, '');
            router.push(`/${countrySlug}`);
          });
        });
      });
    }
  }, [map]);

  return (
    <div className="w-full h-screen">
      <section className="mt-4">
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <h1 className="head_text text-center">
            Subsidiaries CLR Analyzer {" "}
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">And Monitor</span>
          </h1>
          <p className="desc text-center">
            A place to view key metrics for the subsidiaries at any point in time.
          </p>
        </div>

        <div className="flex justify-center items-center h-screen">
          {/* Mapbox map container */}
          <div
            ref={mapContainer}
            className="w-[95%] items-center h-[80%] rounded-2xl shadow-md"
            style={{ height: '80vh' }}
          />
        </div>
      </section>
    </div>
  );
};

export default KenyaMap;
