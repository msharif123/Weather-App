



const apiKey = "8a74cd7322027b935f56db4578868547"

// const apiKey= Process.env.REACT_APP_API_KEY

export const getWeatherData = async (city) => {
  try {
    const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (response.status !== 200 ) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    if (response.status !== 200) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    return data.list.filter((_ , index) => index % 8 === 0); // 8th entry corresponds to each day at 12:00 PM
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
