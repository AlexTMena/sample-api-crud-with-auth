const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (payload) => {
    return jwt.sign({ ...payload}, process.env.SECRET,{ expiresIn: 60 * 60 });
}

const decodedToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
}

const getTokenFromHeader = (bearerHeader) => {
    
    if(typeof bearerHeader === 'undefined') throw new Error("Please login to continue");

    const bearer = bearerHeader.split(' ')
    return bearer[1];
}

const getUserUsingToken = async (token) => {
    try{
        return await User.findById(decodedToken(token).id)
    } catch (e) {
        throw new Error(e.message);
    }
}

const verifyUser = async (req,res,next) => {
    try {
        const tokenFromHeader = await getTokenFromHeader(req.headers['authorization']);
        const user = await getUserUsingToken(tokenFromHeader)
        if(user) {
            req.user = user
            return next()
        }
    } catch (e) {
        return res.status(401).send({
            data: {
                error: "Please Login to continue"
            }, 
        })
    }

}

module.exports = {
    createToken,
    decodedToken,
    verifyUser
}