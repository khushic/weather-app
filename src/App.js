import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Daily from "./components/Daily";
import Hourly from "./components/Hourly";
import "./keys";
import API_KEY from "./keys";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from "@material-ui/core";

function App() {
  const [weather, setWeather] = useState();
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [zip, setZip] = useState("22904");

  const handleChange = () => {
    var curr_zip = document.getElementById("zipcode");
    console.log(curr_zip);
    if(curr_zip!=null){
      setZip(curr_zip.value);
    }
  };

  var tempInfo = "";
  const fetchQuestions = () => {
    var lat = "";
    var long = "";
    const url1 = new URL("https://api.openweathermap.org/data/2.5/weather")
    url1.searchParams.append("zip", zip);
    url1.searchParams.append("appid", API_KEY);
    fetch(url1)
    .then((resp) => {
      var temp = resp.json();
      return temp;
    })
    .then((obj) => {
      console.log(obj);
      lat = obj.coord.lat;
      long = obj.coord.lon;

      const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
      url.searchParams.append("lat", lat);
      url.searchParams.append("lon", long);
      url.searchParams.append("exclude", "minutely,alerts");
      url.searchParams.append("appid", API_KEY);
      fetch(url)
      .then((resp) => {
        var temp = resp.json();
        return temp;
      })
      .then((obj) => {
        console.log(obj);
        setWeather(obj);
        setHourly(obj.hourly);
        setDaily(obj.daily);
      })
    })
  }
  fetchQuestions();
  tempInfo = weather?.current;

  const hourlyWeather = hourly.map((h) => (
    <Hourly
      date={h.dt}
      temp={h.temp}
      feels_like={h.feels_like}
      humidity={h.humidity}
      clouds={h.clouds}
      wind_speed={h.wind_speed}
    />
  ));

  const dailyWeather = daily.map((d) => (
    <Daily
      temp={d.temp.day}
      feels_like={d.feels_like.day}
      humidity={d.humidity}
      clouds={d.clouds}
      wind_speed={d.wind_speed}
    />
  ));

  const toggleDisplay = (button) => {
    if(button == "hour"){
      document.getElementById("hourly").style.display = "block";
      document.getElementById("daily").style.display = "none";
      document.getElementById("hour-button").classList.add("selected");
      document.getElementById("hour-button").classList.remove("not-selected");
      document.getElementById("daily-button").classList.add("not-selected");
      document.getElementById("daily-button").classList.remove("selected");
    }
    else{
      document.getElementById("daily").style.display = "block";
      document.getElementById("hourly").style.display = "none";
      document.getElementById("hour-button").classList.add("not-selected");
      document.getElementById("hour-button").classList.remove("selected");
      document.getElementById("daily-button").classList.add("selected");
      document.getElementById("daily-button").classList.remove("not-selected");
    }
  }

  if(!weather){
    return(
      <div>
      </div>
    )
  }
  return (
    <div style={{ textAlign: "center", margin: "2rem"}}>
      <form style={{ width: "100%", textAlign:"center"}}>
        <label>
          Zipcode to Search For: &nbsp;
          <input id="zipcode" type="text" name="name" />
        </label>
        <button onClick={handleChange()}/>
      </form>
      <h4 className="headers header-top">Current Temperature</h4>
      <CurrentWeather temp={tempInfo['temp']} realfeel={tempInfo['feels_like']} humidity={tempInfo['humidity']} clouds={tempInfo['clouds']} wind_speed={tempInfo['wind_speed']}/>
      <div style={{ display: "inline-block" }}>
        <button onClick={()=> toggleDisplay("hour")} id="hour-button" class="btn-custom btn selected">Show Hourly</button>
        <button onClick={()=> toggleDisplay("daily")} id="daily-button" class="btn-custom btn not-selected">Show Daily</button>
      </div>
      <div id="hourly">
        <h4 className="headers">Hourly Forecast</h4>
        <div class="row">
          {hourlyWeather}
        </div>
      </div>
      <div id="daily">
        <h4 className="headers">Daily Forecast</h4>
        <div class="daily-wrapper">
          {dailyWeather}
        </div>
      </div>
    </div>
  );
}

export default App;
