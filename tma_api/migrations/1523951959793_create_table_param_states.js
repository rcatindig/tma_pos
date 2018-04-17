module.exports = {
    "up": "CREATE TABLE `param_states`( `id` int(10) NOT NULL AUTO_INCREMENT, `country_id` char(2) DEFAULT NULL, `name` varchar(60) DEFAULT NULL, PRIMARY KEY (`id`), KEY `states_country_idx` (`country_id`), CONSTRAINT `states_country` FOREIGN KEY (`country_id`) REFERENCES `param_countries` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    "down": "DROP TABLE `param_states`"
}