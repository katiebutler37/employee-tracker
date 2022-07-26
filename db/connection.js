const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username
        user: 'root',
        // Your MySQL password
        password: 'katie',
        database: 'workplace'
    },
    console.log('Connected to the workplace database.')
);

module.exports = db;