const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()
const port = process.env.PORT | 3000;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then((conn) => {
    console.log('Connected to Database Successfully...')
}).catch((e) => {
    console.log('Failed to Connect to Database')
});

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const patients = require('./routes/patients');
app.use('/api/patient', patients );

app.use((err,req,res,next,)=> {
    return res.status(400).send({
        data: {
            error: err.message
        }, 
    })
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});

