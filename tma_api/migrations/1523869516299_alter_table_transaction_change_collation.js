module.exports = {
    "up": "ALTER TABLE `transactions` CHANGE COLUMN `client_code` `client_code` VARCHAR(99) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL ;",
    "down": ""
}