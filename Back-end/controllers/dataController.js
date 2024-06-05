const Table = require('../models/dataModels');

exports.createTable = (req, res) => {
    const { tableName, columns } = req.body;
    const table = new Table(tableName, columns);
    table.create()
        .then(result => res.send('Table created successfully!'))
        .catch(err => res.status(500).send(err));
};

exports.insertData = (req, res) => {
    const { tableName, data } = req.body;
    Table.insertData(tableName, data)
        .then(result => res.send('Data added successfully!'))
        .catch(err => res.status(500).send(err));
};

exports.getColumns = (req, res) => {
    const { table } = req.query;
    Table.getColumns(table)
        .then(([result]) => {
            const columns = result.map(row => row.Field);
            res.json(columns);
        })
        .catch(err => res.status(500).send(err));
};

exports.getData = (req, res) => {
    const { table } = req.query;
    Table.getData(table)
        .then(([result]) => res.json(result))
        .catch(err => res.status(500).send(err));
};

exports.deleteRecord = (req, res) => {
    const { table, id } = req.query;
    Table.deleteRecord(table, id)
        .then(result => res.send('Record deleted successfully!'))
        .catch(err => res.status(500).send(err));
};

exports.getTables = (req, res) =>{
    Table.getTable()
    .then (table=>res.json(table))
    .catch(err=>console.log(err))
};




