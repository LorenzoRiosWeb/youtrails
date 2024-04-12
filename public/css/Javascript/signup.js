document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup-form');
  
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(signupForm);
  
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          document.location.replace('/login');
        } else {
          const errorMessage = await response.text();
          console.error('Error:', errorMessage);
          // Handle error response
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle fetch error
      }
    });
  });
  