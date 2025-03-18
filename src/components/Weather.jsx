import './Weather.css';
import React, { useState, useEffect } from 'react'; 
import { getWeatherForecast } from "../service/WeatherService"

import humidity from "../assets/humidity.png"
import wind from "../assets/wind.jpg"
import sun from "../assets/sun.png"
import cloud  from "../assets/cloud.jpg"


const Weather = () => {
  const [city, setCity] = useState();
  const [forecast, setForecast] = useState();
  const [error, setError] = useState('');

  const SearchCity = async () => {
    try {
      const data = await getWeatherForecast(city);
      
      setForecast(data);
      setMessage(  `The weather in ${city}, today looks like this...  ` );
      
    } catch (err) {
      setError('Please check the city name and try again.');
      setForecast();
      
    }
  };

  return (
    <div className="weather-container">
     
       
      <h5 className='head'> Get Weather Information for the Next 5</h5>
      <input type="text" value={city}
        onChange={(e) => setCity(e.target.value)}
        
        placeholder="Pleace enter name city"
        
      />
      <button onClick={SearchCity}>Search</button>  <br />
      

      
     

      {error && <p className="error">{error}</p>}
      <br />

      <div className='Temp'> 
       <img src= {sun} className='TempImg' alt="" />  { "" } 
       <img src={cloud} className='TempImg' alt= ""  /> {""}
       <img src={humidity} className='TempImg' alt  />  {""}
       <img src={wind} className='TempImg'  alt />
       <p className='Text'>Temprature 15.47°C,     Wind1.3 m/s and Humidity 62% </p> 
       

       

      </div>



      {forecast && (
        <div className="forecast">
          {forecast.list.slice(0, 5).map((day, index) => (
            <div key={index} className="forecast-day">
              <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
            

            

              <p>{day.weather[0].description}</p>
              <img src={cloud} className='cloudImg' alt="" />
              <img src= {sun}  className='sunImg' alt="" /> <hr />
             
              <p>Temp: {day.main.temp}°C</p>
              <img src={humidity} className='humidityImg' alt/> <hr />
              <p>Humidity: {day.main.humidity}%</p>
              <img src={wind}  className='windImg'alt /> 
              <p>Wind Speed: {day.wind.speed} m/s</p>
              <hr />
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
