const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/services - Get all active services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
