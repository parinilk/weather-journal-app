// src/pages/JournalPage.js
import React from 'react';
import JournalEntryForm from '../components/JournalEntryForm';
import JournalEntriesList from '../components/JournalEntriesList';

const JournalPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📓 Weather Journal</h2>
      <JournalEntryForm onEntryAdded={() => window.location.reload()} />
      <JournalEntriesList />
    </div>
  );
};

export default JournalPage;
