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
    check('login', 'Uncorrect nickname').isLength({min:3, max:12}),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
],
async (req, res) => {
    try{
        console.log(req.body);
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {first_name, last_name, login, password} = req.body;

        const user = await mysqldb.findLogin(login)
        if (user?.watchmanid){
            return res.status(400).json({message: `User with login ${login} already exists`})
        }

        const hashPassword = await bcrypt.hash(password, 8)
        req.body.password = hashPassword;
        await mysqldb.reg(req.body)
        return res.json(req.body)

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
        const {login, password} = req.body;
        
        const user = await mysqldb.findLogin(login)
        if(!user?.watchmanid)
        {
            return res.status(400).json({message: "user not found :( "})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid)
        {
            return res.status(400).json({message: "invalid password"})
        }
        const token = jwt.sign({id: user.watchmanid}, config.get("secretKey"), {expiresIn: "1h"})
        await mysqldb.appendLogs({
            subjtype: "????????????", 
            subjid: user.watchmanid,
            act: "??????????",
            objtype: "?? ??????????????",
            objid: 0
        })
        return res.json({
            token,
            user : {
                watchmanid: user.watchmanid,
                first_name: user.first_name,
                last_name: user.last_name
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
        const user =  await mysqldb.findOne(req.user.id)
        const token = jwt.sign({id: user.watchmanid}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user: {
                watchmanid: user.watchmanid,
                first_name: user.first_name,
                last_name: user.last_name
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
        let results = await mysqldb.all(req);
        res.json(results)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

module.exports = router