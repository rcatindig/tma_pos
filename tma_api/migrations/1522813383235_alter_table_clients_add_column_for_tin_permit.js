module.exports = {
    "up": "ALTER TABLE `clients` ADD COLUMN `tin` VARCHAR(45) NULL AFTER `tel_no`, ADD COLUMN `permit_no` VARCHAR(45) NULL AFTER `tin`;",
    "down": "ALTER TABLE `clients` DROP COLUMN `tin`, DROP COLUMN `permit_no`"
}