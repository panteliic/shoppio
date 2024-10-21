const {Pool} = require('pg')
const {env} = require("env")

const pool = new Pool({
    host:process.env.HOSTNAME,
    port:process.env.PORT,
    user:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:"shoppio"
})

module.exports = pool