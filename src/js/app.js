document.addEventListener("DOMContentLoaded", function () {
  // Set the height of #particles-js based on the current page
  const particlesJsElement = document.getElementById('particles-js');

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    particlesJsElement.style.height = '100vh';
  } else {
    particlesJsElement.style.height = '50vh';
  }

  // Initialize SweetScroll
  new SweetScroll({/* some options */});

  // Initialize particlesJS
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 19.18081918081918,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      },
      nb: 80
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}, false);


document.querySelectorAll('.interactive-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  card.addEventListener('mouseenter', () => {
    card.classList.add('hover');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('hover');
  });
});

document.querySelectorAll('.dropdown-title').forEach(title => {
  title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
          title.classList.add('active');
      } else {
          content.style.display = 'none';
          title.classList.remove('active');
      }
  });
});