module.exports = {
    "up": "ALTER TABLE `backend_report` RENAME TO `backend_reports`;",
    "down": "ALTER TABLE `backend_reports` RENAME TO `backend_report`;"
}