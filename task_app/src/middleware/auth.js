const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log('This is header ',req.header('Authorization'))
        if(!req.header('Authorization')){
            return res.status(302).header('Location', '/login').end();
        }
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decoded = jwt.verify(token, 'thisismynewcourse')
        
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})  

        if (!user){
            console.log('User not found.')
            return res.status(302).header('Location', '/login').end();
        }
        req.token = token;
        req.user = user;
        console.log('we are corectly authenticated and authorizied')
        next()
    } catch (e){
        res.status(401).send({message: e.message})
    }
}

module.exports = auth