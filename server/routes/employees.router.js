const Router = require('express');
const router = new Router()
const mysqldb = require('../models/db');
const authMiddleware = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator');

router.get('/employees', authMiddleware,
async (req, res) => {
    try{
        
        let employees = await mysqldb.employees();
        res.json(employees)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/cabs', authMiddleware,
async (req, res) => {
    try{
        
        let cabs = await mysqldb.getCabs(req.body.employee.emplid);
        res.json(cabs)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/keys', authMiddleware,
async (req, res) => {
    try{
        
        let keys = await mysqldb.getKeys(req.body.employee.emplid);
        res.json(keys)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/addAvCabinet', authMiddleware, [
    check('cabinet', 'Uncorrect cabinet').isInt(),
],
async (req, res) => {
    try{
        const {cabinet} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Uncorrect cabinet", errors})
        }
        let answer = await mysqldb.addAvCabinet(req.body.employee.emplid, req.body.cabinet);
        let cabs = await mysqldb.getCabs(req.body.employee.emplid);
        res.json(cabs)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/removeAvCabinet', authMiddleware, 
async (req, res) => {
    try{
        let answer = await mysqldb.removeAvCabinet(req.body.id);
        let cabs = await mysqldb.getCabs(req.body.employee.emplid);
        res.json(cabs)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/takeKey', authMiddleware, 
async (req, res) => {
    try{
        let answer = await mysqldb.takeKey(req.body.employee.emplid, req.body.keyid)
        let keys = await mysqldb.getKeys(req.body.employee.emplid)
        await mysqldb.appendLogs({
            subjtype: "Сотрудник", 
            subjid: req.body.employee.emplid,
            act: "Сдал",
            objtype: "Ключ",
            objid: req.body.keyid
        })
        res.json(keys)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/keysForThisCab', authMiddleware, 
async (req, res) => {
    try{
        let keys = await mysqldb.keysForThisCab(req.body.cabinet)
        res.json(keys)
    } catch(e) 
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/giveKey', authMiddleware, 
async (req, res) => {
    try{
        console.log(req.body)
        let answer = await mysqldb.giveKey(req.body.employeeid, req.body.keyid)
        await mysqldb.appendLogs({
            subjtype: "Сотрудник", 
            subjid: req.body.employeeid, 
            act: "Взял", 
            objtype: "Ключ",
            objid: req.body.keyid
        })
        res.json({message: "success"})
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.get('/allKeys', authMiddleware, 
async (req, res) => {
    try{
        let keys = await mysqldb.allKeys()
        res.json(keys)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/removeKey', authMiddleware, 
async (req, res) => {
    try{
        let ans = await mysqldb.removeKey(req.body.keyid)
        let keys = await mysqldb.allKeys()
        res.json(keys)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/addKey', authMiddleware, 
async (req, res) => {
    try{
        let ans = await mysqldb.addKey(req.body.cabinet)
        let keys = await mysqldb.allKeys()
        res.json(keys)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.get('/getLogs', authMiddleware, 
async (req, res) => {
    try{
        let logs = await mysqldb.getLogs()
        res.json(logs)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/addNewEmployee', authMiddleware, 
async (req, res) => {
    try{
        let ans = await mysqldb.addNewEmployee(req.body)
        let employees = await mysqldb.employees();
        await mysqldb.appendLogs({
            subjtype: "Вахтёр", 
            subjid: req.user.id,
            act: "Добавил",
            objtype: "Сотрудника",
            objid: ans.insertId
        })
        res.json(employees)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/delEmployee', authMiddleware, 
async (req, res) => {
    try{
        let ans = await mysqldb.delEmployee(req.body.emplid)
        let employees = await mysqldb.employees();
        console.log(ans)
        await mysqldb.appendLogs({
            subjtype: "Вахтёр", 
            subjid: req.user.id,
            act: "Удалил",
            objtype: "Сотрудника",
            objid: 0
        })
        res.json(employees)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

router.post('/updateEmployee', authMiddleware, 
async (req, res) => {
    try{
        console.log(req.body)
        let ans = await mysqldb.updateEmployee(req.body.employee)
        let employees = await mysqldb.employees();
        res.json(employees)
    } catch(e)
    {
        console.log(e)
        res.send({message: e?.sqlMessage})
        res.sendStatus(500);
    }
})

module.exports = router