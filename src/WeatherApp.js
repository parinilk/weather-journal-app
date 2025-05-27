
import React, { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (loc) => {
    try {
      setLoading(true);
      setError('');
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}&units=metric`);
      const currentData = await currentRes.json();

      if (currentData.cod !== 200) throw new Error(currentData.message);

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastRes.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError('');
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const currentData = await currentRes.json();

      if (currentData.cod !== 200) throw new Error(currentData.message);

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastRes.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (location.trim() !== '') {
      fetchWeather(location);
    }
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        setError('Unable to retrieve your location');
      }
    );
  };

  const renderForecast = () => {
    if (!forecastData) return null;
    const daily = {};
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date]) {
        daily[date] = item;
      }
    });

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.values(daily).map((item, index) => (
          <div key={index} className="p-4 bg-blue-100 rounded-xl text-center">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{item.main.temp}°C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌤 Weather App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or zip code"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
        <button onClick={handleLocationClick} className="bg-green-500 text-white p-2 rounded">
          📍 Use My Location
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold">Current Weather in {weatherData.name}</h2>
          <div className="flex items-center gap-4 mt-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div>
              <p className="text-lg">{weatherData.main.temp}°C</p>
              <p>{weatherData.weather[0].main}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

      {forecastData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">5-Day Forecast</h2>
          {renderForecast()}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
