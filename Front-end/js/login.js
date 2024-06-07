async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/login', { email, password });

        if (response.status === 200) {
            alert(response.data.message);
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        if (error.response) {
           
            if (error.response.status === 401) {
                alert('Unauthorized: Incorrect password');
            } else if (error.response.status === 404) {
                alert('Error: User not found');
            } else {
                alert(`Error: ${error.response.data.error}`);
            }
        } else {
            
            alert('An error occurred during login');
        }
    }
}


