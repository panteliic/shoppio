require('dotenv').config();
const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOSTNAME}:${process.env.PORT}/shoppio`;

const pool = new Pool({
    connectionString: connectionString,
});
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log(`Connected to database at ${process.env.HOSTNAME}:${process.env.PORT} as user ${process.env.USERNAME}`);
    }
});
module.exports = pool;
