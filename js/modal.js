let cardData = {};

fetch("modais.json")
  .then((res) => res.json())
  .then((data) => {
    cardData = data;
    initModals(); // Inicializa os eventos depois que os dados forem carregados
  });

function initModals() {
  const modal = document.querySelector("#modal");
  const fade = document.querySelector("#fade");
  const closeModalButton = document.querySelector("#close-modal");

  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const modalDocsLink = document.querySelector("#modal-docs-link");
  
const modalIcon = document.querySelector("#modal-icon");

const openModal = (id) => {
  const data = cardData[id];
  if (!data) return;

  // Define título, ícone e link
  modalTitle.innerText = data.title;
  modalDocsLink.href = data.link;
  modalIcon.src = data.icon;
  modalIcon.alt = `Ícone de ${data.title}`;

  // Monta conteúdo do corpo
  let bodyHTML = `
    <p>${data.description}</p>
    <h3>Principais Características</h3>
    <ul>
      ${data.characteristics.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <h3>Usado por</h3>
    <div class="tags">
      ${data.usedBy.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <h3>Curiosidades</h3>
    <ul>
      ${data.curiosities.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;

  modalBody.innerHTML = bodyHTML;

  modal.classList.remove("hide");
  fade.classList.remove("hide");
};



  const closeModal = () => {
    modal.classList.add("hide");
    fade.classList.add("hide");
  };

  closeModalButton.addEventListener("click", closeModal);
  fade.addEventListener("click", closeModal);

  document.querySelectorAll(".botaoInfo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openModal(id);
    });
  });
}
