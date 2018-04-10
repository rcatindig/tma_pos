module.exports = {
    "up": "CREATE TABLE `roles`( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NOT NULL, `client_id` INT NULL, `date_created` DATETIME NULL, `date_modified` DATETIME NULL, PRIMARY KEY (`id`), INDEX `role_client_id_idx` (`client_id` ASC), CONSTRAINT `role_client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION); ",
    "down": "DROP TABLE `roles`"
}