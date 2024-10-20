const {Pool} = require('pg')


const pool = new Pool({
    host:'localhost',
    port:'5432',
    user:"admin",
    password:"admin",
    database:"shoppio"
})

module.exports = pool