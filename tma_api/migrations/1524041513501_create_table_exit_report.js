module.exports = {
    "up": "CREATE TABLE `exit_reports`( `date` date NOT NULL, `client_code` varchar(99) NOT NULL, `exit_id` varchar(99) CHARACTER SET big5 NOT NULL, `total` int(11) DEFAULT NULL, PRIMARY KEY (`date`,`client_code`,`exit_id`), KEY `exit_client_code_idx` (`client_code`), CONSTRAINT `exits_client_code` FOREIGN KEY (`client_code`) REFERENCES `clients` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8; ",
    "down": "DROP TABLE `exit_reports`"
}