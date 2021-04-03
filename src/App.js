import React, { useState, useEffect } from "react";
import axiosClient from "./api";
import "./App.css";
import useInterval from "./hooks/useInterval";

const APPID = "31cb786592c8155a2880da1b5c0a0e61";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [coord, setCoord] = useState({});
  const [index, setIndex] = useState(0);

  const coords = [
    { lat: -34.603722, lon: -58.381592 },
    { lat: -33.459229, lon: -70.645348 },
    { lat: 40.73061, lon: -73.935242 },
    { lat: -33.3519487, lon: -60.1995086 },
  ];

  const axiosFetch = async (coord) => {
    try {
      const response = await axiosClient.get(
        `current?access_key=${APPID}&query=${coord.lat},${coord.lon}`
      );
      const apiResponse = response.data;
      setWeatherData(apiResponse);
    } catch (error) {
      console.error(`Falló axiosFetch`, error);
    }
  };

  useEffect(() => {
    // console.log(`ESTE ES EL PRIMER USE EFFECT`);
    const fn = async () =>
      await axiosFetch({ lat: -34.603722, lon: -58.381592 });
    fn();
  }, []);

  useInterval(async () => {
    // console.log(`USE INTERVAL CON INDEX ${index}`);
    const newCoord = coords[index];
    // setCoord(newCoord);
    await axiosFetch(newCoord);
    if (index < 3) setIndex((value) => value + 1);
    else setIndex(() => 0);
  }, 2000);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={weatherData.current?.weather_icons[0]}
          className="App-logo"
          alt="logo"
        />
        <p>
          {weatherData.location
            ? `Current temperature in ${weatherData?.location?.name} is ${weatherData?.current?.temperature}℃`
            : null}
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
