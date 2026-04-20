document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const themeToggle = document.getElementById("theme-toggle");

  // 1. Theme Logic
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  }

  themeToggle.onclick = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // 2. Mobile Menu Logic
  menuToggle.onclick = () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  menuClose.onclick = () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  // Close menu when clicking a link
  document.querySelectorAll(".mob-link").forEach((link) => {
    link.onclick = () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    };
  });

  // 3. Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });

  // 4. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
