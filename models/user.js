const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    article:[{
        type:mongoose.Schema.Types.ObjectID,
        ref:'article'
    }]
})


userSchema.pre('save', async ()=>{
    let user = this
    const hashedpassword = await hashpassword(user.password, 10)
    user.password = hashedpassword
})

async function hashpassword(password, salt){
    let newHash=""
    try{
         newHash = await bcrypt.hash(password, salt)
    }catch(err){
        console.log(err)
    }
    return newHash
}

userSchema.methods.validatePassword = function(inputPassword){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(inputPassword, this.password, (err, isMatch)=>{
            if(err){
                console.log(err)
                reject(err)
            }
            resolve(isMatch)
    
        })
    })
    
}

module.exports = mongoose.model("User", userSchema)

