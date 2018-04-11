module.exports = {
    "up": "CREATE TABLE `role_permissions`( `role_id` INT NOT NULL, `module_id` VARCHAR(45) NOT NULL, `access_type` VARCHAR(10) NOT NULL, PRIMARY KEY (`role_id`, `module_id`), INDEX `rp_module_idx` (`module_id` ASC), INDEX `rp_access_type_idx` (`access_type` ASC), CONSTRAINT `rp_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `rp_access_type` FOREIGN KEY (`access_type`) REFERENCES `access_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);",
    "down": "DROP TABLE `role_permissions`"
}