module.exports = {
    "up": "ALTER TABLE `users` CHANGE COLUMN `active` `status` INT(1) NULL DEFAULT NULL ;",
    "down": "ALTER TABLE `users` CHANGE COLUMN `status` `active` INT(1) NULL DEFAULT NULL ;"
}