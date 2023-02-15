const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log(req.cookies);
        if(!req.cookies.token){
            return res.status(302).header('Location', '/login').end();
        }
        const token = req.cookies.token;
        
        const decoded = jwt.verify(token, 'thisismynewcourse')
        
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})  

        if (!user){
            console.log('User not found.')
            return res.status(302).header('Location', '/login').end();
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e){
        res.status(401).send({message: e.message})
    }
}

module.exports = auth