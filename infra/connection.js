import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'desafio_node',
});

export default connection;
