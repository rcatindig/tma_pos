module.exports = {
    "up": "INSERT INTO `access_types` VALUES ('FA','Full Access'),('NA','No Access'),('RO','Read Only');",
    "down": "TRUNCATE `access_types`"
}