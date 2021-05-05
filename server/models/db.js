    const mysql = require('mysql');
    var pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    port: '3306',
    user: 'root',
    password : 'password',
    database: 'bd1'
    });

    let mysqldb = {};

    mysqldb.all = (req) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from watchmans', (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
                });
        });
    };

    mysqldb.reg = (req) => {
        return new Promise((resolve, reject) => {
            pool.query('insert into watchmans(first_name, last_name, login, password) values (?,?,?,?)', 
            [   req.first_name,
                req.last_name,
                req.login,
                req.password    ],
                (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                    return resolve(rows);
                });
        });
    };

    mysqldb.findOne = (watchmanid) => {
        return new Promise((resolve, reject) => {
            pool.query('Select * from watchmans where watchmanid = ?', [watchmanid],
                (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                    return resolve(rows[0]);
                });
        });
    };

    mysqldb.findLogin = (login) => {
        return new Promise((resolve, reject) => {
            pool.query('Select * from watchmans where login = ?', [login],
                (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                    return resolve(rows[0]);
                });
        });
    };

    mysqldb.employees = () =>
    {
        return new Promise((resolve, reject) => {
            pool.query('select * from employees', (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.getCabs = (emplid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM accesslist WHERE emplid = ?', [emplid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.getKeys = (emplid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM bd1.keys WHERE employeeid = ?', [emplid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }
    

        
module.exports = mysqldb