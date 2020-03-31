const mysql = require('mysql');
const config = {
    "host" : "localhost",
    "user" : "root",
    "password" : "YOUR_PASSWORD",
    "database" : "YOUR_DB"
};
let doConn;

function connectDB() {
    if (!doConn) {
        doConn = mysql.createPool(config);
        doConn.getConnection(function(error) {
            if (error) {
                console.log('[ERROR] Database connection failed!');
                return error;
            }
            console.log('[MYSQL] MySQL Server started!');
        });
    }
    return doConn;
}

module.exports = connectDB();
