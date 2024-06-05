const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.post('/create-table', dataController.createTable);
router.post('/add-data', dataController.insertData);
router.get('/get-columns', dataController.getColumns);
router.get('/get-data', dataController.getData);
router.delete('/delete-record', dataController.deleteRecord);
router.get('/get-tables', dataController.getTables);


module.exports = router;
