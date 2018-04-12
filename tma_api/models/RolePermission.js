var mysql = require('mysql');
var db = require('../dbconnection'); //reference of dbconnection.js

var RolePermission = {

    getAllRolePermissions: function (callback) {

        return db.query("Select * from role_permissions", callback);

    },
    getRolePermissionsByCountryId: function (id, callback) {
        return db.query("SELECT * FROM role_permissions WHERE country_id = ?", [id], callback)
    },
    getRolePermissionById: function (id, callback) {

        return db.query("select * from role_permissions where id=?", [id], callback);
    },
    addRolePermission: function (RolePermission, callback) {
        return db.query("Insert into role_permissions (username, password, active, isdeleted) values(?,?,?)", [RolePermission.username, RolePermission.password, RolePermission.active, RolePermission.isdeleted], callback);
    },
    deleteRolePermission: function (id, callback) {
        return db.query("delete from role_permissions where id=?", [id], callback);
    },
    updateRolePermission: function (id, RolePermission, callback) {
        return db.query("update role_permissions set username=?,password=?, active=?, isdeleted=? where id=?", [RolePermission.username, RolePermission.password, RolePermission.active, RolePermission.isdeleted, RolePermission.id], callback);
    },
    getRolePermissionByRoleId: function (id, callback) {
        const sql = `SELECT * FROM role_permissions WHERE role_id = ?`;

        return db.query(sql, [id], callback);
    },
    saveRolePermissions: function (RolePermission, callback) {

        let roleId = RolePermission.role_id;
        let accessData = RolePermission.access_data;
        console.log("ACCESSDATA", accessData);

        var accessDataArray = [];

        for(let i = 0; i < accessData.length; i++)
        {
            var aData = accessData[i];
            var data = [roleId, aData.module_id, aData.access_type];
            accessDataArray.push(data);
        }

        db.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            // delete all role permission by role_id
            db.query('DELETE FROM role_permissions WHERE role_id =  ?', [roleId], function (err, result) {
                if (err) {
                    db.rollback(function () {
                        throw err;
                    });
                }
                // insert data
                console.log("DATA ARRAY", accessDataArray);
                db.query('INSERT INTO role_permissions (role_id, module_id, access_type) VALUES ?', [accessDataArray], function (err, result) {
                    
                    if (err) {
                        db.rollback(function () {
                            throw err;
                        });
                    }
                    db.commit(function (err, result) {
                        if (err) {
                            db.rollback(function () {
                                throw err;
                            });
                        }
                        callback(null, result);
                    });
                })
            })


        })
    }

};
module.exports = RolePermission;