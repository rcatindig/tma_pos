var db = require('../dbconnection'); //reference of dbconnection.js

var Client = {

    getAllClients: function (callback) {

        return db.query("SELECT * FROM clients", callback);

    },
    getClientById: function (id, callback) {

        return db.query("SELECT * FROM clients WHERE id = ?", [id], callback);
    },
    addClient: function (Client, callback) {
        let sql = `
            INSERT INTO clients 
                (name, address, country_id, state_id, email, tel_no, status, date_created, date_modified)
            VALUES (?,?,?,?,?,?,?,?,?)
        `;

        let parameters = [
            Client.name,
            Client.country_id,
            Client.state_id,
            Client.email,
            Client.tel_no,
            Client.status,
            Client.status,
            Client.date_created,
            Client.date_modified
        ];


        return db.query(sql, parameters);
    },
    deleteClient: function (id, callback) {
        return db.query("DELETE FROM clients WHERE id=?", [id], callback);
    },
    updateClient: function (id, Client, callback) {

        let sql = `
            UPDATE clients SET
                name = ?, address = ?, country_id = ?, state_id = ?, email = ?, tel_no = ?, status = ?, date_modified = ?
            WHERE id = ?
        `;

        let parameters = [
            Client.name,
            Client.address,
            Client.country_id,
            Client.state_id,
            Client.email,
            Client.tel_no,
            Client.status,
            Client.date_modified,
            Client.id
        ];

        console.log(sql, parameters);
        return db.query(sql, parameters, callback);
    },
    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getClientList: function(ReactTable, callback)
    {
        console.log("MODEL", ReactTable);
        const { pageSize, page, sorted, filtered } = ReactTable;
        let totalTransactions  = 0;


        let whereClause = "";
        let orderBy = "";

        for(let i = 0; i < filtered.length; i++)
        {
            let filter = filtered[i];
            var column = filter.id;
            var value = filter.value;

            if(column == "c.date_created" || column == "c.date_modified")
                column = "DATE_FORMAT(" + column + ", '%M %d, %Y %r ')";

            if(column == "c.status")
                column = "IF(" + column + " > 0, 'Inactive', 'Active' )"

            whereClause = whereClause + " AND " + column + " LIKE '%" + value + "%' ";
        }

        if(sorted.length > 0)
        {

            orderBy = " ORDER BY ";
            for(let i = 0; i < sorted.length; i++)
            {
                let sort = sorted[i];
                var column = sort.id;
                var desc = sort.desc;
                var ascDesc = "ASC";

                if(desc)
                {
                    ascDesc = "DESC";
                }

                if(i > 0)
                {
                    orderBy = orderBy + ", ";
                }

                orderBy = orderBy + column + " " + ascDesc;
                
            }
        }
        

        const sql = `
                SELECT c.*, pc.name as country, ps.name as state
                FROM clients c
                LEFT JOIN param_countries pc
                ON c.country_id = pc.id
                LEFT JOIN param_states ps
                ON c.state_id = ps.id
                WHERE 1=1
                ${whereClause}
                ${orderBy}
                LIMIT ${page * pageSize},${pageSize}
            `;

        console.log(sql);

        return db.query(sql, callback);


    },

    // USE FOR REACT TABLE
    countTotalClients: function(ReactTable, callback)
    {
       return db.query("SELECT COUNT(*) as total  FROM clients", callback);
    },

};
module.exports = Client;