document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
                name,
                email,
                phone,
                password
            });
            alert('User registered successfully');
            window.location.href = 'login.html';
        } catch (error) {
            alert('Error registering user');
            console.error(error);
        }
    });
});
