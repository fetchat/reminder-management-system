require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const routes = require('./routes/index.js');
const cron = require('node-cron');
const initializeCronJobs = require('./configs/cron.js');
const app = express();
const port = 5000;
const databaseURL = 'mongodb://localhost:27017/reminderManagementSystem'
app.use(express.json());

mongoose
.connect(databaseURL,{})
.then(() => console.log("Connected to DB"))
.catch((error) => console.log("Connection error: ", error));

mongoose.set("debug", true);

const server = http.createServer(app).listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });

app.get('/hello',(req,res)=>{
    res.json({message:'Hello World!'})
});

// enable routes
app.use("/api", routes);

// adding cron jobs
initializeCronJobs()

app.use((request, reply) => {
    return reply.status(404).json({
      status: 'error',
      message: 'Invalid URL, endpoint not found'
    });
  });

