const { connect } = require('../clientConnect');

exports.createBooking = async (req, res) => {
  try {
    let { full_name, type, model, brand, start_date, end_date } = req.body;
    type = 'Car'
    if(type =='2'){
      type = 'Bike'
    }

    if(!full_name || !type || !model || !brand || !start_date || !end_date){
      return res.status(400).send({
        status: false,
        message: "Please provide all fields.",
    });
    }
    const pgClient = await connect()
    const booking = await pgClient.query(
      `INSERT INTO bookings (full_name, type, model, brand, start_date, end_date )
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, type, model, brand, start_date, end_date]
    );

    res.status(201).json(booking.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

