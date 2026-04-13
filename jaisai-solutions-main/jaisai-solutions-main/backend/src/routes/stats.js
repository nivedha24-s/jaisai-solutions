const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/stats - Get all stats
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM stats ORDER BY display_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
