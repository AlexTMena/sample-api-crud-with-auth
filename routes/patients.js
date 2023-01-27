const express    = require('express');
const Patient = require('../models/Patient');
const { verifyUser } = require('../utils/token');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const patients = await Patient.find().limit(50).sort({ updatedAt: 'desc'})
        return res.send({data: patients})
    } catch (e) {
        return next(e)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        return res.send({data: patient})
    } catch (e) {
        return next(e)
    }
});

router.post('/', verifyUser, async (req, res, next) => {
    try{
        const patient = await Patient.create(req.body)
        return res.send({
            data: {
                message: `Patient ${patient.firstName} ${patient.lastName} is added`,
                patient
            }
        })
    } catch(e) {
        return next(e)
    }
});

router.put('/:id', verifyUser, async (req,res,next) => {
    try{
        const patient = await Patient.findByIdAndUpdate(req.params.id,req.body, {new: true})
        return res.send({
            data: {
                message: `Patient ${patient.firstName} ${patient.lastName} is updated`,
                patient
            }
        })
    } catch(e) {
        return next(e)
    }
})

router.delete('/:id', verifyUser, async (req,res,next) => {
    try{
        const patient = await Patient.findByIdAndDelete(req.params.id)
        return res.send({
            data: {
                message: `Patient ${patient.firstName} ${patient.lastName} is gone`,
            }
        })
    } catch(e) {
        return next(e)
    }
})

module.exports = router