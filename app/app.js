const express = require('express')
const cors = require('cors')
const errorHandler = require('./utils/errorHandler')

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const routes = require("./routes/App.routes");

app.use((req, res, next) => {
    const start = Date.now();
    req.time = new Date(start).toString();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.hostname} ${req.originalUrl} ${req.time} ${req.ip} ${res.statusCode} ${duration}ms`);
    });

    next();
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'))

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;