const express = require('express')
const router = express.Router()
const verifytoken = require('./config/verifyUser')
const userControllers = require('./controllers/index')


router.post('/signup', userControllers.signUp )
router.post('/signin', userControllers.signIn)

router.post('/users/:userId/articles', verifytoken, userControllers.createArticles)
router.get('/articles', verifytoken, userControllers.fetchArticles)

router.post('/users/:userId', verifytoken, userControllers.updateUser)


module.exports = router