// botões que filtra cards por categoria   
const botao = document.querySelectorAll(".botao") // escuta o clique do botao 

botao.forEach(botao => {
    botao.addEventListener("click", function (event) {
        // verifica a categoria -> frontend | backend | mobile 
        const categoria = botao.textContent.toLowerCase()
        // escuta os cards 
        const todosCard = document.querySelectorAll(".cards")

        // percorrer todos os cards buscando pelas categoria 
        todosCard.forEach(card => {
            // Se o botão for "Todos", mostra tudo
            if (categoria === "all") {
                card.style.display = "block";
            } else if (card.classList.contains(categoria)) { // busca pela categoria que foi lida acima
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// esconde botoes em telas pequenas 
const botaoMenu = document.querySelector(".menu-toogle");
const menu = document.querySelector(".menu-container");
const img = document.querySelector(".menu-toogle img")


botaoMenu.addEventListener("click", function () {
    if (window.innerWidth <= 800) {
        const openIcon = botaoMenu.dataset.open
        const closeIcon = botaoMenu.dataset.close

        // Alterna entre mostrar e esconder
        if (menu.style.display === "block") {
            menu.style.display = "none";
            img.src = closeIcon; // Caminho correto
        } else {
            menu.style.display = "block";
            img.src = openIcon; // Caminho correto
        }
    }
});

// destaca botão quando selecionado 
const botoes = document.querySelectorAll(".botao");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        // Remove a classe de todos
        botoes.forEach(b => b.classList.remove("selecionado"));

        // Adiciona no clicado
        botao.classList.add("selecionado");


    });
});

// levar para documentação quando clica no card
const cards = document.querySelectorAll('.cards')

cards.forEach(card => {
    card.addEventListener("click", () => {
        const url = card.getAttribute('card-url');
        if (url) {
            window.open(url, '_blank')
        }
    })
})