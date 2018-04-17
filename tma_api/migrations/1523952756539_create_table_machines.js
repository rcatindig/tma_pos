module.exports = {
    "up": "CREATE TABLE `machines`( `machine_id` varchar(99) NOT NULL, `serial_no` varchar(99) DEFAULT NULL, `client_code` varchar(99) DEFAULT NULL, PRIMARY KEY (`machine_id`), KEY `machine_client_code_idx` (`client_code`), CONSTRAINT `machine_client_code` FOREIGN KEY (`client_code`) REFERENCES `clients` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8; ",
    "down": "DROP TABLE `machines`"
}