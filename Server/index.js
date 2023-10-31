const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors=require('cors');

const app = express();
//using express.json() to get data into json format
app.use(express.json());

//Port
const PORT = process.env.PORT || 5000;

app.use(cors());

//importing routes
const TodoItemRoute = require('./Routes/todoItems');


//conecting MongoDB
mongoose.connect(process.env.DB_CONNECT)
.then(()=>console.log('Database connected....'))
.catch(err => console.log(err))

app.use('/', TodoItemRoute);


//Add port and connect to server
app.listen(PORT, ()=>console.log("Server connected..."));