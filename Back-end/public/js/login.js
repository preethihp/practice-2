document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/users/login', {
            email,
            password
        });

        if (response.status === 200) {
            // Save the token to localStorage
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            // Redirect to a different page, e.g., home.html
            window.location.href = 'chat.html';
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.response.data.message);
    }
});
