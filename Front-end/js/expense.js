document.addEventListener('DOMContentLoaded', async () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseFormContainer = document.getElementById('expense-form-container');

    const token = sessionStorage.getItem('token');
    const isPremiumUser = localStorage.getItem('isPremiumUser');

    if (token) {
        expenseFormContainer.style.display = 'block';
        await loadExpenses(token);
        if (isPremiumUser === 'true') {
            document.getElementById('premium_message').innerText = 'You are a premium user now';
            document.getElementById("rzp-button").style.visibility = "hidden";
            showLeaderboardButton();
        }
    } else {
        alert('You are not logged in.');
        window.location.href = 'login.html';
    }

    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        try {
            const response = await axios.post('http://localhost:3000/expenses', 
            { amount, description, category }, 
            { headers: { 'Authorization': `Bearer ${token}` } });

            if (response.status === 201) {
                addExpenseToList(response.data);
                expenseForm.reset();
            } else {
                alert('Error adding expense');
            }
        } catch (error) {
            alert('An error occurred while adding expense');
        }
    });

    document.getElementById('leaderboard-button').addEventListener('click', async () => {
        const leaderboard = document.getElementById('leaderboard');
        if (leaderboard.style.display === 'block') {
            leaderboard.style.display = 'none';
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/leaderboard', { headers: { 'Authorization': `Bearer ${token}` } });
            const leaderboardData = response.data.leaderboard;
            const leaderboardList = document.getElementById('leaderboard-list');
            leaderboardList.innerHTML = '';
            leaderboardData.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name}: ${user.total_expense}`;
                leaderboardList.appendChild(li);
            });
            leaderboard.style.display = 'block';
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the leaderboard');
        }
    });
});

async function loadExpenses(token) {
    try {
        const response = await axios.get('http://localhost:3000/expenses', 
        { headers: { 'Authorization': `Bearer ${token}` } });

        if (response.status === 200) {
            const expenses = response.data;
            expenses.forEach(expense => addExpenseToList(expense));
        } else {
            alert('Error loading expenses');
        }
    } catch (error) {
        alert('An error occurred while loading expenses');
    }
}

function addExpenseToList(expense) {
    const expenseList = document.getElementById('expense-list');

    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.dataset.id = expense.id;

    expenseItem.innerHTML = `
        <span>${expense.amount}</span>
        <span>${expense.description}</span>
        <span>${expense.category}</span>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;

    expenseList.appendChild(expenseItem);
}

async function deleteExpense(id) {
    const token = sessionStorage.getItem('token');
    try {
        const response = await axios.delete(`http://localhost:3000/expenses/${id}`, 
        { headers: { 'Authorization': `Bearer ${token}` } });

        if (response.status === 200) {
            const expenseItem = document.querySelector(`.expense-item[data-id='${id}']`);
            expenseItem.remove();
            alert("Successfully deleted");
        } else {
            alert('Error deleting expense');
        }
    } catch (error) {
        alert('An error occurred while deleting expense');
    }
}

function showLeaderboardButton() {
    const leaderboardButton = document.getElementById('leaderboard-button');
    leaderboardButton.style.display = 'block';
}
