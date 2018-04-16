var db = require('../dbconnection'); //reference of dbconnection.js

var User = {

    getAllUsers: function (callback) {

        return db.query("SELECT * FROM users", callback);

    },
    getUserById: function (id, callback) {

        return db.query("SELECT * FROM users where Id=?", [id], callback);
    },
    addUser: function (User, callback) {
        const sql = `
            INSERT INTO users 
                (   first_name,
                    middle_name,
                    surname,
                    extension,
                    username,
                    password,
                    email,
                    client_id,
                    address,
                    country_id,
                    state_id,
                    status,
                    isdeleted,
                    is_client,
                    role_id,
                    date_created, 
                    date_modified) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const parameters = [
            User.first_name,
            User.middle_name,
            User.surname,
            User.extension,
            User.username,
            User.password,
            User.email,
            User.client_id,
            User.address,
            User.country_id,
            User.state_id,
            User.status,
            0,
            User.is_client,
            User.is_client ? User.role_id : null,
            User.date_created,
            User.date_modified
        ];

        console.log(sql, parameters);

        db.query(sql, parameters, callback);
    },
    deleteUser: function (id, callback) {
        return db.query("DELETE FROM users where id=?", [id], callback);
    },
    updateUser: function (id, User, callback) {

        var pw = User.password;

        

        const sql = `UPDATE users 
                        SET
                            first_name = ?,
                            middle_name = ?,
                            surname = ?, 
                            extension = ?, 
                            username = ?, 
                            ${pw == null ? "": "password = ?,"} 
                            client_id = ?,
                            address = ?, 
                            country_id = ?, 
                            state_id = ?, 
                            status = ?, 
                            isdeleted = ?, 
                            is_client = ?,
                            role_id = ?,
                            date_modified = ?
                        WHERE id = ?
            `;

        var parameters = [
            User.first_name,
            User.middle_name,
            User.surname,
            User.extension,
            User.username,
            User.password,
            User.client_id,
            User.address,
            User.country_id,
            User.state_id,
            User.status,
            User.isdeleted,
            User.is_client,
            User.is_client ? User.role_id : null,
            User.date_modified,
            id
        ];

        if(pw == null)
        {
           parameters = [
                User.first_name,
                User.middle_name,
                User.surname,
                User.extension,
                User.username,
                User.client_id,
                User.address,
                User.country_id,
                User.state_id,
                User.status,
                User.isdeleted,
                User.is_client,
                User.is_client ? User.role_id : null,
                User.date_modified,
                id
            ];
        }

        console.log(sql, parameters);

        


        return db.query(sql, parameters, callback);
    },
    // USE FOR REACT TABLE
    countTotalUsers: function (clientId, ReactTable, callback) {
        
        let where = "";

        if(clientId !== null)
            where = " WHERE client_id = '" + clientId + "'";

        return db.query("SELECT COUNT(*) as total  FROM users" + where, callback);
    },
    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getUserList: function (clientId, ReactTable, callback) {

        const {
            pageSize,
            page,
            sorted,
            filtered
        } = ReactTable;
        let totalTransactions = 0;


        let whereClause = "";
        let orderBy = "";

        console.log(clientId);

        if (clientId !== null)
            whereClause =  whereClause + " AND u.client_id = '" + clientId + "'";

        for (let i = 0; i < filtered.length; i++) {
            let filter = filtered[i];
            var column = filter.id;
            var value = filter.value;

            if (column == "txndate" || column == "entrydatetime" || column == "exitdatetime")
                column = "DATE_FORMAT(" + column + ", '%M %d, %Y %r ')";

            if (column == "u.status")
                column = "IF(" + column + " > 0, 'Inactive', 'Active' )";

            if (column == "u.is_client")
                column = "IF(" + column + " < 1, 'Admin', 'Client' )"


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
                SELECT u.*, pc.name as country, ps.name as state, c.name as company FROM users u
                LEFT JOIN clients c
                ON u.client_id = c.id
                LEFT JOIN param_countries pc
                ON u.country_id = pc.id
                LEFT JOIN param_states ps
                ON u.state_id = ps.id
                WHERE 1=1
                ${whereClause}
                ${orderBy}
                LIMIT ${page * pageSize},${pageSize}
            `;

        return db.query(sql, callback);


    },

    getUserByUsername: function (User, done) {
        //const sql = `SELECT * FROM users WHERE username = ?`;

        db.query('SELECT * FROM users WHERE username = ? LIMIT 1', [User.username], function (err, rows, fields) {
            
            if (err) throw err;
            done(rows[0]);
        });

        // return db.query(sql, [username], callback);
    },
    insertUserTesting: function (User, callback) {
        const sql = `
            INSERT INTO users 
                ( username, password, email) 
            VALUES (?,?,?)
        `;

        const parameters = [
            User.username,
            User.password,
            User.email,
        ];

        db.query(sql, parameters, callback)
    },
};
module.exports = User;