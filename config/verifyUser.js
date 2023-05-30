const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_secret = "Laxman"

const verifytoken = (req,res, next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization']
    
    console.log(token)
    if(token){
        if(token.startsWith('Bearer')){
            token = token.slice(7, token.length)
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) return res.sendStatus(401).json({data:token, error:err.name, message:"Invalid token"})
            req.user = user
            next()
        })
    }else{
        return res.sendStatus(401).json({
            status:"401",
            data:token,
            error:"Unauthorized",
            message:'Auth token is not supplied'
        })
    }
}

module.exports = verifytoken 