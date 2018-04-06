var pdf             = require('html-pdf'),
    BackendReport   = require('../../models/BackendReport'),
    Client          = require('../../models/Client'),
    Machine         = require('../../models/Machine'); 
    moment          = require('moment');



var BackendReportsMW = {

    getClientDetails: function(req, res, next)
    {
        var param = req.body;
        console.log(param);
        var clientId = param.client_id;
        Client.getClientById(clientId, function (err, rows){
            if(err) res.json(err);
            else {
                if(rows.length > 0)
                {
                    var client = rows[0];
                    req.client = client;

                    next();
                } else {
                    res.status(400).send("Client cannot be found.");
                }
            }
        })
    },

    getMachineDetails: function(req, res, next)
    {   
        var param = req.body;
        var machineId = param.machine_id;
        Machine.getMachineById(machineId, function (err, rows) {
            if(err) res.json(err);
            else {
                if(rows.length > 0)
                {
                    var machine = rows[0];
                    req.machine = machine;

                    next();
                } else {
                    res.status(400).send("Machine cannot be found");
                }
            }
        })
    },

    getBackendReport: function(req, res, next)
    {
        BackendReport.getBackendReport(req.body, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                req.BackendReports = rows;
                next();
            }
        });
    },

    generateBackendReport: function(req, res, next)
    {
        var backendReports = req.BackendReports;
        var param = req.body;
        var fromDate = param.fromDate;
        var toDate = param.toDate;

        var clientDetails = req.client;


        let name = clientDetails.name;
        let address = clientDetails.address;
        let tin =  clientDetails.tin;
        let permitno = clientDetails.permit_no;

        var machineDetails = req.machine;

        let machineid = machineDetails.machine_id;
        let serialno = machineDetails.serial_no; 

        var html = `<html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial;
                                }
                                table {
                                    width: 100%;
                                    border-collapse: collapse;
                                }
                                .br-header {
                                    background-color: #a8a8ff;
                                }

                                tbody.br-tbody tr:nth-child(odd){
                                    background-color: #dcdcff;
                                    color: #000;
                                }

                                thead > tr > th {
                                    padding-top: 3px;
                                    padding-bottom: 3px;
                                }

                                tbody.br-tbody > tr > td {
                                    padding-top: 3px;
                                    padding-bottom: 3px;
                                }
                                

                                tfoot {
                                    border-top: 2px solid black !important;
                                }
                                tfoot > tr > td {
                                    padding-top: 7px;
                                }

                            </style>
                        </head>
                        <body> `;

        // upper document
        html += `
            <table>
                <tr>
                    <td>${name}</td>
                    <td style="text-align: right">BIR-Permit:  ${permitno}</td>
                </tr>

                <tr>
                    <td>${address}</td>
                    <td style="text-align: right">MACHINE ID: ${machineid}</td>
                </tr>
                <tr>
                    <td>TIN: ${tin}</td>
                    <td style="text-align: right">S/N: ${serialno}</td>
                </tr>
            </table>
        `;

        html += `<h3 style="text-align: center">Backend Report</h3>`
        
        html += `
                <div style="margin-bottom: 12px; margin-top: 12px;">
                    <span>Date: ${moment(fromDate).format("DD.MM.YYYY")} - ${moment(toDate).format("DD.MM.YYYY")}</span>
                </div>
            `;

        if(backendReports.length > 0)
        {    
        
            // data

            html += `<table class="br-table">`;

            // table header

            html += `
                    <thead>
                        <tr class="br-header">
                            <th>Date</th>
                            <th>Total Revenue</th>
                            <th>Total Cash</th>
                            <th>Total Credit Card</th>
                            <th>Total VAT</th>
                            <th>Total VAT Exempt</th>
                            <th>Total Senior Citizen</th>
                            <th>Zero Rated Sales</th>
                            <th>Additional Discounts</th>
                            <th>Void Sales</th>
                        </tr>
                    </thead>
                    <tbody class="br-tbody">
                `;

            var sumTotalRevenue = 0;
            var sumTotalCash = 0;
            var sumTotalCreditCard = 0;
            var sumTotalVat = 0;
            var sumTotalVatExempt = 0;
            var sumZeroRatedSales = 0;
            var sumTotalSeniorCitizen = 0;
            var sumAdditionalDiscounts = 0;
            var sumVoidSales = 0;



            for(let i = 0; backendReports.length > i; i++)
            {
                var report = backendReports[i];
                var date = report.date;
                var totalRevenue = report.total_revenue;
                var totalCash = report.total_cash;
                var totalCreditCard = report.total_credit_card;
                var totalVat = report.total_vat;
                var totalVatExempt = report.total_vat_exempt;
                var zeroRatedSales = report.zero_rated_sales;
                var totalSeniorCitizen = report.total_senior_citizen;
                var additionalDiscounts = report.additional_discounts;
                var voidSales = report.void_sales;

                sumTotalRevenue += totalRevenue;
                sumTotalCash += totalCash;
                sumTotalCreditCard += totalCreditCard;
                sumTotalVat += totalVat;
                sumTotalVatExempt += totalVatExempt;
                sumZeroRatedSales += zeroRatedSales;
                sumTotalSeniorCitizen += totalSeniorCitizen;
                sumAdditionalDiscounts += additionalDiscounts;
                sumVoidSales += voidSales;


                html += `
                    <tr >
                        <td>${moment(date).format('DD/MM/YYYY')}</td>
                        <td>${totalRevenue}</td>
                        <td>${totalCash}</td>
                        <td>${totalCreditCard}</td>
                        <td>${totalVat}</td>
                        <td>${totalVatExempt}</td>
                        <td>${zeroRatedSales}</td>
                        <td>${totalSeniorCitizen}</td>
                        <td>${additionalDiscounts}</td>
                        <td>${voidSales}</td>
                    </tr>
                `;


            }

            html += `
                <tfoot>
                    <tr>
                        <td>Total:</td>
                        <td>${sumTotalRevenue}</td>
                        <td>${sumTotalCash}</td>
                        <td>${sumTotalCreditCard}</td>
                        <td>${sumTotalVat}</td>
                        <td>${sumTotalVatExempt}</td>
                        <td>${sumZeroRatedSales}</td>
                        <td>${sumTotalSeniorCitizen}</td>
                        <td>${sumAdditionalDiscounts}</td>
                        <td>${sumVoidSales}</td>
                    <tr>
                </tfoot>
            `;

            html += `</tbody></table>`;

            html += `</body>`;

            
            
            
            
        } else {
            html += `<div style="text-align: center;">NO DATA AVAILABLE</div>`;
        }

        //var html  = "<div>Hello</div>";
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hour = date.getHours();
        var seconds = date.getSeconds();

        var fileName = "BackendReport" + year + "" + month + "" + day + "" + hour + "" + seconds + ".pdf";
        var options = { format: 'Legal', 
                        orientation: 'landscape',
                        border: {
                            "top": "0.5in",            // default is 0, units: mm, cm, in, px
                            "right": "0.5in",
                            "bottom": "0.5in",
                            "left": "0.5in"},
                        directory: "./tmp"
                    };

        var protocol = req.protocol;
        var host = req.get("host");;

        pdf.create(html, options).toFile('./uploads/reports/backendreport/'+  year + '/' + month + '/' + fileName, function(err, res) {
            if (err) res.json(err);
            
            if(res.filename !== "")
            {
                req.fileName = res.filename;
            }
           
            next();
        });
    },

    
}


module.exports = BackendReportsMW;