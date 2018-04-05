var db = require('../dbconnection'); //reference of dbconnection.js

var Machine = {

    getAllMachines: function (callback) {

        return db.query("SELECT * FROM machines", callback);

    },
    getMachineById: function (id, callback) {

        return db.query("SELECT * FROM machines where machine_id=?", [id], callback);
    },
    getMachinesByClientId: function(id, callback) {
        var sql = ` SELECT m.* 
                    FROM machines m
                    LEFT JOIN clients c
                    ON m.client_code = c.code
                    WHERE c.id = ?
             `;

        return db.query(sql, [id], callback)
    }
};
module.exports = Machine;