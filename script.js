document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");

  // Theme Toggle Logic
  document.getElementById("theme-toggle").onclick = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  };

  // Mobile Sidebar Logic
  menuToggle.onclick = () => mobileMenu.classList.add("active");
  menuClose.onclick = () => mobileMenu.classList.remove("active");
  document.querySelectorAll(".mob-link").forEach((link) => {
    link.onclick = () => mobileMenu.classList.remove("active");
  });

  // Fade In/Out Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));
});