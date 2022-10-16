const express = require('express')
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const axios = require('axios')
var request = require("request");

const router = express.Router()

clientID = '8221a79338f447f9b8dcd8d34e80481d'
clientSecret = 'fba856dde2034610836b2b244ab26981'

var options = {
    method: 'POST',
    url: 'https://oauth.fatsecret.com/connect/token',
    method: 'POST',
    auth: {
        user: clientID,
        password: clientSecret
    },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        'grant_type': 'client_credentials',
        'scope': 'basic'
    },
    json: true
};

router.get('/', async (req, res) => {
    let result = await User.find()
    res.status(200).json(result)
})

router.post('/', async (req, res) => {
    let token
    request(options, async function (error, response, body) {
        if (error) throw new Error(error);
    
        // console.log(body.access_token);
        token = body.scope
        console.log(body)
    });
    req.session.token = token
    // const { username, email, password } = req.body
    // const signupAuth = await User.findOne({ email: email })
    // console.log(signupAuth)
    // if (signupAuth === null) {
    //     try {
    //         const hashedPassowrd = await bcrypt.hash(password, 10)
    //         let result = await User.create({ username, email, password: hashedPassowrd })
    //         res.status(200).json(result)
    //     } catch (err) {
    //         res.status(400).json({ error: err.message })
    //     }
    // } else {
    //     res.json({ msg: 'this email is already used' })
    // }
    res.json({msg:'haha'})
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    let result = await User.findOne({ email: email, password: password })
    
    // axios({
    //     url: 'https://platform.fatsecret.com/rest/server.api',
    //     method: 'post',
    //     responseType: 'json',
    //     header: {
    //         "Authorization": `Bearer ${req.session.token}`
    //     },
    //     params: {
    //         method: "foods.search",
    //         search_expression: "toast",
    //         format: "json"
    //     },
    // })
    // // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    if (result) {
        req.session.user = result
        req.session.uid = result._id
        console.log(req.session.uid + '  哈哈哈哈哈')
        // console.log(req.session.user)
        res.status(200).json({ msg: 'good' })
    } else {
        res.json({ msg: 'incorrect email or password' })
    }
})

router.get('/foodinfo/:id', (req, res) => {
    let id = req.params.id
    // let food = 
    res.status(200).json({ id: id })
})

router.get('/userinfo', async (req, res) => {
    let userInfo = await User.findById(req.session.uid)
    let uid = req.session.uid
    console.log(uid)
    console.log(req.session.token)
    // console.log(userInfo)
    res.json(userInfo)
})

router.post('/userinfo', async (req, res) => {
    let { age, sex, height, startweight, currentweight, goalweight, caloriegoal } = req.body
    let updatedUser = { age, sex, height, startweight, currentweight, goalweight, caloriegoal }
    let uid = req.session.uid
    console.log(uid)
    let result = await User.findByIdAndUpdate(uid, updatedUser, {new: true})
    res.json({ result: result, uid: uid })
})

router.get('/progress', (req, res) => {
    console.log('hahahha')
    res.json({msg: 'hello'})
})

router.get('/searchfood', (req, res) => {
    let uid = req.session.uid
    console.log(uid)
    console.log(req.session.user)
    res.json(uid)
})

router.post('/searchfood', (req, res) => {
    let uid = req.session.uid
    let meal = req.body.meal
    res.json({uid: uid, meal: meal})
})

module.exports = router