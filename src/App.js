import React, { useState, useEffect } from "react";
import axiosClient from "./api";
import "./App.css";

const APPID = "31cb786592c8155a2880da1b5c0a0e61";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [coord, setCoord] = useState({});

  const coords = [
    { lat: -34.603722, lon: -58.381592 },
    { lat: -33.459229, lon: -70.645348 },
    { lat: 40.73061, lon: -73.935242 },
    { lat: -33.3519487, lon: -60.1995086 },
  ];

  const axiosFetch = (c) => {
    axiosClient
      .get(`current?access_key=${APPID}&query=${c.lat},${c.lon}`)
      .then((response) => {
        const apiResponse = response.data;
        setWeatherData(apiResponse);
        console.log(apiResponse);
        console.log(
          `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCoord(coords[index]);
      index++;
      if (index === 4) index = 0;
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axiosFetch(coord);
  }, [coord]);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={weatherData.current?.weather_icons[0]}
          className="App-logo"
          alt="logo"
        />
        <p>
          {`Current temperature in ${weatherData?.location?.name} is ${weatherData?.current?.temperature}℃`}
        </p>
        <a
          className="App-link"
          href="https://www.marcosiglesias.com.ar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Marcos Iglesias
        </a>
      </header>
    </div>
  );
}

export default App;
