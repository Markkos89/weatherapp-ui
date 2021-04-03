import React, { useState, useEffect } from "react";
import axiosClient from "./api";
import "./App.css";
import useInterval from "./hooks/useInterval";
import countries from "i18n-iso-countries";

// const APPID = "31cb786592c8155a2880da1b5c0a0e61";

function App() {
  const [weatherData, setWeatherData] = useState([]);
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
        `current-weather/${coord.lat}/${coord.lon}`
      );
      console.log(response.data);
      setWeatherData(response.data);
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

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        {/* <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label for="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div> */}

        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {Object.keys(weatherData).length !== 0 ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                {kelvinToFarenheit(weatherData?.main?.temp)}&deg; C
              </p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>
                  {weatherData.name}, {weatherData.sys.country}.
                </strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <strong>Min:</strong>{" "}
                    {kelvinToFarenheit(weatherData?.main?.temp_min)}&deg; C
                  </p>
                  <p>
                    <strong>Max:</strong>{" "}
                    {kelvinToFarenheit(weatherData?.main?.temp_max)}&deg; C
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>
                      {" "}
                      {countries.getName(weatherData?.sys?.country, "en", {
                        select: "official",
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
      <footer className="footer">
        <code>
          Created by{" "}
          <a href="https://www.marcosiglesias.com.ar" target="none">
            Marcos Iglesias
          </a>{" "}
          using React and Node.js
        </code>
      </footer>
    </div>
  );
}

export default App;
