// src/App.js
import React from 'react';

import WeatherApp from './WeatherApp';
import JournalPage from './pages/JournalPage';

function App() {
  return (
    <div className="App">
      <WeatherApp />
      <JournalPage />
    </div>
  );
}

export default App;
