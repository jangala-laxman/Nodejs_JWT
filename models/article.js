const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'user'
    }
})

module.exports = mongoose.model("Article", articleSchema)

