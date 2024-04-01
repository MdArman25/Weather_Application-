import axios from "axios";

const API_KEY = "4c6b4fca4d23c30ce48d9ac8b9bad491";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

const fetchWeatherByLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    console.log('successfully');
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather data. Please try again.');
  }
};

const fetchWeatherBySearchLocation = async (location) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
    console.log('successfully');
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch weather data. Please try again.');
  }
};

const fetchForecastByLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch forecast data. Please try again.');
  }
};

const fetchForecastByLocationSearch = async (location) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('Could not fetch forecast data. Please try again.');
  }
};

export { fetchWeatherByLocation, fetchForecastByLocationSearch, fetchWeatherBySearchLocation, fetchForecastByLocation };
