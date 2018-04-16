module.exports = {
    "up": "ALTER TABLE `transactions`  ADD COLUMN `client_code` VARCHAR(99) NULL AFTER `vat`, ADD INDEX `transaction_client_code_idx` (`client_code` ASC);",
    "down": "ALTER TABLE `transactions` DROP COLUMN `client_code`, DROP INDEX `transaction_client_code_idx` ;"
}