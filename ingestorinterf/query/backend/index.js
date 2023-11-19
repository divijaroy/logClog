const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const MongoDB = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();

MongoDB();

// Use cors middleware
app.use(cors({
    origin: "http://localhost:3456",
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3456");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require('./Routes/ingest.js'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
