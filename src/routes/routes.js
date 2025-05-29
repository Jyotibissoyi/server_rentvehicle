const express = require('express');
const router = express.Router();

const {createBooking} = require('../controller/bookingController');
const {getAllVehicles} = require('../controller/vehicleController');

router.post('/booking', createBooking);
router.get('/vehicle', getAllVehicles);


module.exports = router;