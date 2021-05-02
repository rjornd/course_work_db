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

    mysqldb.findOne = (login) => {
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
        
module.exports = mysqldb