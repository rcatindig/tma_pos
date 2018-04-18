module.exports = {
    "up": "ALTER TABLE `machines` CHANGE COLUMN `client_code` `client_code` VARCHAR(99) NOT NULL ;",
    "down": ""
}