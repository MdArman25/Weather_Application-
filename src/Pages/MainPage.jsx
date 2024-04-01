import { useState, useEffect, useMemo } from "react";
import WeatherCard from "../Components/Weather/WeatherCard";
import SearchBar from "../Components/Weather/Searchbar";
import {
  fetchForecastByLocation,
  fetchForecastByLocationSearch,
  fetchWeatherByLocation,
  fetchWeatherBySearchLocation,
} from "../Components/Weather/wearherServices";

const MainPages = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("Celsius");
  const [locationTime, setLocationTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchCurrentLocationWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetchWeatherByLocation(
            latitude,
            longitude
          );
          const forecastResponse = await fetchForecastByLocation(
            latitude,
            longitude
          ); // Fetch forecast using correct function
          setWeatherData(weatherResponse);
          setForecastData(forecastResponse);
          setError(null);
          setLocationTime(await getTimeByLocation(latitude, longitude));
        } catch (error) {
          setError("Error fetching weather data.");
        }
      },
      (error) => {
        console.log(error);
        setError("Please allow location access to fetch weather data.");
      }
    );
  };

  const handleSearch = async (location) => {
    try {
      const weatherResponse = await fetchWeatherBySearchLocation(location);
      const forecastResponse = await fetchForecastByLocationSearch(location); // Use correct function to fetch forecast
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
      
 
      setError(null);
      setLocationTime(await getTimeByLocation(weatherResponse.coord.lat, weatherResponse.coord.lon));
 
    } catch (error) {
      setError("Error fetching weather data.");
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "Celsius" ? "Fahrenheit" : "Celsius");
  };

  // Memoize weather data to prevent unnecessary re-renders
  const memoizedWeatherData = useMemo(() => weatherData, [weatherData]);

  // Memoize forecast data to prevent unnecessary re-renders
  const memoizedForecastData = useMemo(() => forecastData, [forecastData]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };
  
  const getTimeByLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/Etc/GMT+${Math.round(longitude / 15)}`);
      const data = await response.json();
      const locationTime = new Date(data.utc_datetime);
      return locationTime.toLocaleTimeString();
    } catch (error) {
      console.error("Error fetching location time:", error);
      return "";
    }
  };
  return (
    <div className="App w-full  lg:grid grid-cols-7">
      <div className="lg:col-span-5 w-full py-4 lg:pt-6 px-5  bg-slate-200">

        <div
          className="hero h-96   rounded-2xl w-full"
          style={{
            backgroundImage:
              "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60 flex justify-center items-center ">
            <SearchBar onSearch={handleSearch} />
          </div>
          <p> {currentTime && <p  className="mt-20 mr-28 text-2xl font-bold text-white"> {currentTime}</p>}</p>

          <p className="grid mt-32 mr-20">
            {" "}
            {error && <p>{error}</p>}
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 mt-10 lg:mt-0 bg-[#01257D] grid justify-center text-white">
        <div>
          <div className="lg:py-20 md:py-4">
            {memoizedWeatherData && (
              <WeatherCard
                weather={memoizedWeatherData}
                unit={unit}
                toggleUnit={toggleUnit}
              />
            )}
          </div>
        </div>
        <div className="my-20 ">
          {memoizedForecastData && memoizedForecastData.list ? (
            <div>
              <h2 className="text-white text-2xl font-bold">5-Day Forecast W</h2>
              {memoizedForecastData.list.map((forecast, index) => (
                <div key={index} className="grid mt-5">
                  <p>Date: {forecast.dt_txt}</p>
                  <p>
                    Temperature: {forecast.main.temp}°{unit}
                  </p>
                  <p className="">
                    Description: {forecast.weather[0].description}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default MainPages;
