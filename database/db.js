const mysql = require('mysql2');

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,

    connectTimeout: 10000
});

console.log("Banco configurado:");
console.log({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.PORT
});


module.exports = conexao.promise();