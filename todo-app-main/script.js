//Grabbing all elements
const colorThemeEl = document.getElementById("color-theme");

//Color theme toggling functionality
colorThemeEl.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme;

  if (currentTheme === "dark") {
    newTheme = "light";
    colorThemeEl.src = "images/icon-moon.svg";
    colorThemeEl.alt = "dark mode";
  } else {
    newTheme = "dark";
    colorThemeEl.src = "images/icon-sun.svg";
    colorThemeEl.alt = "light mode";
  }

  document.documentElement.setAttribute("data-theme", newTheme);
});
