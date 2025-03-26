import './Weather.css';  
import React, { useState, useEffect } from 'react'; 
import { getWeatherData, getWeatherForecast } from '../service/WeatherService';  

import humidityIcon from '../assets/humidity.png';  
import windIcon from '../assets/wind.jpg';
import sunIcon from '../assets/sun.png';
import cloudIcon from '../assets/cloud.jpg';

const Weather = () => {
  const [city, setCity] = useState('');  // State to store city name
  const [weather, setWeather] = useState("");  // State to store weather data
  const [forecast, setForecast] = useState(null);  // State to store forecast data
  const [error, setError] = useState('');  // State to store error messages
  const [message, setMessage] = useState('');  // State to store success message
  const [favoriteCities, setFavoriteCities] = useState([]);  // State to store favorite cities

  // Load favorite cities from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavoriteCities(savedFavorites);
  }, []);

  // Function to search for weather data based on the city
  const searchCity = async () => {
    try {
      const forecastData = await getWeatherForecast(city);  // Get forecast data from the service
      const weatherData = await getWeatherData(city);  // Get weather data from the service
      setWeather(weatherData);
      setForecast(forecastData);
      setMessage(`The weather in ${city} today looks like this...`);  // Set success message
      // setError('');  // Clear any previous errors
    } catch (err) {
      setError('City not found. Please check the name and try again.');  // Handle error
      setForecast(null);  // Reset forecast in case of error
    }
  };

  // Function to format the date for each forecast entry
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to Date object
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Function to handle adding a city to favorites
  const addFavoriteCity = (city) => {
    if (!favoriteCities.includes(city)) {
      const updatedFavorites = [...favoriteCities, city];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites)); // Save to localStorage
    }
  };

  // Function to handle removing a city from favorites
  const removeFavoriteCity = (city) => {
    const updatedFavorites = favoriteCities.filter((favorite) => favorite !== city);
    setFavoriteCities(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites)); // Save to localStorage
  };

  return (
    <div className="weather-container">
      <div className="search-container">
        <h5 className="head">Get Weather Information</h5>
        <input 
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}  // Handle city input change
          placeholder="Enter city name"/><button onClick={searchCity}>Search</button>
        </div>
         
        <div> 
        
        <button onClick={() => addFavoriteCity(city)}>Add to Favorites</button> {/* Button to add city to favorites */}
      </div>

      {/* Error and Success Messages */}
      {error && <p className="error">{error}</p>}  {/* Display error message */}
      {message && <p className="message">{message}</p>}  {/* Display success message */}

     
      {weather && (
        <div className="current-weather">
          <h2>Current Weather</h2>
          <p>Temperature: {weather.main?.temp}°C</p>
          <p>Humidity: {weather.main?.humidity}%</p>
          <p>Wind Speed: {weather.wind?.speed} m/s</p>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && (
        <div className="weather-details">
          <h1>5-Day Forecast</h1>
          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <h2>{formatDate(day.dt)}</h2>
                {/* Weather Icons */}
                <img src={sunIcon} className="icon" alt="sun" />
                <img src={cloudIcon} className="icon" alt="cloud" />
                <img src={humidityIcon} className="icon" alt="humidity" />
                <img src={windIcon} className="icon" alt="wind" />

                {/* Display Temperature */}
                <p className="temperature">
                  Temperature: {day.main.temp}°C
                </p>

                {/* Display Wind Speed */}
                <p className="wind-speed">
                  Wind Speed: {day.wind.speed} m/s
                </p>

                {/* Display Humidity */}
                <p className="humidity">
                  Humidity: {day.main.humidity}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Cities Section */}
      {favoriteCities.length > 0 && (
        <div className="favorite-cities">
          <h2>Your Favorite Cities</h2>
          <ul>
            {favoriteCities.map((favoriteCity, index) => (
              <li key={index}>
                {favoriteCity} 
                <button onClick={() => removeFavoriteCity(favoriteCity)}>Remove</button> {/* Button to remove city */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
