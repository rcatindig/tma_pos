module.exports = {
    "up": "ALTER TABLE `clients` ADD COLUMN `code` VARCHAR(99) NULL AFTER `id`, ADD UNIQUE INDEX `code_UNIQUE`(`code` ASC);",
    "down": "ALTER TABLE `clients` DROP COLUMN `code`"
}