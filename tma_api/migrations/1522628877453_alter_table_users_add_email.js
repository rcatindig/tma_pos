module.exports = {
    "up": "ALTER TABLE `users` ADD COLUMN `email` VARCHAR(99) NULL AFTER `password`",
    "down": "ALTER TABLE `users` DROP COLUMN `email`;"
}