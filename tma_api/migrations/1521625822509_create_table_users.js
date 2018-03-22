module.exports = {
    "up": "CREATE TABLE `users`( `id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(50) DEFAULT NULL, `password` varchar(150) DEFAULT NULL, `active` int(1) DEFAULT NULL, `isdeleted` int(1) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1; ",
    "down": "DROP TABLE `users`"
}
