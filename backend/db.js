const {Pool} = require('pg')


const pool = new Pool({
    host:'shoppio',
    port:'5432',
    user:"user123",
    password:"password123",
    database:"shoppio"
})

module.exports = pool