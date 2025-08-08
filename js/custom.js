
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

// Pre Thanima Card Slider Functionality - Mobile Only
let sliderInitialized = false;
document.addEventListener('DOMContentLoaded', function() {
  if (sliderInitialized) return;
  sliderInitialized = true;
  
  const items = document.querySelectorAll('.slider .item');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  
  if (!items.length || !next || !prev) return; // Only run if slider elements exist
  
  let active = 0; // Start with the 1st card (index 0)
  let isAnimating = false;
  
  function loadShow() {
    let stt = 0;
    const isMobile = window.innerWidth <= 767;
    const isSmallMobile = window.innerWidth <= 480;
    const isTinyMobile = window.innerWidth <= 360;
    
    let translateX, maxVisible;
    
                    if (isTinyMobile) {
                  translateX = 40;
                  maxVisible = 1;
                } else if (isSmallMobile) {
                  translateX = 50;
                  maxVisible = 1;
                } else if (isMobile) {
                  translateX = 60;
                  maxVisible = 2;
                } else {
                  translateX = 80;
                  maxVisible = 3; // Show 3 cards max in desktop for 4 total cards
                }
    
    // Center card (active)
    items[active].style.transform = `translateX(-50%) scale(1.2) translateY(0)`;
    items[active].style.zIndex = 10;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    items[active].classList.add('center-card');
    
    // Cards to the right
    for(var i = active + 1; i < items.length; i++) {
      stt++;
      const scale = Math.max(0.75, 1 - 0.12*stt);
      const opacity = stt > maxVisible ? 0 : Math.max(0.4, 1 - 0.15*stt);
      const blur = Math.min(2, stt * 0.8);
      const translateY = stt * 3;
      items[i].style.transform = `translateX(calc(-50% + ${translateX*stt}px)) translateY(${translateY}px) scale(${scale}) perspective(20px) rotateY(-3deg)`;
      items[i].style.zIndex = 10 - stt;
      items[i].style.filter = `blur(${blur}px)`;
      items[i].style.opacity = opacity;
      items[i].classList.remove('center-card');
    }
    
    // Cards to the left
    stt = 0;
    for(var i = active - 1; i >= 0; i--) {
      stt++;
      const scale = Math.max(0.75, 1 - 0.12*stt);
      const opacity = stt > maxVisible ? 0 : Math.max(0.4, 1 - 0.15*stt);
      const blur = Math.min(2, stt * 0.8);
      const translateY = stt * 3;
      items[i].style.transform = `translateX(calc(-50% - ${translateX*stt}px)) translateY(${translateY}px) scale(${scale}) perspective(20px) rotateY(3deg)`;
      items[i].style.zIndex = 10 - stt;
      items[i].style.filter = `blur(${blur}px)`;
      items[i].style.opacity = opacity;
      items[i].classList.remove('center-card');
    }
  }
  
  // Initialize slider
  loadShow();
  
  // Next button functionality
  next.onclick = function() {
    if (!isAnimating) {
      isAnimating = true;
      active = active + 1 < items.length ? active + 1 : 0; // Loop back to first card
      loadShow();
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }
  }
  
  // Previous button functionality
  prev.onclick = function() {
    if (!isAnimating) {
      isAnimating = true;
      active = active - 1 >= 0 ? active - 1 : items.length - 1; // Loop to last card
      loadShow();
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && !isAnimating) {
      isAnimating = true;
      active = active + 1 < items.length ? active + 1 : 0; // Loop back to first card
      loadShow();
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    } else if (e.key === 'ArrowLeft' && !isAnimating) {
      isAnimating = true;
      active = active - 1 >= 0 ? active - 1 : items.length - 1; // Loop to last card
      loadShow();
      setTimeout(() => {
        isAnimating = false;
      }, 800);
    }
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  const slider = document.querySelector('.slider');
  
  slider.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  slider.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  
  slider.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50 && !isAnimating) {
      if (diff > 0) {
        // Swipe left - next
        isAnimating = true;
        active = active + 1 < items.length ? active + 1 : 0; // Loop back to first card
        loadShow();
        setTimeout(() => {
          isAnimating = false;
        }, 800);
      } else if (diff < 0) {
        // Swipe right - previous
        isAnimating = true;
        active = active - 1 >= 0 ? active - 1 : items.length - 1; // Loop to last card
        loadShow();
        setTimeout(() => {
          isAnimating = false;
        }, 800);
      }
    }
  });
  
  // Auto-scroll functionality
  let autoScrollInterval;
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
      if (!isAnimating) {
        if (active < items.length - 1) {
          isAnimating = true;
          active++;
          loadShow();
          setTimeout(() => {
            isAnimating = false;
          }, 800);
        } else {
          isAnimating = true;
          active = 0; // Loop back to start
          loadShow();
          setTimeout(() => {
            isAnimating = false;
          }, 800);
        }
      }
    }, 4000); // Change card every 4 seconds
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  }
  
  // Pause auto-scroll on hover
  slider.addEventListener('mouseenter', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);
  
  // Card click functionality
  items.forEach((item, index) => {
    item.addEventListener('click', function() {
      if (index !== active && !isAnimating) {
        isAnimating = true;
        active = index;
        loadShow();
        setTimeout(() => {
          isAnimating = false;
        }, 800);
      }
    });
  });
  
  // Start auto-scroll
  startAutoScroll();
});
