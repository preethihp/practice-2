document.addEventListener('DOMContentLoaded', function() {
    axios.get('http://localhost:4000/get-tables')
    .then(response => {
        const tables = response.data;
        const tablesList = document.getElementById('tablesList');
        tablesList.innerHTML = '';
        tables.forEach(table => {
            tablesList.innerHTML += `<li data-table="${table}">${table}</li>`;
        });
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('tablesList').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const tableName = e.target.getAttribute('data-table');
        showInsertDataForm(tableName);
        loadTableData(tableName);

        const tablesList = document.getElementById('tablesList');
        Array.from(tablesList.children).forEach(table => {
            table.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});

document.getElementById('createTableBtn').addEventListener('click', function () {
    document.getElementById('createTableForm').style.display = 'block';
    document.getElementById('insertDataForm').style.display = 'none';
    document.getElementById('tableDataContainer').style.display = 'none';
});

document.getElementById('addColumnBtn').addEventListener('click', function () {
    const columnsContainer = document.getElementById('columnsContainer');
    const columnRow = document.createElement('div');
    columnRow.className = 'column-row';
    columnRow.innerHTML = `
        <input type="text" class="columnName" placeholder="Column Name" required>
        <select class="columnType">
            <option value="INT">INT</option>
            <option value="VARCHAR(255)">VARCHAR(255)</option>
            <option value="DATE">DATE</option>
            <option value="BOOLEAN">BOOLEAN</option>
        </select>
    `;
    columnsContainer.appendChild(columnRow);
});

document.getElementById('submitCreateTableBtn').addEventListener('click', function () {
    const tableName = document.getElementById('tableName').value;
    const columnElements = document.getElementsByClassName('column-row');
    let columns = Array.from(columnElements).map(row => {
        const columnName = row.querySelector('.columnName').value;
        const columnType = row.querySelector('.columnType').value;
        return `${columnName} ${columnType}`;
    });

    axios.post('http://localhost:4000/create-table', { tableName, columns })
    .then(response => {
        alert(response.data);
        document.getElementById('tablesList').innerHTML += `<li data-table="${tableName}">${tableName}</li>`;
        document.getElementById('createTableForm').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('tablesList').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const tableName = e.target.getAttribute('data-table');
        showInsertDataForm(tableName);
        loadTableData(tableName);
    }
});

function showInsertDataForm(tableName) {
    document.getElementById('insertDataForm').style.display = 'block';
    document.getElementById('createTableForm').style.display = 'none';
    document.getElementById('tableDataContainer').style.display = 'none';

    axios.get(`http://localhost:4000/get-columns?table=${tableName}`)
        .then(response => {
            const dataForm = document.getElementById('dataForm');
            dataForm.innerHTML = '';
            response.data.forEach(column => {
                dataForm.innerHTML += `<input type="text" name="${column}" placeholder="${column}" required>`;
            });
            dataForm.setAttribute('data-table', tableName);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('submitDataBtn').addEventListener('click', function () {
    const form = document.getElementById('dataForm');
    const tableName = form.getAttribute('data-table');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    axios.post('http://localhost:4000/add-data', { tableName, data })
        .then(response => {
            alert(response.data);
            loadTableData(tableName);
            document.getElementById('insertDataForm').style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
});

function loadTableData(tableName) {
    axios.get(`http://localhost:4000/get-data?table=${tableName}`)
        .then(response => {
            const tableHeaders = document.getElementById('tableHeaders');
            const tableBody = document.getElementById('tableBody');
            tableHeaders.innerHTML = '';
            tableBody.innerHTML = '';

            if (response.data.length > 0) {
                // Create table headers
                const headersRow = document.createElement('tr');
                Object.keys(response.data[0]).forEach(column => {
                    headersRow.innerHTML += `<th>${column}</th>`;
                });
                tableHeaders.appendChild(headersRow);

                // Create table rows with data and delete buttons
                response.data.forEach(row => {
                    const rowElement = document.createElement('tr');
                    Object.values(row).forEach(value => {
                        rowElement.innerHTML += `<td>${value}</td>`;
                    });
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deleteRecord(tableName, row.id);
                    });
                    const deleteCell = document.createElement('td');
                    deleteCell.appendChild(deleteButton);
                    rowElement.appendChild(deleteCell);
                    tableBody.appendChild(rowElement);
                });
            }
            document.getElementById('tableDataContainer').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

function deleteRecord(tableName, id) {
    axios.delete(`http://localhost:4000/delete-record?table=${tableName}&id=${id}`)
        .then(response => {
            alert(response.data);
            loadTableData(tableName);
        })
        .catch(error => console.error('Error:', error));
}
