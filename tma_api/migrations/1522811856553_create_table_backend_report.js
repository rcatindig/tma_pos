module.exports = {
    "up": "CREATE TABLE `backend_report`( `date` DATE NOT NULL, `machine_id` VARCHAR(99) NOT NULL, `serial_no` VARCHAR(99) NULL, `client_code` VARCHAR(99) NULL, `total_revenue` FLOAT NULL, `total_cash` FLOAT NULL, `total_credit_card` FLOAT NULL, `total_vat` FLOAT NULL, `total_vat_exempt` FLOAT NULL, `total_senior_citizen` FLOAT NULL, `zero_rated_sales` FLOAT NULL, `additional_discounts` FLOAT NULL, `void_sales` FLOAT NULL, PRIMARY KEY (`date`, `machine_id`));",
    "down": "DROP TABLE `backend_report`"
}