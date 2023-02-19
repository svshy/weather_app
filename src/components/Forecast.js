import React from "react";
import moment from "moment";
import "moment/locale/pl";

const Forecast = (props) => {
  const forecastTable = props.forecastWeatherJSON;
  const forecastList = forecastTable.map((forecastTile, i) => (
    <div
      key={i}
      className={`forecast-tile ${props.isDayActive ? "day" : "night"}`}
    >
      <h2>
        {forecastTile
          ? `${moment(1000 * forecastTile.dt).format("dd.")}`
          : null}
      </h2>
      <img
        className="weather-icon"
        src={
          forecastTile
            ? `http://openweathermap.org/img/wn/${forecastTile.weather[0].icon}.png`
            : "-"
        }
        alt=""
      />
      <p>
        <span>
          {forecastTile ? `${Math.round(forecastTile.temp.day)}° ` : null}
        </span>
        <span>
          {forecastTile ? `${Math.round(forecastTile.temp.night)}° ` : null}
        </span>
      </p>
    </div>
  ));
  return forecastList;
};

export default Forecast;
