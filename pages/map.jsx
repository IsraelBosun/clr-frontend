"use client";  // Ensure the component is rendered on the client side
import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router';

// Import GeoJSON data for different countries
import kenyaGeoJson from '../data/kenyageojson';
import rwandaGeoJson from '../data/rwandaGeoJson';
import angolaGeoJson from '../data/angolaGeoJson';
import botswanaGeoJson from '../data/botswanaGeoJson';
import congoGeoJson from '../data/congoGeoJson';
import gambiaGeoJson from '../data/gambiaGeoJson';
import ghanaGeoJson from '../data/ghanaGeoJson';
import guineaGeoJson from '../data/guineaGeoJson';
import southAfricaGeoJson from '../data/southAfricaGeoJson';
import sierraLeoneGeoJson from '../data/sierraLeoneGeoJson';
import cameroonGeoJson from '../data/cameroonGeoJson';
import tanzaniaGeoJson from '../data/tanzaniaGeoJson';
import zambiaGeoJson from '../data/zambiaGeoJson';
import mozambiqueGeoJson from '../data/mozambiqueGeoJson';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaXNyYWVsYm9zdW4iLCJhIjoiY20weGh1OGYyMGM2NzJrc2dtc3o5ZXpmOSJ9.CXNN25n8vr2xhAWNcuIuRw';

const KenyaMap = () => {
  const mapContainer = useRef(null); // Reference for the map container
  const [map, setMap] = useState(null);
  const router = useRouter();

  const countries = [
    { name: "Angola", link: "/Angola" },
    { name: "Botswana", link: "/Botswana" },
    { name: "Cameroon", link: "/Cameroon" },
    { name: "DR Congo", link: "/Congo" },
    { name: "Gambia", link: "/Gambia" },
    { name: "Ghana", link: "/Ghana" },
    { name: "Guinea", link: "/Guinea" },
    { name: "Kenya", link: "/Kenya" },
    { name: "Mozambique", link: "/Mozambique" },
    { name: "Rwanda", link: "/Rwanda" },
    { name: "Sierra Leone", link: "/SierraLeone" },
    { name: "South Africa", link: "/SouthAfrica" },
    { name: "Tanzania", link: "/Tanzania" },
    { name: "Zambia", link: "/Zambia" },
    { name: "Consolidated", link: "/Consolidated" },
  ];
  

  useEffect(() => {
    if (mapContainer.current && !map) {
      // Initialize Mapbox map
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [20, 0], // Initial center of the map
        zoom: 2,
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
        { name: 'Cameroon', data: cameroonGeoJson},
        { name: 'Tanzania', data: tanzaniaGeoJson},
        { name: 'Zambia', data: zambiaGeoJson},
        { name: 'Mozambique', data: mozambiqueGeoJson}
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
      <section className="mt-2">
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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-6">
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
</div>

        <div className="flex justify-center mt-6 items-center h-screen">
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
