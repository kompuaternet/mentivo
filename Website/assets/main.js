const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#site-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const languageLinks = document.querySelectorAll(".language-switcher a[hreflang]");

languageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const locale = link.getAttribute("hreflang");
    if (locale) {
      localStorage.setItem("mentivo-locale", locale);
    }
  });
});
