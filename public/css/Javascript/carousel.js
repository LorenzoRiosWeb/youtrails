document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    const slides = document.getElementsByClassName("mySlides");
  
    function showSlides() {
      // Hide all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      
      // Increment slideIndex and reset if it exceeds the number of slides
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      
      // Display the current slide
      slides[slideIndex - 1].style.display = 'block';
      
      // Schedule the next slide to be shown after 4 seconds
      setTimeout(showSlides, 4000);
    }
  
    // Initial call to start the slideshow
    showSlides();
  });