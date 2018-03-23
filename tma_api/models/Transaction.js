var db = require('../dbconnection'); //reference of dbconnection.js

var Transaction = {

    getAllTransactions: function (callback) {

        return db.query("SELECT * FROM transactions", callback);

    },
    getTransactionById: function (id, callback) {

        return db.query("SELECT * FROM transactions where id=?", [id], callback);
    },
    getTransactions: function(ReactTable, callback)
    {
        const { pageSize, page, sorted, filtered } = ReactTable;
        let totalTransactions  = 0;

        const sql = `
                SELECT * FROM transactions
                WHERE 1=1
                LIMIT ${page},${pageSize}
            `;

        return db.query(sql, callback);


    },
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