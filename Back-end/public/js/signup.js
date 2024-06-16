document.getElementById('signup-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:3000/users/signup', {
      name,
      email,
      phone,
      password
    });

    alert('Sign up successful! Please log in.');
    window.location.href = 'login.html';
  } catch (error) {
    alert(error.response.data.message);
  }
});
