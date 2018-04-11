module.exports = {
    "up": "INSERT INTO `access_types` (`id`, `name`) VALUES ('RO', 'Read Only'), ('NA', 'No Access'), ('FA', 'Full Access');",
    "down": "TRUNCATE `access_types`;"
}