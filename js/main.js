document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelectorAll(".checkbox");
    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    checkbox.forEach(switcher => {
        switcher.addEventListener("change", () => {
            document.body.classList.toggle("dark");
        });
    });

    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
});



// cursor effect 
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = `${e.clientX - 10}px`; // Adjust for cursor size
        ripple.style.top = `${e.clientY - 10}px`;  // Adjust for cursor size
        document.body.appendChild(ripple);

        // Remove the ripple element after the animation completes
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});


document.addEventListener("mousemove", function(event) {
    var cursor = document.getElementById("custom-cursor");
    cursor.style.left = (event.clientX - 10) + "px"; // Adjust the offset if needed
    cursor.style.top = (event.clientY - 10) + "px"; // Adjust the offset if needed
  });
  

//   rotation card animation 
document.addEventListener("DOMContentLoaded", function() {
  const projectSection = document.getElementById("project-section");
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectCards.forEach(card => {
          card.classList.add("rotate-animation");
        });
      }
    });
  }, { threshold: 0.10 });

  observer.observe(projectSection);
});


// educatuion card

document.addEventListener('DOMContentLoaded', function() {
  const educards = document.querySelectorAll('.educard');
  const educationSection = document.querySelector('.education');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkViewport() {
    if (isInViewport(educationSection)) {
      educards.forEach(card => {
        card.classList.add('rotate');
      });
    } else {
      educards.forEach(card => {
        card.classList.remove('rotate');
      });
    }
  }

  window.addEventListener('scroll', checkViewport);
  window.addEventListener('resize', checkViewport);
  checkViewport();
});

// footer js


  // Get current year
  document.getElementById("currentYear").innerText = new Date().getFullYear();

// scroll upward

// Get the button
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
