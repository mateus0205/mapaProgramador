// Seleciona elementos principais
const botoes = document.querySelectorAll(".botao")
const cards = document.querySelectorAll(".cards")
const botaoMenu = document.querySelector(".menu-toogle")
const menu = document.querySelector(".menu-container")
const imgMenu = document.querySelector(".menu-toogle img")
const modal = document.getElementById("modal")
const fade = document.getElementById("fade")

// --- Função que filtra os cards e destaca o botão selecionado ---
function filtrarCards(categoria, botaoClicado) {
  cards.forEach((card) => {
    if (categoria === "all") {
      card.style.display = "flex"
    } else if (card.classList.contains(categoria)) {
      card.style.display = "flex"
    } else {
      card.style.display = "none"
    }
  })

  // Destaque visual no botão clicado
  botoes.forEach((b) => b.classList.remove("selecionado"))
  botaoClicado.classList.add("selecionado")

  // Fecha menu no mobile, se estiver aberto
  if (window.innerWidth <= 768 && menu.classList.contains("show")) {
    fecharMenu()
  }
}

// --- Função para abrir o menu ---
function abrirMenu() {
  menu.classList.add("show")
  botaoMenu.classList.add("active")
  imgMenu.src = botaoMenu.dataset.close
  imgMenu.alt = "Fechar menu"
}

// --- Função para fechar o menu ---
function fecharMenu() {
  menu.classList.remove("show")
  botaoMenu.classList.remove("active")
  imgMenu.src = botaoMenu.dataset.open
  imgMenu.alt = "Abrir menu"
}

// --- Evento de clique nos botões para filtro ---
botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const categoria = botao.textContent.toLowerCase()
    filtrarCards(categoria, botao)
  })
})

// --- Toggle menu hambúrguer ---
botaoMenu.addEventListener("click", (e) => {
  e.stopPropagation()

  if (menu.classList.contains("show")) {
    fecharMenu()
  } else {
    abrirMenu()
  }
})

// --- Fecha o menu ao clicar fora dele ---
document.addEventListener("click", (event) => {
  if (window.innerWidth <= 768) {
    const isClickInsideMenu = menu.contains(event.target)
    const isClickOnToggle = botaoMenu.contains(event.target)

    if (!isClickInsideMenu && !isClickOnToggle && menu.classList.contains("show")) {
      fecharMenu()
    }
  }
})

// --- Fecha menu ao redimensionar para desktop ---
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && menu.classList.contains("show")) {
    fecharMenu()
  }
})

// --- Modal ---
// Previne fechamento ao clicar dentro do modal
modal.addEventListener("click", (event) => {
  event.stopPropagation()
})

// Fecha modal ao clicar no fade (fundo escuro)
fade.addEventListener("click", () => {
  modal.classList.add("hide")
  fade.classList.add("hide")
})

// Fecha modal ao pressionar ESC
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modal.classList.contains("hide")) {
      modal.classList.add("hide")
      fade.classList.add("hide")
    }
  }
})

// --- Previne scroll no body quando modal está aberto ---
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      if (modal.classList.contains("hide")) {
        document.body.style.overflow = ""
      } else {
        document.body.style.overflow = "hidden"
      }
    }
  })
})

observer.observe(modal, { attributes: true })
