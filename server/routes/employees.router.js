const Router = require('express');
const router = new Router()
const mysqldb = require('../models/db');
const authMiddleware = require('../middleware/auth.middleware')

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

module.exports = router