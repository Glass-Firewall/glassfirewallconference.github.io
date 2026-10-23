document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var body = document.querySelector("body"),
    menuToggle = document.querySelector(".hamburger"),
    menuList = document.querySelector(".main-nav"),
    dropdownToggles = document.querySelectorAll(".dropdown-toggle"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu
  ======================================================= */
  if (menuToggle && menuList) {
    menuToggle.addEventListener("click", () => {
      menu();
    });
  }

  function menuOpen() {
    menuList.classList.add("is-open");
    menuList.classList.add("is-visible");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }

  function menuClose() {
    menuList.classList.remove("is-open");
    menuList.classList.remove("is-visible");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  function menu() {
    if (menuList.classList.contains("is-visible")) {
      menuClose();
    } else {
      menuOpen();
    }
  }

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdown = toggle.closest(".dropdown");
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdownToggles.forEach((toggle) => {
        toggle.closest(".dropdown").classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });

      if (menuList && menuList.classList.contains("is-visible")) {
        menuClose();
        menuToggle.focus();
      }
    }
  });

  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function(){
    body.classList.add("is-in");
  },150)


  /* ================================================================
  // Stop Animations During Window Resizing
  ================================================================ */
  let disableTransition;

  window.addEventListener("resize", () => {
    stopAnimation();
  });

  function stopAnimation() {
    document.body.classList.add("disable-animation");
    clearTimeout(disableTransition);
    disableTransition = setTimeout(() => {
      document.body.classList.remove("disable-animation");
    }, 100);
  }


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off), .project-content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .project-content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .project-content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .project-content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  /* ============================
  // Testimonials Slider
  ============================ */
  if (document.querySelector(".my-slider")) {
    var slider = tns({
      container: ".my-slider",
      items: 3,
      slideBy: 1,
      gutter: 32,
      nav: true,
      mouseDrag: true,
      autoplay: false,
      speed: 500,
      controlsContainer: "#customize-controls",
      responsive: {
        1024: {
          items: 3,
        },
        768: {
          items: 2,
        },
        0: {
          items: 1,
        }
      }
    });
  }


  // =====================
  // Load More Posts
  // =====================
  var load_posts_button = document.querySelector('.load-more-posts');

  load_posts_button&&load_posts_button.addEventListener("click",function(e){e.preventDefault();var o=document.querySelector(".pagination"),e=pagination_next_url.split("/page")[0]+"/page/"+pagination_next_page_number+"/";fetch(e).then(function(e){if(e.ok)return e.text()}).then(function(e){var n=document.createElement("div");n.innerHTML=e;for(var t=document.querySelector(".grid"),a=n.querySelectorAll(".grid__post"),i=0;i<a.length;i++)t.appendChild(a.item(i));new LazyLoad({elements_selector:".lazy"});pagination_next_page_number++,pagination_next_page_number>pagination_available_pages_number&&(o.style.display="none")})});


  /* =======================
  // Scroll Top Button
  ======================= */
  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

});
