const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/newsletter - Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    await db.execute(
      'INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
