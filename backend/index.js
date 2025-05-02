const express=require('express');
const app=express();
const TaskRoutes=require("./Routes/TaskRouter");
const bodyParser = require('body-parser');
const cors =require('cors')
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


require('dotenv').config();
require('./Models/db')
const PORT=process.env.PORT || 8080;

app.get("/",(req,res)=>{
    res.send("hii")
})
// app.use(cors())


// app.use(bodyParser.json())
app.use("/tasks",TaskRoutes)

app.listen(PORT,()=>{
    console.log(`server is listen at port ${PORT}`)
})