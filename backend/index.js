const express = require("express")
const cors = require("cors")
const pool = require("./db")
const port = 5500

const app = express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Ide gas radi")
})
app.get("/setup",async (req,res)=>{
    try{
        await pool.query("CREATE TABLE users(userId SERIAL PRIMARY KEY, email VARCHAR(50),password VARCHAR(50),firstname VARCHAR(50),lastname VARCHAR(50),role ENUM('admin', 'user'))")
        res.status(200).send("Create a table")
    }catch(err){
        res.sendStatus(500)
        console.error(err)
    }

});
app.listen(port,()=> {
    console.log(`Server running on port : ${port}`);
    
})