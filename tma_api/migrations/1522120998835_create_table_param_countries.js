module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS `param_countries`( `id` char(2) NOT NULL, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    "down": "DROP TABLE `param_countries`"
}