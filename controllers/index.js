const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Article = require('../models/article')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_secret = "Laxman"

const signUp =   async(req, res)=>{
    try{
        const user1 = await User.findOne({email:req.body.email})
        console.log(user1)
        if(user1 !== null){
            
            res.json({
                status:"403",
                data:{email:req.body.email},
                error:"email already exist",
                message:`user with ${req.body.email} already exists. Please login`
            })
        } else{
            const user = new User({
                name: req.body.name,
                age:req.body.age,
                email:req.body.email,
                password:req.body.password
            })           
    
            await user.save().then((err, registeruser)=>{
                if(err){
                    console.log(err)
                    res.json({
                        status:"403",
                        data:{email:req.body.email},
                        error:err,
                        message:err.message
                    })
                }else{
                    res.json({
                        status:"200",
                        data:registeruser,
                        message:"user created successfully",
                    })
                }
            })
           
        }
        
   }catch(err){
        console.log(err)
        res.json({
            status:"403",
            data:{email:req.body.email},
            error:err,
            message:err.message
        })
   }
    
}

const signIn =  async(req, res)=>{
    const user = await User.findOne({email:req.body.email})
    
    if(user){
        
        if(await user.validatePassword(req.body.password)){
            const token = jwt.sign({user: user._id, email:req.body.email}, process.env.JWT_SECRET_KEY, { expiresIn:60*1000})
            console.log(token)
            res.cookie("token", token, {maxAge:60*1000})
            res.json({
                status:"200",
                data:{user, token},
                message:`${req.body.email} logged in successfully`
            })
        }else{
            res.json({
                status:"401",
                data:{user},
                error:'Unauthorized',
                message:"username or password is invalid"
            })
        }
    }else{
        res.json({
            status:"400",
            data:{user},
            error:"Unauthorized",
            message:"username or password is invalid"
        })
    }
}


const createArticles = async(req, res)=>{
    const article = new Article({
        title:req.body.title,
        description:req.body.description,
        user:req.params.userId
    })
    
    try{
        await article.save()
        await User.findByIdAndUpdate({_id:req.params.userId}, {
            article:article
        });
        res.json({
            status:"200",
            data:{article},
            message:" created article successfully"
        })
    }catch(err){
        console.log(err)
        res.json({
            status:"403",
            data:{article},
            error:err.name,
            message:err.message
        })
    }   
}

const fetchArticles =  async(req,res)=>{
    const articles = await Article.find({})
    try{
        res.status(200).json({
            status:'200',
            data:{articles},
            message:"list of articles"
        })
    }catch(err){
        console.log(err)
        res.json({
            status:"403",
            data:{articles},
            error:err.name,
            message:err.message
        })
    }
}

const updateUser =  async(req, res)=>{
    
    const user = await User.findById({_id:req.params.userId})
    console.log(user)
    try{
        await user.updateOne({
            name:req.body.name,
            age:req.body.age
        })
        console.log(user)
        res.status(200).json({
            data:{user},
            message:`${user.name} updated data successfully`
        })
    }catch(err){
        console.log(err)
        res.json({
            status:"403",
            data:{user},
            error:err,
            message:err.message
        })
    }
}


module.exports = {signUp, signIn, createArticles, fetchArticles, updateUser}