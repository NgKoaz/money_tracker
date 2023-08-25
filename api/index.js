const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './' }); // This loads environment variables from .env
const Transaction = require('./model/Transaction');
const mongoose = require("mongoose");

const app = express();

const MONGO_URL = "mongodb+srv://admin:admin@cluster0.1nxsglr.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());

app.get('/api/transaction', async (req, res) => {
    await mongoose.connect(MONGO_URL)
    const transactions = await Transaction.find()
    console.log(transactions)
    res.json(transactions)
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(MONGO_URL)
    const {name, description, datetime, price} = req.body;
    const transaction = await Transaction.create({name, description, datetime, price})
    console.log(JSON.stringify(transaction))
    res.json(transaction)
});

// const PORT = 4040;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });