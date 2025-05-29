const { connect } = require('../clientConnect');

exports.getAllVehicles = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).send({
        status: false,
        message: "Please provide type field.",
      });
    }
    // console.log(Client);
    const pgClient = await connect()

    const result = await pgClient.query(
      `SELECT * FROM vehicles
       WHERE type = $1`,
      [type]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};