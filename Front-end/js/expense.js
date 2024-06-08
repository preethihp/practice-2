document.addEventListener('DOMContentLoaded', async() => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseFormContainer = document.getElementById('expense-form-container');

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        expenseFormContainer.style.display = 'block';
        await loadExpenses();
    }

    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const expense = { amount, description, category };

        try {
            const response = await axios.post('http://localhost:3000/expenses', 
            expense, 
            { withCredentials: true });
            console.log('Expense added:', response.data);
            displayExpense(response.data);
        } catch (error) {
            console.error('Error adding expense:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }

        expenseForm.reset();
    });

    async function loadExpenses() {
        try {
            const response = await axios.get('http://localhost:3000/expenses', { withCredentials: true });
            response.data.forEach(expense => displayExpense(expense));
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    }

    function displayExpense(expense) {
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
            <p>${expense.amount} - ${expense.description} - ${expense.category}</p>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    }
});

async function deleteExpense(id) {
    try {
        const response = await axios.delete(`http://localhost:3000/expenses/${id}`, { withCredentials: true });
        console.log('Expense deleted:', response.data);
        location.reload();
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}
