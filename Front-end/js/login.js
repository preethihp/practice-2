async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', {
            email,
            password
        });

        if (response.status === 200) {
            alert('Login successful');
            
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Error logging in');
    }
}
