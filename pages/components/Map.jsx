"use client";  // This directive ensures the component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import images for the marker icons
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import kenyaGeoJson from './Kenya/kenyageojson.jsx'
import rwandaGeoJson from './Rwanda/rwandaGeoJson.jsx'
import angolaGeoJson from './Angola/angolaGeoJson.jsx'
import botswanaGeoJson from './Botswana/botswanaGeoJson.jsx'
import congoGeoJson from './Congo/congoGeoJson.jsx'
import gambiaGeoJson from './Gambia/gambiaGeoJson.jsx'
import ghanaGeoJson from './Ghana/ghanaGeoJson.jsx'
import guineaGeoJson from './Guinea/guineaGeoJson.jsx'

// Fix the default icon paths for Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});


const KenyaMap = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Initialize useRouter


  useEffect(() => {
    // This effect will only run on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null on the server side
  }

  // Custom style for the highlighted border
  const borderStyle = {
    color: "red", // Border color
    weight: 1, // Border thickness
    opacity: 1, // Border opacity
    fillColor: "red",
  };

  

  const onEachFeature = (features, layer) => {
    layer.bindTooltip(features.properties.name, {
      permanent: false, // Always show the label
      direction: "center", // Position the label in the center
      className: "country-label" // Custom class for the label
    });

    // Add click event listener
    layer.on('click', () => {
      const country = features.properties.name; // Get country name and convert to lowercase
      router.push(`/${country}`); // Navigate to the country's page
    });
  };

  // console.log(feature)

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[0, 20]} // Center the map on Africa
        zoom={3} // Adjust zoom level to show more of the continent
        className="w-full h-full"
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <GeoJSON data={kenyaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={rwandaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={botswanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={congoGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={gambiaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={ghanaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
        <GeoJSON data={guineaGeoJson} style={borderStyle} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  );
};

export default KenyaMap;
