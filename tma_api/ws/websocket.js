var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var BackendReport = require('../models/BackendReport');
var Transaction = require('../models/Transaction');
var moment = require('moment');


module.exports = function(io) {
    io.of('/db/').on('connection', function(socket) {
        console.log('connected');
        socket.on('update_revenue', function(message) {
            
            if(message != "")
            {
                console.log('update');
                
                 BackendReport.getThisWeekRevenue(function(err, fields) {

                    console.log(fields);
                    
                    if (err)
                        console.log(err);
                    else
                        socket.broadcast.emit('this_week_revenue', fields[0].revenue);
                            
                });

                BackendReport.getLastWeekRevenue(function(err, fields) {
                    if(err) 
                        console.log(err)
                    else
                       socket.broadcast.emit('last_week_revenue', fields[0].revenue);
                })
            }
        });

        socket.on('update_transaction', function(message) {
            
            if(message != "")
            {
                console.log('update transaction');
                
                 Transaction.getThisWeekTransaction(function(err, fields) {

                    console.log(fields);
                    
                    if (err)
                        console.log(err);
                    else
                        socket.broadcast.emit('this_week_transaction', fields[0].total);
                            
                });

                Transaction.getLastWeekTransaction(function(err, fields) {
                    if(err) 
                        console.log(err)
                    else
                       socket.broadcast.emit('last_week_transaction', fields[0].total);
                })
            }
        });


        socket.on('join', function(data) {
            console.log(data);
            socket.emit('update_revenue', '1')
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            socket.disconnect();
        })
    });


    
}



