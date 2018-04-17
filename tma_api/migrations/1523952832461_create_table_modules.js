module.exports = {
    "up": "CREATE TABLE `modules`( `id` varchar(45) NOT NULL, `name` varchar(99) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1; ",
    "down": "DROP TABLE `modules`"
}