const pool = require('../db');

exports.createBooking = async (req, res) => {
  try {
    const { name, vehicleId, startDate, endDate } = req.body;
    const userId = req.userId;

    const booking = await pool.query(
      `INSERT INTO bookings (user_id, vehicle_id, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name,userId, vehicleId, startDate, endDate]
    );

    res.status(201).json(booking.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await pool.query(
      `SELECT b.*, v.model, v.brand, v.type
       FROM bookings b
       JOIN vehicles v ON v.id = b.vehicle_id
       WHERE b.user_id = $1
       ORDER BY b.start_date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};
