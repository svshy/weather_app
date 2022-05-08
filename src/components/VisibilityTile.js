import React from "react";
import visibility_icon from "../icons/visibility.png";

const VisibilityTile = (props) => {
  const visibilityInKm = props.todayWeatherJSON.visibility / 1000;
  return (
    <div
      className={`today-weather-tile ${props.isDayActive ? "day" : "night"}`}
    >
      <div className="left-today-weather-tile">
        <h2>Widoczność</h2>
        <h3>{`${visibilityInKm.toFixed(1)} km`}</h3>
      </div>
      <img src={visibility_icon} alt="" />
    </div>
  );
};

export default VisibilityTile;
