document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await axios.post('http://localhost:3000/password/forgotpassword', { email });
        alert('Password reset link sent to your email');
        window.location.href = 'login.html'; 
    } catch (error) {
        alert('Failed to send password reset link');
    }
});
