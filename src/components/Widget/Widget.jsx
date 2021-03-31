import React from "react";
import { Card } from "react-bootstrap";

export default function Widget({ weatherData }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          style={{ objectFit: "-moz-initial" }}
          src={weatherData.current?.weather_icons[0]}
        />
        <Card.Body>
          <Card.Title>
            {weatherData.location?.name} {weatherData.current?.temperature}&deg;
          </Card.Title>
          <Card.Text>
            {new Date(weatherData.location?.localtime).toDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
