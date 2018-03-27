module.exports = {
    "up": "ALTER TABLE `companies` RENAME TO `clients` ;",
    "down": "ALTER TABLE `clients` RENAME TO `companies` ;"
}