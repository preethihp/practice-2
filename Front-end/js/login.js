async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });

        if (response.status === 200) {
            const { token, isPremiumUser } = response.data;
            sessionStorage.setItem('token', token);
            localStorage.setItem('isPremiumUser', isPremiumUser); // Store premium status in local storage
            alert('Login successful');
            window.location.href = 'expense.html';
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        alert('An error occurred during login');
    }
}