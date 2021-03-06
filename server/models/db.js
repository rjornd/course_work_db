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

    mysqldb.appendLogs = (log) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('INSERT logs(subjtype, subjid, act, objtype, objid, time) VALUES(?,?,?,?,?,?)', [
                log.subjtype,
                log.subjid,
                log.act,
                log.objtype,
                log.objid,
                new Date().toISOString().slice(0, 19).replace('T', ' ')
            ],(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

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
            pool.query('INSERT INTO watchmans(first_name, last_name, login, password) values (?,?,?,?)', 
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
            pool.query('SELECT * FROM watchmans WHERE login = ?', [login],
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
            pool.query('SELECT * FROM employees', (err, rows, fields) => {
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

    mysqldb.takeKey = (emplid, keyid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE `keys` SET employeeid = NULL WHERE keyid = ?', [keyid] ,(err, rows, fields) => {
                if (err) {
                    
                    return reject(err)
                }
                
                return resolve(rows);
            })
        })
    }
    
    mysqldb.addAvCabinet = (emplid, cabinet) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO accesslist(emplid, cabinet) VALUES (?, ?)', [emplid, cabinet] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.removeAvCabinet = (id) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM `accesslist` WHERE id = ?', [id] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.keysForThisCab = (cabinet) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM `keys` WHERE cabinet = ?', [cabinet] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.allKeys = () =>
    {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from `keys`', (err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.giveKey = (employeeid, keyid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE `keys` SET employeeid = ? WHERE keyid = ?', [employeeid, keyid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                
               
                return resolve(rows);
            })
        })
    }

    mysqldb.removeKey = (keyid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM `keys` WHERE keyid = ?', [keyid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.addKey = (cabinet) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('INSERT `keys`(cabinet) VALUES (?)', [cabinet] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.getLogs = () =>
    {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM `logs`' ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.addNewEmployee = (empl) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('INSERT employees(first_name, last_name) VALUES(?,?)', [empl.first_name, empl.last_name] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }
    mysqldb.delEmployee = (emplid) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM employees WHERE emplid = ?', [emplid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    mysqldb.updateEmployee = (employee) =>
    {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE employees SET first_name = ?, last_name = ? WHERE emplid = ?',
             [employee.first_name,
                 employee.last_name,
                  employee.emplid] ,(err, rows, fields) => {
                if (err) {
                    return reject(err)
                }
                return resolve(rows);
            })
        })
    }

    
        
module.exports = mysqldb