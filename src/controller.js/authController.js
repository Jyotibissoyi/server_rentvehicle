const pool = require('../db');

exports.register = async (req, res) => {
    try {
        const { fname, lname  } = req.body;
        if (!fname ||  !lname ) {
            return res.status(400).json({
                status: false,
                error: 'Please provide all data.'
            });
        };
        const result = await pool.query(
            'INSERT INTO users ( fname, lname ) VALUES ($1, $2) RETURNING *',
            [ fname, lname ]
        );

        res.status(201).json({ message: 'Registered Successfully', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error registering', error: error.message });
    }
}; 
