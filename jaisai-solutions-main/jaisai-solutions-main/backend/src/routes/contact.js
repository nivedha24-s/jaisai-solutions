const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { legal_name, email, project_blueprint } = req.body;

    if (!legal_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const [result] = await db.execute(
      'INSERT INTO contact_inquiries (legal_name, email, project_blueprint) VALUES (?, ?, ?)',
      [legal_name, email, project_blueprint || null]
    );

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      id: result.insertId
    });

    // Send email notification in the background
    const receivers = process.env.RECEIVER_EMAILS || 'sales@jaisaisolutions.com,bharathkaleeswaran004@gmail.com';
    const mailOptions = {
      from: `"Jai Sai Solutions Website" <${process.env.EMAIL_USER}>`,
      to: receivers,
      subject: `New AI Inquiry from ${legal_name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #111; max-width: 600px; border: 1px solid #FFD700; padding: 20px;">
          <h2 style="color: #B8860B; border-bottom: 2px solid #FFD700; padding-bottom: 10px;">New Intelligence Inquiry</h2>
          <p><strong>Name:</strong> ${legal_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background: #fdf6d0; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p><strong>Project Blueprint:</strong></p>
            <p style="white-space: pre-wrap;">${project_blueprint || 'Not Provided'}</p>
          </div>
          <p style="margin-top: 20px; font-size: 0.8rem; color: #888;">This email was sent automatically from Jai Sai Solutions Portfolio.</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email notification:', error);
      } else {
        console.log('Email notification sent:', info.response);
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all inquiries (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM contact_inquiries ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
