const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const { Parser } = require('json2csv');

// GET all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch entries' });
  }
});

// POST a new entry
router.post('/', async (req, res) => {
  const { location, notes, weather } = req.body;

  if (!location || !notes) {
    return res.status(400).json({ message: 'Location and notes are required' });
  }

  try {
    const newEntry = new Entry({
      location,
      notes,
      weather: weather || 'Not specified',
    });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save entry' });
  }
});

// PUT update entry
router.put('/:id', async (req, res) => {
  try {
    const updated = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

// DELETE entry
router.delete('/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// EXPORT as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const entries = await Entry.find();
    const parser = new Parser({ fields: ['location', 'notes', 'weather', 'createdAt'] });
    const csv = parser.parse(entries);

    res.setHeader('Content-Disposition', 'attachment; filename=entries.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Export failed' });
  }
});

// EXPORT as JSON
router.get('/export/json', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.setHeader('Content-Disposition', 'attachment; filename=entries.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(entries);
  } catch (err) {
    res.status(500).json({ message: 'Export failed' });
  }
});

module.exports = router;
