const express = require('express');
const router = express.Router();
const {register} = require('../controller.js/authController');
const {createBooking} = require('../controller.js/bookingController');

router.post('/register', register);
router.post('/booking', createBooking);


module.exports = router;