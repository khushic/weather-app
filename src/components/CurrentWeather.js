import React, { useState } from "react";

function CurrentWeather(props){
  return (
    <div className="current-weather">
      <div className="row">
        <div className="col-3 rightfloat">
          <h4>Current Temp</h4>
          <br />
          <h5>{props.temp} F</h5>
        </div>
        <div className="col-3">
          <h4>Real Feel</h4>
          <br />
          <h5>{props.realfeel} F</h5>
        </div>
        <div className="col-5">
          <p>Humidity: {props.humidity}%</p>
          <p>Clouds: {props.clouds}% Cover</p>
          <p>Wind Speed: {props.wind_speed} mph</p>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;
