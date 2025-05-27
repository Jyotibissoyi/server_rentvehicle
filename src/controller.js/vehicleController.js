const pool = require('../db');

exports.getAllVehicles = async (req, res) => {
  try {
    const { type, available } = req.query;
    const result = await pool.query(
      `SELECT * FROM vehicles
       WHERE ($1::text IS NULL OR type = $1)
       AND ($2::boolean IS NULL OR is_available = $2)`,
      [type || null, available === undefined ? null : available === 'true']
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const { model, brand, type, price_per_day, is_available } = req.body;
    const result = await pool.query(
      `INSERT INTO vehicles (model, brand, type, price_per_day, is_available)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [model, brand, type, price_per_day, is_available]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { model, brand, type, price_per_day, is_available } = req.body;
    const result = await pool.query(
      `UPDATE vehicles
       SET model = $1, brand = $2, type = $3, price_per_day = $4, is_available = $5
       WHERE id = $6 RETURNING *`,
      [model, brand, type, price_per_day, is_available, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};