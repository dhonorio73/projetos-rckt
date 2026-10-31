const themeToggle = document.querySelector("#theme-toggle");
const profileImage = document.querySelector("#profile-img");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");

  profileImage.src = "./assets/avatar.png";
  themeToggle.setAttribute("aria-checked", String(isLight));
});
