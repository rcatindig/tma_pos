module.exports = {
    "up": "CREATE TABLE `access_types`( `id` VARCHAR(10) NOT NULL, `name` VARCHAR(45) NULL, PRIMARY KEY (`id`));",
    "down": "DROP TABLE `access_types`"
}