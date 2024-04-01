require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "port": process.env.DB_PORT,
    },
    "test": {
        "username": "cmd",
        "password": "Levetiracetam 1500",
        "database": "cmd_database_test",
        "host": "mysql-cmd.alwaysdata.net",
        "dialect": "mysql"
    },
    "production": {
        "username": "cmd",
        "password": "Levetiracetam 1500",
        "database": "cmd_database",
        "host": "mysql-cmd.alwaysdata.net",
        "dialect": "mysql"
    }
}
