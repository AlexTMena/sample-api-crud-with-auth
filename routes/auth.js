const express = require('express');
const router = express.Router()

router.post('/register', (req,res,next) => {
    res.send({
        body: req.body
    })
})

router.post('/login', ( req, res, next) => {
    res.send({
        body: req.body
    })
})

module.exports = router;