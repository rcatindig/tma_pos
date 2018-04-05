var db = require('../dbconnection'); //reference of dbconnection.js

var Machine = {

    getAllMachines: function (callback) {

        return db.query("SELECT * FROM machines", callback);

    },
    getMachineById: function (id, callback) {

        return db.query("SELECT * FROM machines where machine_id=?", [id], callback);
    },
};
module.exports = Machine;