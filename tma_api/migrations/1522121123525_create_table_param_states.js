module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS `param_states`( `id` int(10) NOT NULL AUTO_INCREMENT, `country_id` char(2) DEFAULT NULL, `name` varchar(60) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    "down": "DROP TABLE `param_states`"
}