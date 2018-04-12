module.exports = {
    "up": "ALTER TABLE `users` ADD CONSTRAINT `user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION; ",
    "down": "ALTER TABLE `users` DROP FOREIGN KEY `user_role`;"
}