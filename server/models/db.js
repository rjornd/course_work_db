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

    mysqldb.all = () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from watchmans', (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);           
                });
        });
    };
        
module.exports = mysqldb