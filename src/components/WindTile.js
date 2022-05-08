import React from "react";
import wind_icon from "../icons/wind.png";

const WindTile = (props) => {
  const windDirection = (degree) => {
    const value = Math.floor(parseInt(degree) / 22.5 + 0.5);
    const arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[value % 16];
  };

  return (
    <div
      className={`today-weather-tile ${props.isDayActive ? "day" : "night"}`}
    >
      <div className="left-today-weather-tile">
        <h2>Wiatr</h2>
        <h3>
          {props.todayWeatherJSON
            ? `Siła wiatru: ${(props.todayWeatherJSON.wind.speed * 3.6).toFixed(
                1
              )} km/h`
            : "Siła wiatru: -"}
        </h3>
        <h3>
          {props.todayWeatherJSON
            ? `Kierunek: ${windDirection(props.todayWeatherJSON.wind.deg)}`
            : "Kierunek: -"}
        </h3>
      </div>
      <img src={wind_icon} alt="" />
    </div>
  );
};

export default WindTile;
