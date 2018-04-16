module.exports = {
    "up": "ALTER TABLE `transactions` ADD CONSTRAINT `transaction_client_code` FOREIGN KEY (`client_code`)  REFERENCES `clients` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;",
    "down": "ALTER TABLE `transactions` DROP FOREIGN KEY `client_code`;"
}