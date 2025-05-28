import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YoutubeVideoList from './YoutubeVideoList';
import GoogleMapEmbed from './GoogleMapEmbed';


const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const JournalEntriesList = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/entries`);
      setEntries(res.data);
    } catch (err) {
      console.error('Error fetching entries:', err);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/entries/${id}`);
      fetchEntries();
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="mt-8 max-w-3xl mx-auto space-y-6">
      {entries.map((entry) => (
        <div
          key={entry._id}
          className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-1">{entry.location}</h3>
          <p className="text-gray-600 mb-2">Weather: <span className="italic">{entry.weather}</span></p>
          <p className="text-gray-800">{entry.notes}</p>

          {/* External Content */}
          <div className="mt-4">
            <YoutubeVideoList location={entry.location} />
            <GoogleMapEmbed location={entry.location} />
          </div>

          <button
            onClick={() => deleteEntry(entry._id)}
            className="mt-4 inline-block text-sm text-red-600 hover:underline"
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default JournalEntriesList;
