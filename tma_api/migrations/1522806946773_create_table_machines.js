module.exports = {
    "up": "CREATE TABLE `machines`( `machine_id` VARCHAR(99) NULL, `serial_no` VARCHAR(99) NULL, `client_code` VARCHAR(99) NULL);",
    "down": "DROP TABLE `machines`"
}