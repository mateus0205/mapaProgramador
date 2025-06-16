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
        }); // quando seleciona botao no mobile, esconde menu 
        if(window.innerWidth <= 800){
            menu.style.display = "none"
        }
    });
});

// esconde botoes em telas pequenas 
const botaoMenu = document.querySelector(".menu-toogle");
const menu = document.querySelector(".menu-container");

botaoMenu.addEventListener("click", function () {
    if (window.innerWidth <= 800) {
        // Alterna entre mostrar e esconder
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
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