const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require("pg");
const route = require('../src/routes/routes.js');
const { dbConfig } = require('../src/db.js');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', route);

const pool = new Pool(dbConfig);
let Client;
pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to PostgreSQL:", err);
        return;
    } else {
        Client = client
        console.log("connected to postgres")
    }
});


app.listen(port, () => console.log(`Server is Running Succesfully ${port}`));

module.exports = { Client }