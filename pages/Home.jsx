import Head from "next/head";
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react';
import 'chart.js/auto';

const Home = () => {

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
    { name: "Mozambique", link: "/Mozambique" },

  ];



    return (
      <section className = "mt-4">
        <div className="main">
            <div className="gradient" />
        </div>
        <div className="app">
            {/* <Nav /> */}
          <h1 className="head_text text-center">
            Subsidiaries CLR Analyzerrrrr {" "}
            <br className="max-md:hidden *" />
            <span className="orange_gradient text-center">And Monitor</span>
          </h1>
          <p className="desc text-center">
         A place to view key metrices for the subsidiaries at any point in time
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-6">
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

      </section>
  );
};

export default Home;

          {/* <Feed /> */}