module.exports = {
    "up": "CREATE TABLE `modules`( `id` VARCHAR(45) NOT NULL, `name` VARCHAR(99) NULL, PRIMARY KEY (`id`));",
    "down": "DROP TABLE `modules`"
}