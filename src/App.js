
import React, { useState } from 'react';
import WeatherApp from './WeatherApp';
import JournalPage from './pages/JournalPage';
import './App.css';

function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-2">🌤 Weather Journal App</h1>

      <div className="text-sm text-gray-700 mb-6 flex justify-center items-center gap-2">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowInfo((prev) => !prev)}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm"
          >
            ℹ️
          </button>

          {showInfo && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-80 bg-gray-800 text-white text-xs p-3 rounded shadow-lg z-50 text-left">
              <p><strong>Project created by:</strong> Parinil Kala </p>
              <p className="mt-1"><strong>Company:</strong> Product Manager Accelerator </p>
              <p className="mt-1">
                From entry-level to VP of Product, we support PM professionals through every stage of their careers.
              </p>
              <a
                href="https://www.linkedin.com/school/pmaccelerator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline block mt-2"
              >
                View Company on LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      <WeatherApp />
      <JournalPage />
    </div>
  );
}

export default App;
