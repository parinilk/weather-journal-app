import React, { useState } from 'react';
import axios from 'axios';

const JournalEntryForm = ({ onEntryAdded }) => {
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      const weatherDescription = weatherRes.data.weather[0].description;

      await axios.post('/api/entries', {
        location,
        notes,
        weather: weatherDescription,
      });

      setLocation('');
      setNotes('');
      onEntryAdded();
    } catch (err) {
      console.error('Error creating entry or fetching weather:', err);
      alert('Failed to save entry. Make sure the city name is valid.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-2xl mx-auto mt-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">📝 New Journal Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your journal notes..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          ➕ Add Entry
        </button>
      </form>
    </div>
  );
};

export default JournalEntryForm;
