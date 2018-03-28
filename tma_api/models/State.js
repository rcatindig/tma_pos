var db = require('../dbconnection'); //reference of dbconnection.js

var State = {

    getAllStates: function (callback) {

        return db.query("Select * from param_states", callback);

    },
    getStatesByCountryId: function (id, callback) {
        return db.query("SELECT * FROM param_states WHERE country_id = ?", [id], callback )
    },
    getStateById: function (id, callback) {

        return db.query("select * from param_states where id=?", [id], callback);
    },
    addState: function (State, callback) {
        return db.query("Insert into param_states (username, password, active, isdeleted) values(?,?,?)", [State.username, State.password, State.active, State.isdeleted], callback);
    },
    deleteState: function (id, callback) {
        return db.query("delete from param_states where id=?", [id], callback);
    },
    updateState: function (id, State, callback) {
        return db.query("update param_states set username=?,password=?, active=?, isdeleted=? where id=?", [State.username, State.password, State.active, State.isdeleted, State.id], callback);
    },

};
module.exports = State;