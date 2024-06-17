document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            });

            alert('Logged in successfully');

            // Store the token, userId, and userName in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Store userId
            localStorage.setItem('userName', response.data.userName); // Store userName

            window.location.href = 'chat.html'; 
        } catch (error) {
            alert('Invalid credentials');
            console.error(error);
        }
    });
});
