const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    database: 'customer',
    user: 'root',
    password: 'root',
    port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.post('/forgot-password', async (req, res) => {
  const { mailid } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM customer.mainlogin WHERE mailid = ?', [mailid]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the token and its expiry date to the user row in the database
    const updateTokenQuery = 'UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?';
    await pool.execute(updateTokenQuery, [token, mailid]);

    // Send email to the user with the password reset link containing the token
    // You can use nodemailer or any other email sending library for this

    res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE resetPasswordToken = ? AND resetPasswordExpires > NOW()', [token]);
    
    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUserQuery = 'UPDATE users SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE resetPasswordToken = ?';
    await connection.execute(updateUserQuery, [hashedPassword, token]);
    connection.release();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
