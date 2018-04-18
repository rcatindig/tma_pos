var db = require('../dbconnection'); //reference of dbconnection.js

var Transaction = {

    getAllTransactions: function (callback) {

        return db.query("SELECT * FROM transactions", callback);

    },
    getTransactionById: function (id, callback) {

        return db.query("SELECT * FROM transactions where id=?", [id], callback);
    },

    // GETTING ALL TRANSACTIONS - USE IN THE THE TABLE ID
    getTransactions: function(clientId, ReactTable, callback)
    {
        
        const { pageSize, page, sorted, filtered } = ReactTable;
        let totalTransactions  = 0;


        let whereClause = "";
        let orderBy = "";

        if(clientId !== null)
            whereClause = whereClause + "AND c.id = '" + clientId + "'"; 

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
                SELECT t.*, c.name client FROM transactions t
                LEFT JOIN clients c
                ON t.client_code = c.code
                WHERE 1=1
                ${whereClause}
                ${orderBy}
                LIMIT ${page * pageSize},${pageSize}
            `;

        
       

        return db.query(sql, callback);


    },

    // USE FOR REACT TABLE
    countTotalTransactions: function(clientId, ReactTable, callback)
    {
        
        const sql = `
                SELECT COUNT(*) as total FROM transactions t
                LEFT JOIN clients c
                ON t.client_code = c.code
            `;
        let where = "";

        if(clientId !== null)
            where = " WHERE c.id = '" + clientId + "' "

        return db.query(sql + where, callback);
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
    },


    insertTransactionFromClient: function (Transaction, callback) {

        const client_code = Transaction.client_code;
        const serialno = Transaction.serialno;
        const machineid = Transaction.machineid;

        console.log("MACHINE ID", machineid);

            db.beginTransaction(function (err) {
                if (err)
                    throw err;
    
                
                    // check first if client is existing in the database using client_code
    
                    db.query('SELECT * FROM clients WHERE code = ? LIMIT 0,1', [client_code], function (err, result){
                        if (err){
                            db.rollback(function () {
                                throw err;
                            });
                        }
    
                        console.log(result);
    
                        if(result.length == 0){
    
                            console.log("HELLO");
                            db.rollback(function () {
                                callback({error: "Invalid. Client Code cannot be found"}, null);
                                //console.log("ROLLBACK");
                                //throw new Error("Invalid. Client Code cannot be found");
                            });
                        }
    
                        const client = result;
    
                        console.log("HELLLOOO @");
    
                        // check first if machine_id is existing in the database
                        db.query('SELECT * FROM machines WHERE machine_id = ?', [machineid], function(err, fields) {
    
                            if (err){
                                db.rollback(function () {
                                    throw err;
                                });
                            }
        
                            
                            if (fields.length == 0)
                            {
                                // if no, create machine with client_code and serial no
                                
                                const insertMachineSql = `INSERT INTO machines VALUES (?,?,?)`;
                                db.query(insertMachineSql, [machineid, serialno, client_code], function(err, result) {
                                    if(err) {
                                        db.rollback(function () {
                                            throw err;
                                        });
    
                                        return;
                                    }
    
                                });
                            }
    
                            const insertTxnSql = `INSERT INTO transactions (
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
                                                        client_code
                                                    ) VALUES (
                                                        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
                                                    )`;
    
                            const parameters = [
                                                Transaction.company, 
                                                Transaction.txndate, 
                                                Transaction.epan, 
                                                Transaction.licplate, 
                                                Transaction.userid, 
                                                Transaction.machineid, 
                                                Transaction.serialno, 
                                                Transaction.uniquetxnno, 
                                                Transaction.receiptno, 
                                                Transaction.entrydatetime, 
                                                Transaction.exitdatetime, 
                                                Transaction.duration, 
                                                Transaction.tariff, 
                                                Transaction.totalamount, 
                                                Transaction.acceptedtotal, 
                                                Transaction.nettotal, 
                                                Transaction.vat, 
                                                Transaction.client_code
                            ];
    
                            
    
                             // create transaction
    
                            db.query(insertTxnSql,parameters, function(err, result) {

                                console.log("ERRRORRRRR",err);
                                if(err) {
                                    db.rollback(function () {
                                        throw err;
                                    });
    
                                }
                                db.commit(function (err, count) {
                                    if (err) {
                                        console.log(err);
                                        db.rollback(function () {
                                            throw err;
                                        });
                                    } else
                                        callback(null, {success: "Successfully added!"});
                                });
                            });
    
                            
    
                        })
                    })
    
            })    
        

        

    
    }

};
module.exports = Transaction;