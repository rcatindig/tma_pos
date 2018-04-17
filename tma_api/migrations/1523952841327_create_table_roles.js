module.exports = {
    "up": "CREATE TABLE `roles`( `id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(45) NOT NULL, `client_id` int(11) DEFAULT NULL, `date_created` datetime DEFAULT NULL, `date_modified` datetime DEFAULT NULL, PRIMARY KEY (`id`), KEY `role_client_id_idx` (`client_id`), CONSTRAINT `role_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=latin1; ",
    "down": "DROP TABLE `roles`"
}