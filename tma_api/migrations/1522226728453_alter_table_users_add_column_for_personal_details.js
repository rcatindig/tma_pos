module.exports = {
    "up": "ALTER TABLE `users` ADD COLUMN `first_name` VARCHAR(99) NULL AFTER `id`, ADD COLUMN `middle_name` VARCHAR(99) NULL AFTER `first_name`, ADD COLUMN `surname` VARCHAR(99) NULL AFTER `middle_name`, ADD COLUMN `extension` VARCHAR(10) NULL AFTER `surname`; ",
    "down": "ALTER TABLE `users` DROP COLUMN `first_name`, DROP COLUMN `middle_name`, DROP COLUMN `surname`, DROP COLUMN `extension`;"
}