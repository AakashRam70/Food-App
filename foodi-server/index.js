const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 6001;
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// middleware 
app.use(cors());
app.use(express.json());

// app.use(urlencoded({
//     extended: true
// }))

// mongodb configuration using mongoose 

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.vseyedc.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
    .then(
        console.log("MongoDB Connected Successfully")
    )
    .catch((error) => console.log("Error connected to MongoDB", error));


app.use((req, res, next) => {
    console.log(`req method: ${req.method} ${req.url}`);
    next();
});

//jwt authentications
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'
    })
    res.send({ token });
})

//Import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");

app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});