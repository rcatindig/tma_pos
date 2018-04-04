module.exports = {
    "up": "ALTER TABLE `backend_report` DROP COLUMN `client_code`;",
    "down": "ALTER TABLE `backend_report` ADD COLUMN `client_code`;"
}