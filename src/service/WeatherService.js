
 import axios from 'axios';


 const apiKey= process.env.REACT_APP_apikey



const apiUrl = `https://api.openweathermap.org/data/2.5/forecast`

//const apiKey ="8a74cd7322027b935f56db4578868547"
 
export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric', // Celsius, change to 'imperial' for Fahrenheit
      },
    });
    return response.data;  // Returns the forecast data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};





