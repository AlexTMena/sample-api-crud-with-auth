const express = require('express');
const router = express.Router();
const User = require('./../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/token.js');

router.post('/register', async (req,res,next) => {
    try{
        if(req.body.password !== req.body.verifyPassword) {
            throw new Error('Password do not match');
        }
        const salt = await bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hashSync(req.body.password, 10)
        await User.create(req.body)
        return await res.json({
            data : {
                message: 'Registration Successfull'
            } 
        })
    } catch (e) {
        return next(e)
    }
})

router.post('/login', async ( req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username})
        const fakeHashedPassword = "$2a$10$EGkh3.vkj0y5rJL9NgXGgezyITXGVl6bqHvJwPSlhMeT7go2na4yOThisISFakeHashed" // for time attacked
        
        const isPasswordMatched = await bcrypt.compareSync(req.body.password,  user ? user.password : fakeHashedPassword)

        if(!user || !isPasswordMatched) throw new Error("Please check username and password");

        return res.send({
            data: {
                message: "Login Successful",
                token: createToken({id: user.id})
            }
        })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;