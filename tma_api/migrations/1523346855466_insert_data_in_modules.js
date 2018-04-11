module.exports = {
    "up": "INSERT INTO `modules` VALUES('DBD', 'Dashboard'), ('TXN', 'Transactions'), ('BRP', 'Backend Report'), ('CLT', 'Clients'), ('USR', 'Users'); ",
    "down": "DELETE FROM `modules` WHERE id = 'TXN' OR id = 'DBD' OR id = 'BRP' OR id = 'CLT'"
}