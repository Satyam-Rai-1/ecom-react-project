const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
require("./Models/db")
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRoutes = require('./Routes/ProductRoutes');



const PORT = process.env.PORT ||8081

// for test server is running fine
// app.get('/ping',(req,res)=>{
//     res.send('Pong')
// })

app.use(bodyParser.json());
app.use(cors())
app.use('/auth',AuthRouter)
app.use("/api", ProductRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})