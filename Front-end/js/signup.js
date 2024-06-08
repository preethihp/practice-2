async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:3000/signup', 
        { name, email, password }, 
        { withCredentials: true });

        if (response.status === 201) {
            alert(response.data.message);
        } else {
            alert(response.data.error);
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.error);
        } else if (error.request) {
            alert('No response from server');
        } else {
            alert('Error: ' + error.message);
        }
    }
}
