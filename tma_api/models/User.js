var db = require('../dbconnection'); //reference of dbconnection.js

var User = {

    getAllUsers: function (callback) {

        return db.query("Select * from users", callback);

    },
    getUserById: function (id, callback) {

        return db.query("select * from users where Id=?", [id], callback);
    },
    addUser: function (User, callback) {
        return db.query("Insert into users (username, password, active, isdeleted) values(?,?,?)", [User.username, User.password, User.active, User.isdeleted], callback);
    },
    deleteUser: function (id, callback) {
        return db.query("delete from users where id=?", [id], callback);
    },
    updateUser: function (id, User, callback) {
        return db.query("update users set username=?,password=?, active=?, isdeleted=? where id=?", [User.username, User.password, User.active, User.isdeleted, User.id], callback);
    }

};
module.exports = User;