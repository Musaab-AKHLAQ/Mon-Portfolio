const openModalBtn = document.querySelector("header button");
const modalOverlay = document.querySelector(".modal-overlay");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector(".close-button");

openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("hidden");
  modalContent.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
  modalContent.classList.add("hidden");
  document.body.style.overflow = "auto";
});

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  try {
    const response = await fetch(
      "https://site--tripadvisor-back-end--fztfpwfnnp4n.code.run/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prenom,
          nom,
          email,
          message,
        }),
      }
    );
    const data = await response.json();
    console.log("Réponse complète du backend :", data);
    alert(data.message || data.error);
    form.reset();
  } catch (error) {
    console.error("Erreur lor de l'envoi du formulaire", error);
    alert(
      "Une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer."
    );
  }
});
