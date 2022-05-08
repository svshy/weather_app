import React from "react";
import sun_icon from "../icons/sunrise.png";
import moment from "moment";
import "moment/locale/pl";

const SuntimeTile = (props) => {
  const sunTime = (sunTimeInSec, timezoneInSec) =>
    moment(1000 * (sunTimeInSec + timezoneInSec))
      .utc()
      .format("HH:mm");

  return (
    <div
      className={`today-weather-tile ${props.isDayActive ? "day" : "night"}`}
    >
      <div className="left-today-weather-tile">
        <h2>Wschód</h2>
        <p>
          {props.todayWeatherJSON
            ? sunTime(
                props.todayWeatherJSON.sys.sunrise,
                props.todayWeatherJSON.timezone
              )
            : "-"}
        </p>
        <h2>Zachód</h2>
        <p>
          {props.todayWeatherJSON
            ? sunTime(
                props.todayWeatherJSON.sys.sunset,
                props.todayWeatherJSON.timezone
              )
            : "-"}
        </p>
      </div>
      <img src={sun_icon} alt="" />
    </div>
  );
};

export default SuntimeTile;
