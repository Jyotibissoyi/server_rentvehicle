const { Pool } = require("pg");
const { dbConfig } = require("./db");
// const { dbConfig } = require("../../db/dbConfig");

let client = null;

let existingPool = null;

const connect = () => {
    if (!existingPool) {
        existingPool = new Pool(dbConfig);
    }
    return existingPool;
};

module.exports = { connect }