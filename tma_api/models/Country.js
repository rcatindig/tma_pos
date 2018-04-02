var db = require('../dbconnection'); //reference of dbconnection.js

var Country = {

    getAllCountries: function (callback) {

        return db.query("Select * from param_countries ORDER BY name ASC", callback);

    },
    getCountryById: function (id, callback) {

        return db.query("select * from param_countries where id=?", [id], callback);
    },
    addCountry: function (Country, callback) {
        return db.query("Insert into param_countries (username, password, active, isdeleted) values(?,?,?)", [Country.username, Country.password, Country.active, Country.isdeleted], callback);
    },
    deleteCountry: function (id, callback) {
        return db.query("delete from param_countries where id=?", [id], callback);
    },
    updateCountry: function (id, Country, callback) {
        return db.query("update param_countries set username=?,password=?, active=?, isdeleted=? where id=?", [Country.username, Country.password, Country.active, Country.isdeleted, Country.id], callback);
    }

};
module.exports = Country;