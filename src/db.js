let dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD, 
    ssl:false,
    port: process.env.PGPORT
};



module.exports = { dbConfig }
