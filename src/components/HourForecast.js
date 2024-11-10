import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiShowers,
} from "react-icons/wi";
import "./HourForecast.css";

// Mapping weather conditions to react-icons
const weatherIcons = {
  "clear sky": <WiDaySunny />,
  "few clouds": <WiCloud />,
  "scattered clouds": <WiCloud />,
  "broken clouds": <WiCloud />,
  "shower rain": <WiRain />,
  rain: <WiRain />,
  "light rain": <WiShowers />, // Using a different icon for light rain
  thunderstorm: <WiThunderstorm />,
  snow: <WiSnow />,
  mist: <WiCloud />,
};

const getDayLabel = (date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString([], { weekday: "long" });
  }
};

const HourForecast = ({ forecastData }) => {
  return (
    <div className="hour-forecast">
      <h2 className="forecast-heading">Hourly Forecast</h2>
      <div className="forecast-grid">
        {forecastData.map((hour, index) => {
          const date = new Date(hour.time);
          const dayLabel = getDayLabel(date);
          const timeLabel = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          // Add specific class for animation based on condition
          const iconClass = hour.condition.includes("clear sky")
            ? "sun"
            : hour.condition.includes("cloud")
            ? "cloud"
            : hour.condition.includes("light rain")
            ? "light-rain"
            : hour.condition.includes("rain")
            ? "rain"
            : "";

          return (
            <div key={index} className="forecast-item">
              <p className="day">{dayLabel}</p>
              <p className="time">{timeLabel}</p>
              <div className={`icon ${iconClass}`}>
                {weatherIcons[hour.condition] || <WiDaySunny />}
              </div>
              <p className="temp">{hour.temperature}°C</p>
              <p className="condition">{hour.condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourForecast;
