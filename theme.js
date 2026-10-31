const themeToggle = document.querySelector("#theme-toggle");
const profileImage = document.querySelector("#profile-img");
const shareButton = document.querySelector("#share-button");
const shareStatus = document.querySelector("#share-status");
const qrToggle = document.querySelector("#qr-toggle");
const qrCode = document.querySelector("#qr-code");

const savedTheme = localStorage.getItem("devlinks-theme");
const isLight = savedTheme === "light";

document.body.classList.toggle("light", isLight);
profileImage.src = isLight ? "./assets/avatar-light.jpg" : "./assets/avatar.png";
themeToggle.setAttribute("aria-checked", String(isLight));

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");

  document.body.classList.toggle("light", isLight);
  profileImage.src = isLight ? "./assets/avatar-light.jpg" : "./assets/avatar.png";
  themeToggle.setAttribute("aria-checked", String(isLight));
  localStorage.setItem("devlinks-theme", isLight ? "light" : "dark");
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Acesse os links e redes sociais de Douglas Honório.",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shareStatus.textContent = "Link compartilhado.";
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    shareStatus.textContent = "Link copiado para a área de transferência.";
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    console.error("Não foi possível compartilhar ou copiar o link.", error);
    shareStatus.textContent = `Não foi possível compartilhar. Copie o endereço: ${shareData.url}`;
  }
});

qrToggle.addEventListener("click", () => {
  const isExpanded = qrToggle.getAttribute("aria-expanded") !== "true";

  qrToggle.setAttribute("aria-expanded", String(isExpanded));
  qrToggle.textContent = isExpanded ? "Ocultar QR Code" : "Mostrar QR Code";
  qrCode.hidden = !isExpanded;
});
