/* eslint-disable react/prop-types */
// WeatherInfo.js


const WeatherInfo = ({ weatherData, error }) => {
  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-md">Error: {error}</div>;
  }

  if (!weatherData) {
    return (
      <div className="bg-gray-200 text-gray-700 p-4 rounded-md">
        Select a location to see weather information
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <h2 className="text-lg font-semibold bg-gray-200 p-3">Weather Information</h2>
      <div className="p-4">
        <p className="text-base">
          Temperature: {weatherData.main.temp}°C
        </p>
        <p className="text-base">
          Description: {weatherData.weather[0].description}
        </p>
        <p className="text-base">
          Humidity: {weatherData.main.humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
