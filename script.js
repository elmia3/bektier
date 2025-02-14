document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const logo = document.querySelector(".logo");

  // Open/sluit menu bij klik op hamburger
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    hamburger.classList.toggle("toggle");
    logo.style.opacity = navLinks.classList.contains("nav-active") ? "0" : "1";
  });

  // Sluit menu bij klik op een navigatielink
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
      logo.style.opacity = "1";
    });
  });

  // Sluit menu als je buiten het menu klikt
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
      logo.style.opacity = "1";
    }
  });
});
