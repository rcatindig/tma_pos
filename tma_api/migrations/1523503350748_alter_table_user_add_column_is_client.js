module.exports = {
    "up": "ALTER TABLE `users` ADD COLUMN `is_client` TINYINT(3) NOT NULL AFTER `isdeleted`;",
    "down": "ALTER TABLE `users`DROP COLUMN `is_client`;"
}