require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const mainRouter = require('./routes/mainRouter')

mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to DB!'))


const app = express();

app.use(express.json())
app.use(cors())

app.use('/', mainRouter)

app.listen(4000, () => {
    console.log(`Server started at port 4000`)
})

