module.exports = {
    "up": "ALTER TABLE `machines`  ADD CONSTRAINT `machine_client_code` FOREIGN KEY (`client_code`) REFERENCES `clients` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE;",
    "down": ""
}