const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        required: true
    },
    isCritical: {
        type: Boolean,
        reuired: true
    }
}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient