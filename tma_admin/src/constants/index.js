export const API_SERVER = "http://localhost:3001/";

// api urls
export const API = {
    DASHBOARD:          API_SERVER + 'dashboard/',
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

// use for status
export const STATUS = {
    ACTIVE:     0,
    INACTIVE:   1
}

// user types

export const USER_TYPE = {
    ADMIN: 0,
    CLIENT: 1,
}