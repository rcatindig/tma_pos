module.exports = {
    "up": "ALTER TABLE `machines` CHANGE COLUMN `machine_id` `machine_id` VARCHAR(99) NOT NULL ,ADD PRIMARY KEY (`machine_id`);",
    "down": "ALTER TABLE `posadmin`.`machines` CHANGE COLUMN `machine_id` `machine_id` VARCHAR(99) NULL ,DROP PRIMARY KEY;"
}