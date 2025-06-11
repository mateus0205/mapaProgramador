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
            if (categoria === "todos") {
                card.style.display = "block";
            } else if (card.classList.contains(categoria)) { // busca pela categoria que foi lida acima
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

