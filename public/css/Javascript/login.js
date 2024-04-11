document.addEventListener('DOMContentLoaded', () => {
  const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          // If successful, redirect the browser to the explore page
          document.location.replace('/explore');
        } else {
          // If response is not okay, handle the error
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        // Handle fetch or other errors
        console.error('Error:', error.message);
        // You can display an alert or other UI to inform the user about the error
        alert('An error occurred while logging in. Please try again later.');
      }
    } else {
      // Handle case when email or password is missing
      alert('Please enter both email and password.');
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
          document.location.replace('/login');
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while signing up. Please try again later.');
      }
    } else {
      alert('Please enter username, email, and password.');
    }
  };

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
});
