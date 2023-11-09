function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbarAnimation();

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  document.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });

  // Add trending animation to the video container
  const trendingVideoAnimation = gsap.to(videocon, {
    scale: 1.2,
    opacity: 0.7,
    duration: 1,
    ease: "power2.out",
    paused: true, // Initially paused
  });

  ScrollTrigger.create({
    trigger: videocon,
    start: "top center",
    end: "bottom center",
    animation: trendingVideoAnimation,
    scrub: true,
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });

  gsap.from("#page1 p", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });

  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}
loadinganimation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}

cursorAnimation();

// Function to toggle between night mode and sun mode
function toggleDarkMode() {
  const body = document.body;
  const darkModeIcon = document.getElementById('dark-mode-icon');

  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    darkModeIcon.classList.remove('ri-sun-line'); // Replace with your sun icon class
    darkModeIcon.classList.add('ri-moon-line'); // Replace with your moon icon class
    localStorage.setItem('darkMode', null);
  } else {
    body.classList.add('dark-mode');
    darkModeIcon.classList.remove('ri-moon-line'); // Replace with your moon icon class
    darkModeIcon.classList.add('ri-sun-line'); // Replace with your sun icon class
    localStorage.setItem('darkMode', 'enabled');
  }
}

// Check the user's dark mode preference in local storage and update the button/icon
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
if (isDarkMode) {
  toggleDarkMode();
}

// Apply trending GSAP animations to elements
function applyTrendingAnimation(containerSelector, animationProps) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container, index) => {
    const animation = gsap.to(container, animationProps);

    ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      animation: animation,
      scrub: true,
    });
  });
}

// Example animation properties for trending animations
const trendingAnimationProps = {
  scale: 1.2,
  opacity: 10.7,
  duration: 1,
  ease: "power2.out",
};

// Apply the trending animation to specific containers
applyTrendingAnimation(".elem", trendingAnimationProps);
applyTrendingAnimation(".child", trendingAnimationProps);
