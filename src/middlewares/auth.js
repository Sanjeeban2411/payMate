const User = require('../mongo/models/users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
        const token  = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,"secretcode")
        const user = await User.findOne({_id : decoded._id})
        console.log(decoded)
        console.log(user)
        req.user = user
        req.token = token
        next()
    }
    catch(err){
        res.status(401).send({error:"Please Authenticate"})
    }
}

module.exports = auth