require('dotenv').config();
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const pool = require("./db");
const userRouter = require("./Routes/users.routes");
const port = 5500

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Ide gas radi")
})
app.use("/api",userRouter)
app.listen(port,()=> {
    console.log(`Server running on port : ${port}`);
    
})