document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim(); // Collect username from the form
    const email = document.querySelector('#email-signup').value.trim(); // Collect email from the form
    const password = document.querySelector('#password-signup').value.trim(); // Collect password from the form

    if (username && email && password) { // Check if all required fields are filled
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password }) // Send username, email, and password in the request body
        });

        if (response.ok) {
          document.location.replace('/explore'); // Redirect to explore page after successful signup
        } else {
          const errorMessage = await response.text();
          console.error('Error:', errorMessage);
          // Handle error response
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle fetch error
      }
    } else {
      document.querySelector('#signup-error').textContent = 'Please enter username, email, and password.';
    }
  });
});
