import React, { useState } from "react";

function CurrentWeather(props){
  var date = new Date(props.date);
  var elapsed = date.getTime(); // Elapsed time in MS
  console.log(elapsed);
  return (
    <div className="hourly">
      <div className="row">
        <div className="col-3">
          <h5>Temp: {props.temp}</h5>
        </div>
        <div className="col-2">
          <p>Real Feel: {props.feels_like}</p>
        </div>
        <div className="col-2">
          <p>Humidity: {props.humidity}%</p>
        </div>
        <div className="col-2">
          <p>Clouds: {props.humidity}% Coverage</p>
        </div>
        <div className="col-2">
          <p>Wind Speed: {props.humidity}mph</p>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;
