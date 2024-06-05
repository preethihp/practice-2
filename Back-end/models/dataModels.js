const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "database-management",
    password: "preethi"
});

module.exports = pool.promise();

class Table {
    constructor(tableName, columns) {
        this.tableName = tableName;
        this.columns = columns;
    }

    
    create() {
        // Add id column with auto-increment
        this.columns.unshift('id INT AUTO_INCREMENT PRIMARY KEY');
        const query = `CREATE TABLE ${this.tableName} (${this.columns.join(', ')})`;
        return pool.promise().execute(query);
    }

    static insertData(tableName, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        return pool.promise().execute(query);
    
    }

    static getColumns(tableName) {
        const query = `SHOW COLUMNS FROM ${tableName}`;
        return pool.promise().execute(query);
    }

    static getData(tableName) {
        const query = `SELECT * FROM ${tableName}`;
        return pool.promise().execute(query);
    }

    static deleteRecord(tableName, id) {
        const query = `DELETE FROM ${tableName} WHERE id = ${id}`;
        return pool.promise().execute(query);
    }

    static getTable = () => {
        const query = 'SHOW TABLES';
        return pool.promise().query(query)
            .then(([rows]) => rows.map(row => Object.values(row)[0]));
    };
    
}

module.exports = Table;
