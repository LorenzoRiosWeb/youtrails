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
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          // If successful, redirect the browser to the explore page
          document.location.replace('/explore');
        } else {
          // If response is not okay, handle the error
          const errorMessage = await response.text();
          document.querySelector('#login-error').textContent = errorMessage;
        }
      } catch (error) {
        // Handle fetch or other errors
        console.error('Error:', error.message);
        // Display error message on the page
        document.querySelector('#login-error').textContent = 'An error occurred while logging in. Please try again later.';
      }
    } else {
      // Handle case when email or password is missing
      document.querySelector('#login-error').textContent = 'Please enter both email and password.';
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
    errorMessageElement.textContent = 'An error occurred while signing up. Please try again later.';
    }
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
          // Handle other status codes
          const errorMessage = await response.text();
          document.querySelector('#signup-error').textContent = errorMessage;
        }
      } catch (error) {
        console.error('Error:', error.message);
        document.querySelector('#signup-error').textContent = 'An error occurred while signing up. Please try again later.';
      }
    } else {
      document.querySelector('#signup-error').textContent = 'Please enter username, email, and password.';
    }
  };

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
});
