// Pega o tema da URL, ex: quiz.html?tema=javascript
const params = new URLSearchParams(window.location.search);
const tema = params.get("tema");

// Passa o tema para o quiz.js (opcional)
window.quizTema = tema;


// Inicia o quiz assim que o script carregar
const container = document.getElementById('quiz-box');

if (!tema) {
  container.innerHTML = `
    <p class="aviso">Nenhum tema selecionado. Volte ao mapa, abra o modal do tema desejado e clique em "Resolva um Quiz sobre".</p>
  `;
} else {
  carregarQuiz(tema);
}

function carregarQuiz(tema) {
  fetch('quiz.json')
    .then(res => res.json())
    .then(data => {
      if (!data[tema]) {
        console.error(`Tema "${tema}" não encontrado no JSON`);
        return;
      }
      montarQuiz(data[tema]);
    })
    .catch(err => console.error("Erro ao carregar quiz:", err));
}

function montarQuiz(perguntas) {
  const container = document.getElementById('quiz-box'); // corrigido o ID
  container.innerHTML = '';

  perguntas.forEach((q, i) => {
    const perguntaElem = document.createElement('div');
    perguntaElem.classList.add('pergunta');

    perguntaElem.innerHTML = `
      <h3>${i + 1}. ${q.pergunta}</h3>
      ${q.opcoes.map(op => `
        <label>
          <input type="radio" name="q${i}" value="${op}"> ${op}
        </label>
      `).join('')}
    `;

    container.appendChild(perguntaElem);
  });

  const btn = document.createElement('button');
  btn.textContent = 'Enviar Respostas';
  btn.onclick = () => verificarRespostas(perguntas);
  container.appendChild(btn);
}

function verificarRespostas(perguntas) {
  let acertos = 0;
  perguntas.forEach((q, i) => {
    const marcado = document.querySelector(`input[name="q${i}"]:checked`);
    if (marcado && marcado.value === q.resposta) {
      acertos++;
    }
  });
  alert(`Você acertou ${acertos} de ${perguntas.length} questões!`);
}

// Inicia o quiz assim que o script carregar
carregarQuiz(tema);
