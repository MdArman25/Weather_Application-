/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  WiHumidity,

  WiCloud,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi"; // Importing weather icons from React Icons

const WeatherCard = ({ weather, unit, toggleUnit }) => {
  const [selectedUnit, setSelectedUnit] = useState(unit);

  // Function to select weather icon based on description
  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud />;
      case "shower rain":
      case "rain":
        return <WiRain />;
      case "snow":
        return <WiSnow />;
      case "thunderstorm":
        return <WiThunderstorm />;
      default:
        return <WiCloud />;
    }
  };

  const calculateTemperature = (temp) => {
    return selectedUnit === "Celsius"
      ? temp
      : parseFloat((temp * 9) / 5 + 32).toFixed(2);
  };

  const temperatureUnitName = selectedUnit === "Celsius" ? "°C" : "°F";

  const temperature = `${calculateTemperature(
    weather.main.temp
  )}${temperatureUnitName}`;
  const weatherDescription = weather.weather[0].description;
  const weatherIcon = getWeatherIcon(weatherDescription);

  return (
    <div className="weather-card">
      <h2 className="text-xl flex justify-center items-center">
        {weather.name}, {weather.sys.country}
      </h2>
      <p className="flex items-center gap-1 justify-center text-4xl font-bold my-6">
        {weatherIcon} {temperature}
      </p>
      <p className="flex justify-center items-center text-xl pb-4">
        Description: {weather.weather[0].description.toUpperCase()}
      </p>
      <p className="flex items-center gap-1 justify-center">
        <span className="text-4xl">
          <WiHumidity />
        </span>{" "}
        <p className="text-2xl">Humidity: {weather.main.humidity}%</p>
      </p>
      <div className="flex justify-center items-center mt-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedUnit}
          onChange={(e) => {
            setSelectedUnit(e.target.value);
            toggleUnit();
          }}
        >
          <option className="py-2 text-sm text-gray-700 dark:text-gray-200" value="Celsius">°C</option>
          <option className="py-2 text-sm text-gray-700 dark:text-gray-200" value="Fahrenheit">°F</option>
        </select>
      </div>
    </div>
  );
};

export default WeatherCard;
