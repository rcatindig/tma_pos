var db = require('../dbconnection'); //reference of dbconnection.js

var Transaction = {

    getAllTransactions: function (callback) {

        return db.query("SELECT * FROM transactions", callback);

    },
    getTransactionById: function (id, callback) {

        return db.query("SELECT * FROM transactions where id=?", [id], callback);
    },

    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getTransactions: function(ReactTable, callback)
    {
        
        const { pageSize, page, sorted, filtered } = ReactTable;
        let totalTransactions  = 0;


        let whereClause = "";
        let orderBy = "";

        for(let i = 0; i < filtered.length; i++)
        {
            let filter = filtered[i];
            var column = filter.id;
            var value = filter.value;

            if(column == "txndate" || column == "entrydatetime" || column == "exitdatetime")
                column = "DATE_FORMAT(" + column + ", '%M %d, %Y %r ')";

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
                SELECT * FROM transactions
                WHERE 1=1
                ${whereClause}
                ${orderBy}
                LIMIT ${page * pageSize},${pageSize}
            `;

        
       

        return db.query(sql, callback);


    },

    // USE FOR REACT TABLE
    countTotalTransactions: function(ReactTable, callback)
    {
       return db.query("SELECT COUNT(*) as total  FROM transactions", callback);
    },


    addTransaction: function (Transaction, callback) {

        const sql = `
            INSERT INTO transactions
                (company, 
                txndate,
                epan,
                licplate, 
                userid, 
                machineid, 
                serialno, 
                uniquetxnno,
                receiptno,
                entrydatetime,
                exitdatetime,
                duration,
                tariff,
                totalamount,
                acceptedtotal,
                nettotal,
                vat)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;

        const { company, 
            txndate,
            epan,
            licplate, 
            userid, 
            machineid, 
            serialno, 
            uniquetxnno,
            receiptno,
            entrydatetime,
            exitdatetime,
            duration,
            tariff,
            totalamount,
            acceptedtotal,
            nettotal,
            vat } = Transaction;

        const parameters = [
            company, 
            txndate,
            epan,
            licplate, 
            userid, 
            machineid, 
            serialno, 
            uniquetxnno,
            receiptno,
            entrydatetime,
            exitdatetime,
            duration,
            tariff,
            totalamount,
            acceptedtotal,
            nettotal,
            vat
        ]

        return db.query(sql, parameters);
    },
    deleteTransaction: function (id, callback) {
        return db.query("DELETE FROM transactions where id=?", [id], callback);
    },
    updateTransaction: function (id, Transaction, callback) {

        const sql = `
            UPDATE transactions SET 
                company = ?, 
                txndate = ?,
                epan = ?,
                licplate = ?, 
                userid = ?, 
                machineid = ?, 
                serialno = ?, 
                uniquetxnno = ?,
                receiptno = ?,
                entrydatetime = ?,
                exitdatetime = ?,
                duration = ?,
                tariff = ?,
                totalamount = ?,
                acceptedtotal = ?,
                nettotal = ?,
                vat = ?
                WHERE id = ?
        `;

        const { company, 
            txndate,
            epan,
            licplate, 
            userid, 
            machineid, 
            serialno, 
            uniquetxnno,
            receiptno,
            entrydatetime,
            exitdatetime,
            duration,
            tariff,
            totalamount,
            acceptedtotal,
            nettotal,
            vat
        } = Transaction;

        const parameters = [
            company, 
            txndate,
            epan,
            licplate, 
            userid, 
            machineid, 
            serialno, 
            uniquetxnno,
            receiptno,
            entrydatetime,
            exitdatetime,
            duration,
            tariff,
            totalamount,
            acceptedtotal,
            nettotal,
            vat,
            id
        ];

        return db.query(sql, parameters, callback);
    }

};
module.exports = Transaction;