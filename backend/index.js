require('dotenv').config();
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const pool = require("./db");
const userRouter = require("./Routes/users.routes");
const productRouter = require("./Routes/product.routes");
const favoritesRouter = require("./Routes/favorites.routes");
const cartRouter = require("./Routes/cart.routes");
const authenticateToken = require('./middleware/auth.middleware');
const { getAuthUser } = require('./Controller/user.controller');

const port = 5500

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))
app.use(cookieParser())

app.get("/proba",authenticateToken,(req,res)=>{
    return res.send({ime: "Nikola"})
})
app.get("/user",authenticateToken,getAuthUser)
app.use("/api",userRouter)
app.use("/api",productRouter)
app.use("/api",favoritesRouter)
app.use("/api",cartRouter)

app.listen(port,()=> {
    console.log(`Server running on port : ${port}`);
    
})