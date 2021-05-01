const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken")
const router = new Router()
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware')
const MySQL = require('mysql');
const mysqldb = require('../models/db');

router.post('/registration',
[
    check('nickname', 'Uncorrect nickname').isLength({min:3, max:12}),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
],
async (req, res) => {
    try{
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {nickname, password} = req.body;

        const candidate = await User.findOne({nickname})

        if (candidate){
            return res.status(400).json({message: `User with nickname ${nickname} already exists`})
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({nickname, password: hashPassword})
        await user.save()
        return res.json({message: `User ${nickname} was created`})

    } catch(e) {
        console.log(e)
        res.send({message: 'Server error'})
    }
})

router.post('/login',
async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {nickname, password} = req.body;
        
        const user = await User.findOne({nickname})
        
        if(!user) 
        {
            return res.status(400).json({message: "user not found :( "})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid)
        {
            return res.status(400).json({message: "invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                avatar: user.avatar
            }
        })
    } catch(e) 
    {
        console.log(e)
        res.send({message: 'Server error'})
    }
})

router.get('/auth', authMiddleware,
async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                avatar: user.avatar
            }
        })
    } catch(e) 
    {
        console.log(e)
        res.send({message: 'Server error'})
    }
})


router.get('/try',
async (req, res) => {
    try{
        console.log('tyt');
        let results = await mysqldb.all();
        res.json(results)
    } catch(e) 
    {
        console.log(e)
        res.send({message: 'Server error'})
        res.sendStatus(500);
    }
})

module.exports = router