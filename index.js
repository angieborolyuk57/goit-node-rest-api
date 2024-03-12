const express = require('express');
const app = express();
const moment = require("moment")
const fs = require('fs').promises;
const cors = require('cors');

const contacts = require('./db/contacts.json')
  
app.use(cors())

app.use((req, res, next) => {
    console.log("first middleware");
    next()
})

app.use(async (req, res, next) => {
    const { method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
    await fs.appendFile("./public/server.log",`\n${method} ${url} ${date}`); 
    next();
})

app.get('/homepage', (request, response) => {
    response.send("<h2>HomePage</h2>")
})

app.get('/contacts', (req, res) => {
    res.json(contacts);
})

app.get('/products', (req, res) => {
    res.json([]);
})

app.use((req, res) => {
    res.status(404).json({
        message:"Not found"
    })
})
app.listen(3000, () => console.log("Server is running"))
