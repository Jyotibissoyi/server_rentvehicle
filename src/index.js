const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const route = require('./routes/routes.js');
require('dotenv').config();
const app=express();
const port = process.env.PORT || 3001;
// mongoose.set('strictQuery', true);

app.use(multer().any());
app.use(express.json());

app.use('/',route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));  