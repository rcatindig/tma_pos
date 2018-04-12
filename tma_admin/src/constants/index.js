export const API_SERVER = "http://localhost:3001/";

// api urls
export const API = {
    TRANSACTIONS:       API_SERVER + 'transactions/',
    USERS:              API_SERVER + 'users/',
    CLIENTS:            API_SERVER + 'clients/',
    COUNTRIES:          API_SERVER + 'countries/',
    STATES:             API_SERVER + 'states/',
    MACHINES:           API_SERVER + 'machines/',
    REPORTS:            API_SERVER + 'reports/',   
    ROLES:              API_SERVER + 'roles/', 
    ROLE_PERMISSIONS:   API_SERVER + 'rolepermissions/',
}

export const SALT_ROUNDS = 10;

// this is based on the database
export const MODULE = {
    BACKEND_REPORT:     "BRP",
    CLIENTS:            "CLT",
    DASHBOARD:          "DBD",
    TRANSACTIONS:       "TXN",
    USERS:              "USR",
    ROLES:              "ROL"
}

// this is based on the database
export const ACCESS_TYPE = {
    READONLY:           "RO",
    NOACCESS:           "NA",
    FULLACCESS:         "FA",
}