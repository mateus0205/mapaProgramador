const perguntas = {
  html5: [
    {
      pergunta: "Qual elemento define um bloco de navegação?",
      opcoes: ["<nav>", "<div>", "<section>", "<header>"],
      resposta: "<nav>",
    },
    {
      pergunta: "Qual elemento é usado para vídeos?",
      opcoes: ["<media>", "<video>", "<movie>", "<stream>"],
      resposta: "<video>",
    },
  ],
  css3: [
    {
      pergunta: "Qual propriedade define a cor do fundo?",
      opcoes: ["color", "background-color", "fill", "bg-color"],
      resposta: "background-color",
    }
  ]
};

// Obtém tema pela URL (ex: ?tema=html5)
const urlParams = new URLSearchParams(window.location.search);
const tema = urlParams.get("tema") || "html5";
document.getElementById("tecnologia").textContent = tema.toUpperCase();

// Renderiza as perguntas na tela
const quizBox = document.getElementById("quiz-box");
perguntas[tema].forEach((q, index) => {
  const perguntaDiv = document.createElement("div");
  perguntaDiv.classList.add("question");

  const titulo = document.createElement("h3");
  titulo.innerHTML = `${index + 1}. ${q.pergunta}`;
  perguntaDiv.appendChild(titulo);

  const opcoesContainer = document.createElement("div");
  opcoesContainer.classList.add("options-container");

  q.opcoes.forEach(op => {
    const label = document.createElement("label");
    label.classList.add("option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${index}`;
    input.value = op;

    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${op}`));
    opcoesContainer.appendChild(label);
  });

  perguntaDiv.appendChild(opcoesContainer);
  quizBox.appendChild(perguntaDiv);
});


// Avalia as respostas ao enviar
document.getElementById("submit-quiz").addEventListener("click", () => {
  let acertos = 0;

  perguntas[tema].forEach((q, i) => {
    const selecionado = document.querySelector(`input[name="q${i}"]:checked`);
    if (selecionado && selecionado.value === q.resposta) {
      acertos++;
    }
  });

  const resultado = document.getElementById("quiz-resultado");
  resultado.innerHTML = `
    <h3>Você acertou ${acertos} de ${perguntas[tema].length}!</h3>
  `;
});
