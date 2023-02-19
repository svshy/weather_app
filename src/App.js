import React, { useState, useEffect } from "react";
import day from "./assets/day.png";
import night from "./assets/night.png";
import geolocation_icon from "./icons/geolocation_icon.png";
import moment from "moment";
import "moment/locale/pl";
import Forecast from "./components/Forecast";
import VisibilityTile from "./components/VisibilityTile";
import WindTile from "./components/WindTile";
import SuntimeTile from "./components/SuntimeTile";

const App = () => {
  const [city, setCity] = useState("New York");
  const [bgi, setBgi] = useState(null);
  const [todayWeatherJSON, setTodayWeatherJSON] = useState("");
  const [forecastWeatherJSON, setForecastWeatherJSON] = useState([]);
  const [cityDayAndDate, setCityDayAndDate] = useState("");
  const [isDayActive, setIsDayActive] = useState(null);
  const [actualTimeInCity, setActualTimeInCity] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;
  let urlForGeolocation = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lang=pl&units=metric`;
  let urlForForecast = `https://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly,alerts&appid=${API_KEY}&lang=pl&units=metric`;
  const TODAY_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&lang=pl&units=metric&q=${city}`;

  const fetchForecast = async (long, lat) => {
    urlForForecast += `&lat=${lat}&lon=${long}`;
    const response = await fetch(urlForForecast);
    const data = await response.json();
    setForecastWeatherJSON(data.daily.splice(1, 7));
  };

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTodayWeatherJSON(data);
      fetchForecast(data.coord.lon, data.coord.lat);
      setDayAndTime(data.timezone);
      setCity("");
      handleBackground(data.timezone, data.sys.sunrise, data.sys.sunset);
    } else {
      alert("Podano niepoprawną nazwę miejscowości. Spróbuj ponownie.");
      setCity("");
    }
  };

  const geoLocationUserAndFetch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        urlForGeolocation += `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        fetchData(urlForGeolocation);
      },
      (error) => {
        alert("Nie można pobrać lokalizacji, brak uprawnień!");
      }
    );
  };

  useEffect(() => {
    fetchData(TODAY_WEATHER_API);
  }, []);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSearchLocationOnClick = () => {
    fetchData(TODAY_WEATHER_API);
  };

  const handleSearchLocationOnPressEnter = (e) => {
    if (e.key === "Enter") {
      fetchData(TODAY_WEATHER_API);
    }
  };

  const handleBackground = (
    timezoneInSeconds,
    sunriseTimeInSec,
    sunsetTimeInSec
  ) => {
    const nowTime = moment().utc().valueOf() / 1000 + timezoneInSeconds;
    const sunriseTime = sunriseTimeInSec + timezoneInSeconds;
    const sunsetTime = sunsetTimeInSec + timezoneInSeconds;

    if (nowTime > sunriseTime && nowTime < sunsetTime) {
      setBgi(day);
      setIsDayActive(true);
    } else {
      setBgi(night);
      setIsDayActive(false);
    }
  };

  const setDayAndTime = (timezoneInSeconds) => {
    let date = moment().utc().add(timezoneInSeconds, "seconds");
    setActualTimeInCity(date.format("HH:mm"));
    let day = date.format("dddd");
    day = day.charAt(0).toUpperCase() + day.slice(1);
    date = date.format("DD.MM.YYYY");
    setCityDayAndDate(`${day}, ${date}`);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="left-panel">
          <div className="input-container">
            <input
              onChange={handleChangeCity}
              onKeyPress={handleSearchLocationOnPressEnter}
              type="text"
              placeholder="Wpisz miasto..."
              value={city}
            />
            <button
              onClick={handleSearchLocationOnClick}
              id="search-icon-btn"
            ></button>
          </div>
          <div className="top-container">
            <div className="city-geolocation">
              <h1>{todayWeatherJSON ? `${todayWeatherJSON.name}` : null}</h1>
              <img
                className="geolocation"
                onClick={() => geoLocationUserAndFetch()}
                src={geolocation_icon}
                alt="geolocation"
                title="Pobierz współrzędne"
              />
            </div>
            <img
              className="weather-icon"
              src={
                todayWeatherJSON
                  ? `http://openweathermap.org/img/wn/${todayWeatherJSON.weather[0].icon}@2x.png`
                  : "-"
              }
              alt=""
            />
            <p style={{ fontStyle: "italic" }}>
              {todayWeatherJSON
                ? `${todayWeatherJSON.weather[0].description}`
                : "-"}
            </p>
            <h1>
              {todayWeatherJSON
                ? `${todayWeatherJSON.main.temp.toFixed(1)} °C`
                : "-"}
            </h1>
            <p>
              {todayWeatherJSON
                ? `${cityDayAndDate}, ${actualTimeInCity}`
                : "-"}
            </p>
          </div>
          <div className="bottom-container">
            <p>Temperatura odczuwalna</p>
            <h1>
              {todayWeatherJSON
                ? `${todayWeatherJSON.main.feels_like.toFixed(1)} °C`
                : "-"}
            </h1>
            <p>Ciśnienie atmosferyczne</p>
            <h1>
              {todayWeatherJSON ? `${todayWeatherJSON.main.pressure} hPa` : "-"}
            </h1>
            <p>Wilgotność</p>
            <h1>
              {todayWeatherJSON ? `${todayWeatherJSON.main.humidity} %` : "-"}
            </h1>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url("${bgi}")` }}
          className="right-panel"
        >
          <h1 style={{ color: `${isDayActive ? "black" : "white"}` }}>
            Prognoza na kolejne dni
          </h1>
          <div className="forecast-panel">
            <Forecast
              forecastWeatherJSON={forecastWeatherJSON}
              isDayActive={isDayActive}
            />
          </div>
          <h1 style={{ color: `${isDayActive ? "black" : "white"}` }}>
            Inne współczyniki
          </h1>
          <div className="weather-conditions-panel">
            <VisibilityTile
              todayWeatherJSON={todayWeatherJSON}
              isDayActive={isDayActive}
            />
            <WindTile
              todayWeatherJSON={todayWeatherJSON}
              isDayActive={isDayActive}
            />
            <SuntimeTile
              todayWeatherJSON={todayWeatherJSON}
              isDayActive={isDayActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// todo godzina i sprawdzenie czy pokazuje dobrze dzien i noc
