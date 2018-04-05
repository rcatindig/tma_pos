var db = require('../dbconnection'); //reference of dbconnection.js

var BackendReport = {

    getAllBackendReports: function (callback) {

        return db.query("SELECT * FROM backend_reports", callback);

    },
    getBackendReportById: function (id, callback) {

        return db.query("SELECT * FROM backend_reports where Id=?", [id], callback);
    },
    getBackendReport: function (BackendReport, callback) {
        const sql = `SELECT br.*, c.*
                        FROM backend_reports br
                    LEFT JOIN machines m
                        ON br.machine_id = m.machine_id
                    LEFT JOIN clients c
                        ON m.client_code = c.code
                    WHERE br.date >= ? AND br.date <= ? AND c.id = ?`;

        const parameters = [
            BackendReport.fromDate,
            BackendReport.toDate,
            BackendReport.client_id,
        ]


        return db.query(sql, parameters, callback);
    },
    addBackendReport: function (BackendReport, callback) {
        const sql = `
            INSERT INTO backend_reports 
                (   date,
                    machine_id,
                    serial_no,
                    total_revenue,
                    total_cash,
                    total_credit_card,
                    total_vat,
                    total_vat_exempt,
                    total_senior_citizen,
                    zero_rated_sales,
                    additional_discounts,
                    void_sales) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const parameters = [
            BackendReport.date,
            BackendReport.machine_id,
            BackendReport.serial_no,
            BackendReport.total_revenue,
            BackendReport.total_cash,
            BackendReport.total_credit_card,
            BackendReport.total_vat,
            BackendReport.total_vat_exempt,
            BackendReport.total_senior_citizen,
            BackendReport.zero_rated_sales,
            BackendReport.additional_discounts,
            BackendReport.void_sales
        ];

        console.log(sql, parameters);

        db.query(sql, parameters, callback);
    },
    deleteBackendReport: function (id, callback) {
        return db.query("DELETE FROM backend_reports where id=?", [id], callback);
    },
    updateBackendReport: function (id, BackendReport, callback) {

        const sql = `UPDATE backend_reports 
                        SET
                            date = ?,
                            machine_id = ?,
                            serial_no = ?,
                            total_revenue = ?,
                            total_cash = ?,
                            total_credit_card = ?,
                            total_vat = ?,
                            total_vat_exempt = ?,
                            total_senior_citizen  = ?,
                            zero_rated_sales = ?,
                            additional_discounts = ?,
                            void_sales  = ?
                        WHERE id = ?
            `;

        const parameters = [
            BackendReport.date,
            BackendReport.machine_id,
            BackendReport.serial_no,
            BackendReport.total_revenue,
            BackendReport.total_cash,
            BackendReport.total_credit_card,
            BackendReport.total_vat,
            BackendReport.total_vat_exempt,
            BackendReport.total_senior_citizen,
            BackendReport.zero_rated_sales,
            BackendReport.additional_discounts,
            BackendReport.void_sales,
            BackendReport.id
        ];

        console.log(sql);


        return db.query(sql, parameters, callback);
    },
    // USE FOR REACT TABLE
    countTotalBackendReports: function (ReactTable, callback) {
        return db.query("SELECT COUNT(*) as total  FROM backend_reports", callback);
    },
    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getBackendReportList: function (ReactTable, callback) {

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

            if (column == "txndate" || column == "entrydatetime" || column == "exitdatetime")
                column = "DATE_FORMAT(" + column + ", '%M %d, %Y %r ')";

            if (column == "c.status")
                column = "IF(" + column + " > 0, 'Inactive', 'Active' )";


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
                SELECT u.*, pc.name as country, ps.name as state, c.name as company FROM backend_reports u
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

    getBackendReportByBackendReportname: function (BackendReport, done) {
        //const sql = `SELECT * FROM backend_reports WHERE username = ?`;

        db.query('SELECT * FROM backend_reports WHERE username = ? LIMIT 1', [BackendReport.username], function (err, rows, fields) {
            if (err) throw err;
            done(rows[0]);
        });

        // return db.query(sql, [username], callback);
    },
    insertBackendReportTesting: function (BackendReport, callback) {
        const sql = `
            INSERT INTO backend_reports 
                ( username, password, email) 
            VALUES (?,?,?)
        `;

        const parameters = [
            BackendReport.username,
            BackendReport.password,
            BackendReport.email,
        ];

        db.query(sql, parameters, callback)
    },
};
module.exports = BackendReport;