var db = require('../dbconnection'); //reference of dbconnection.js

var Role = {

    getAllRoles: function (callback) {

        return db.query("Select * from roles", callback);

    },
    getRolesByCountryId: function (id, callback) {
        return db.query("SELECT * FROM roles WHERE country_id = ?", [id], callback )
    },
    getRoleById: function (id, callback) {

        return db.query("select * from roles where id=?", [id], callback);
    },
    addRole: function (Role, callback) {
        return db.query("Insert into roles (username, password, active, isdeleted) values(?,?,?)", [Role.username, Role.password, Role.active, Role.isdeleted], callback);
    },
    deleteRole: function (id, callback) {
        return db.query("delete from roles where id=?", [id], callback);
    },
    updateRole: function (id, Role, callback) {
        return db.query("update roles set username=?,password=?, active=?, isdeleted=? where id=?", [Role.username, Role.password, Role.active, Role.isdeleted, Role.id], callback);
    },
    // USE FOR REACT TABLE
    countTotalRoles: function (ReactTable, callback) {
        return db.query("SELECT COUNT(*) as total  FROM roles", callback);
    },
    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getRoleList: function (ReactTable, callback) {

        const {
            pageSize,
            page,
            sorted,
            filtered
        } = ReactTable;
        let totalTransactions = 0;


        let whereClause = "";
        let orderBy = "";

        for (let i = 0; i < filtered.length; i++) {
            let filter = filtered[i];
            var column = filter.id;
            var value = filter.value;


            whereClause = whereClause + " AND " + column + " LIKE '%" + value + "%' ";
        }

        if (sorted.length > 0) {

            orderBy = " ORDER BY ";
            for (let i = 0; i < sorted.length; i++) {
                let sort = sorted[i];
                var column = sort.id;
                var desc = sort.desc;
                var ascDesc = "ASC";

                if (desc) {
                    ascDesc = "DESC";
                }

                if (i > 0) {
                    orderBy = orderBy + ", ";
                }

                orderBy = orderBy + column + " " + ascDesc;

            }
        }


        const sql = `
                SELECT * 
                FROM roles r
                LEFT JOIN clients c
                ON r.client_id = c.id
                WHERE 1=1
                ${whereClause}
                ${orderBy}
                LIMIT ${page * pageSize},${pageSize}
            `;

        return db.query(sql, callback);


    },

};
module.exports = Role;