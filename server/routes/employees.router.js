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

module.exports = router