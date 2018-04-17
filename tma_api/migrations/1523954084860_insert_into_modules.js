module.exports = {
    "up": "INSERT INTO `modules` VALUES ('BRP','Backend Report'),('CLT','Clients'),('DBD','Dashboard'),('ROL','Roles'),('TXN','Transactions'),('USR','Users');",
    "down": "TRUNCATE `modules`"
}