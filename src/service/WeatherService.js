
 import axios from 'axios';


const apiUrl = `https://api.openweathermap.org/data/2.5/forecast`

 const apiKey ="8a74cd7322027b935f56db4578868547"

// const apiKey = process.env.REACT_APP_API_KEY;

 
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


/*what i have to do to add some picture in asset and some css style and i have to add a footer and a  header i also have t change tha 
loclahost*/




 
