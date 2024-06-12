async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });

        if (response.status === 200) {
            sessionStorage.setItem('token', response.data.token);
            window.location.href = 'expense.html';
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        alert('An error occurred during login');
    }
}
