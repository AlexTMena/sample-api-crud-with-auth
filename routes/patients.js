const express    = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('all patients')
});

router.get('/:id', (req, res, next) => {
    res.send({
        message: 'get single',
        params: req.params
    })
});

router.post('/', (req, res, next) => {
    res.send({
        message: 'create patient',
        body: req.body
    })
});

router.put('/:id', (req,res,next) => {
    res.send({
        message: 'update patient',
        params: req.params
    })
})

router.delete('/:id', (req,res,next) => {
    res.send({
        message: 'delete patient',
        params: req.params
    })
})

module.exports = router