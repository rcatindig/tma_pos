module.exports = {
    "up": "CREATE TABLE `access_types`( `id` varchar(10) NOT NULL, `name` varchar(45) DEFAULT NULL, PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1; ",
    "down": "DROP TABLE `access_types`"
}