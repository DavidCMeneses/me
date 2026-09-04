(function () {
  const button = document.querySelector(".theme-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-nav");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.querySelectorAll('a[href$="#about"]').forEach(function (link) {
    link.setAttribute("href", link.getAttribute("href").replace("#about", ""));
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    button.querySelector(".sr-only").textContent = theme === "dark" ? "Light mode" : "Dark mode";
    button.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  applyTheme(initialTheme);

  button.addEventListener("click", function () {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
})();
