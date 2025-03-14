// src/components/Weather.jsx

import React, { useState, useEffect } from 'react';
import { getWeatherForecast } from "../service/WeatherService"
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await getWeatherForecast(city);
      setForecast(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please check the city name.');
      setForecast(null);
    }
  };

  return (
    <div className="weather-container">
      <h3>5-Day Weather Forecast</h3>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Get Forecast</button>

      {error && <p className="error">{error}</p>}

      {forecast && (
        <div className="forecast">
          {forecast.list.slice(0, 5).map((day, index) => (
            <div key={index} className="forecast-day">
              <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
              <p>{day.weather[0].description}</p>
              <p>Temp: {day.main.temp}°C</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind Speed: {day.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
