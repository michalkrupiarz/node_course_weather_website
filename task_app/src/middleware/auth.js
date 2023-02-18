const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log('i`m in auth')
        if(!req.cookies.token){
            return res.status(401).send({error: 'User not found.'}).end();
        }
        const token = req.cookies.token;
        
        const decoded = jwt.verify(token, 'thisismynewcourse')
        
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})  

        if (!user){
            console.log('User not found.')
            return res.status(401).send({error: 'User not found.'}).end();
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e){
        res.status(401).send({message: e.message})
    }
}

module.exports = auth