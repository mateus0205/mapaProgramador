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
  const container = document.getElementById('quiz-box');
  container.classList.add('quiz-container');
  container.innerHTML = '';

  perguntas.forEach((q, i) => {
    const perguntaElem = document.createElement('div');
    perguntaElem.classList.add('question');

    const opcoesHTML = q.opcoes.map(op => `
      <label class="option">
        <input type="radio" name="q${i}" value="${op}"> ${op}
      </label>
    `).join('');

    perguntaElem.innerHTML = `
      <h3>${i + 1}. ${q.pergunta}</h3>
      <div class="options-container">
        ${opcoesHTML}
      </div>
    `;

    container.appendChild(perguntaElem);
  });

  const btn = document.createElement('button');
  btn.id = 'submit-quiz';
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

  let resultDiv = document.getElementById('quiz-result');
  if (!resultDiv) {
    resultDiv = document.createElement('div');
    resultDiv.id = 'quiz-result';
    document.getElementById('quiz-box').appendChild(resultDiv);
  }

  resultDiv.style.display = 'block';
  resultDiv.className = acertos >= 4 ? 'result-success' : 'result-error';
  resultDiv.textContent = acertos === perguntas.length
    ? `Parabéns! Você acertou todas as ${perguntas.length} questões.`
    : `Você acertou ${acertos} de ${perguntas.length} questões.`;
}

function montarQuiz(perguntas) {
  const container = document.getElementById('quiz-box');
  container.classList.add('quiz-container');
  container.innerHTML = '';

  perguntas.forEach((q, i) => {
    const perguntaElem = document.createElement('div');
    perguntaElem.classList.add('question');

    const opcoesHTML = q.opcoes.map(op => `
      <label class="option">
        <input type="radio" name="q${i}" value="${op}"> ${op}
      </label>
    `).join('');

    perguntaElem.innerHTML = `
      <h3>${i + 1}. ${q.pergunta}</h3>
      <div class="options-container">
        ${opcoesHTML}
      </div>
    `;

    container.appendChild(perguntaElem);
  });

  const btn = document.createElement('button');
  btn.id = 'submit-quiz';
  btn.textContent = 'Enviar Respostas';
  btn.onclick = () => verificarRespostas(perguntas);
  container.appendChild(btn);
}


document.getElementById('submit-quiz').addEventListener('click', function () {
  let score = 0;
  const totalQuestions = 1; // Ajuste conforme o número de questões

  const answer1 = document.querySelector('input[name="q1"]:checked');
  if (answer1 && answer1.value === "a") {
    score++;
  }

  const resultDiv = document.getElementById('quiz-result');
  resultDiv.style.display = 'block';

  if (score === totalQuestions) {
    resultDiv.textContent = `Parabéns! Você acertou ${score} de ${totalQuestions} questões.`;
    resultDiv.className = 'result-success';
  } else {
    resultDiv.textContent = `Você acertou ${score} de ${totalQuestions} questões. Tente novamente!`;
    resultDiv.className = 'result-error';
  }
});


// Inicia o quiz assim que o script carregar
carregarQuiz(tema);
