var db = require('../dbconnection'); //reference of dbconnection.js

var Role = {

    getAllRoles: function (callback) {

        return db.query("Select * from roles", callback);

    },
    getRolesByClientId: function (id, callback) {
        return db.query("SELECT * FROM roles WHERE client_id = ?", [id], callback )
    },
    getRoleById: function (id, callback) {

        return db.query("select * from roles where id=?", [id], callback);
    },
    addRole: function (Role, callback) {
        const sql = `
                INSERT INTO roles (client_id, name, date_created) values(?,?,?)
            `;
        
        const parameters = [
                Role.client_id,
                Role.name,
                Role.date
            ];
            
        return db.query(sql, parameters, callback);
    },
    deleteRole: function (id, callback) {
        return db.query("delete from roles where id=?", [id], callback);
    },
    updateRole: function (id, Role, callback) {
        const sql = `
                UPDATE 
                    roles 
                SET client_id = ?, name = ?, date_modified = ? 
                WHERE id=?
            `;

        const parameters = [
                Role.client_id,
                Role.name,
                Role.date,
                Role.id
            ];

        console.log(sql, parameters);
        return db.query(sql, parameters, callback);
    },
    // USE FOR REACT TABLE
    countTotalRoles: function (clientId, ReactTable, callback) {

        var where = "";

        if(clientId !== null)
            where += " WHERE client_id = '" + clientId + "'"

        return db.query("SELECT COUNT(*) as total  FROM roles", callback);
    },
    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getRoleList: function (clientId, ReactTable, callback) {

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

        if(clientId !== null)
            whereClause += "AND c.id = '" + clientId + "'"

        const sql = `
                SELECT r.* , c.name as client
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