import React, { useState } from "react";

function Daily(props){
  return (
    <div className="daily">
      <h5>Temp: {props.temp}</h5>
      <p>Real Feel: {props.feels_like}</p>
      <p>Humidity: {props.humidity}%</p>
      <p>Clouds: {props.humidity}% Coverage</p>
      <p>Wind Speed: {props.humidity}mph</p>
    </div>
  );
}
export default Daily;
