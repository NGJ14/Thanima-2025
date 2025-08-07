
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);

 $("#loader").addClass("hide-loader");

// Pre Thanima Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.pre-thanima-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const cards = carousel.querySelectorAll('.pre-thanima-card');
  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');

  let currentIndex = 0;
  const cardWidth = 280 + 24; // card width + gap
  const maxIndex = cards.length - 1;

  // Initialize carousel
  function initCarousel() {
    updateButtons();
    updateTrackPosition();
  }

  // Update track position
  function updateTrackPosition() {
    const translateX = -currentIndex * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
  }

  // Update button states
  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  // Next button click
  nextBtn.addEventListener('click', function() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateTrackPosition();
      updateButtons();
    }
  });

  // Previous button click
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateTrackPosition();
      updateButtons();
    }
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        // Swipe left - next
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        currentIndex--;
      }
      updateTrackPosition();
      updateButtons();
      isDragging = false;
    }
  });

  track.addEventListener('touchend', function() {
    isDragging = false;
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateTrackPosition();
      updateButtons();
    } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
      currentIndex++;
      updateTrackPosition();
      updateButtons();
    }
  });

  // Auto-scroll functionality (optional)
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateTrackPosition();
      updateButtons();
    }, 5000); // Change card every 5 seconds
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  }

  // Pause auto-scroll on hover
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  // Initialize
  initCarousel();
  startAutoScroll();
});
