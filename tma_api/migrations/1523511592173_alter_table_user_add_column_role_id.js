module.exports = {
    "up": "ALTER TABLE `users` ADD COLUMN `role_id` INT NULL AFTER `is_client`, ADD INDEX `user_role_idx`(`role_id` ASC);",
    "down": "ALTER TABLE `posadmin`.`users` DROP COLUMN `role_id`, DROP INDEX `user_role_idx` ;"
}