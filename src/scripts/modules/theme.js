// if (
//   localStorage.theme === "dark" ||
//   (!(theme in localStorage) &&
//     window.matchMedia("prefers-color-scheme: dark").matches)
// ) {
//   document.documentElement.classList.add("dark");
// } else {
//   document.documentElement.classList.remove("dark");
// }

export const themeToggle = () => {
  // DOM Selection
  const lightBtn = document.getElementById("light-btn");
  const darkBtn = document.getElementById("dark-btn");
  // Define Functions
  function lightTheme() {
    document.documentElement.classList.remove("dark");
    // localStorage.theme = "light";
  }
  function darkTheme() {
    document.documentElement.classList.add("dark");
    // localStorage.theme = "dark";
  }
  // Event Listeners
  lightBtn.addEventListener("click", lightTheme);
  darkBtn.addEventListener("click", darkTheme);
};
