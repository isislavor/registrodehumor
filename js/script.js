const nome = prompt("Digite seu nome:");
const paragrafo = document.getElementById("mensagem-boas-vindas");

if (nome && nome.trim() !== "") {
  paragrafo.innerHTML = `👋 Olá ${nome}! Tudo bem? Seja bem-vindo(a)! 🤗✨<br><br>
    Nós somos o MoodDaily, registre seu humor conosco! ❤️`;
} else {
  paragrafo.innerHTML = `👋 Olá visitante! Tudo bem? Seja bem-vindo(a)! 🤗✨<br><br>
    Nós somos o MoodDaily, registre seu humor conosco! ❤️`;
}

// Cria o array global do histórico
const historico = [];

// ✅ Carrega histórico salvo do localStorage
const historicoSalvo = localStorage.getItem("moodHistorico");
if (historicoSalvo) {
  const dados = JSON.parse(historicoSalvo);
  dados.forEach(entry => historico.push(entry));
  atualizarHistorico();
}

document.getElementById("mood-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const selecionados = Array.from(document.querySelectorAll('input[name="humor"]:checked'));
  const descricao = document.getElementById("descricao").value;

  if (selecionados.length > 3) {
    alert("Você pode escolher no máximo 3 emoções!");
    return;
  }

  const emojis = selecionados.map(input => input.value);
  const data = new Date();
  const dia = data.toLocaleDateString("pt-BR", { weekday: 'short' });

  // Adiciona ao histórico
  historico.push({ dia, emojis, descricao });

  // ✅ Salva no localStorage
  localStorage.setItem("moodHistorico", JSON.stringify(historico));

  atualizarHistorico();

  console.log(`Você escolheu: ${emojis.join(" ")}\nMotivo: ${descricao}`);

  // Limpa o formulário
  document.getElementById("mood-form").reset();
  document.getElementById("descricao").value = "";
});

function atualizarHistorico() {
  const lista = document.getElementById("historico-lista");
  const resumo = document.getElementById("resumo-humores");

  lista.innerHTML = "";
  const contador = {};

  historico.forEach(entry => {
    const item = document.createElement("li");
    item.innerText = `${entry.dia}: ${entry.emojis.join(" ")} - "${entry.descricao}"`;
    lista.appendChild(item);

    entry.emojis.forEach(emoji => {
      contador[emoji] = (contador[emoji] || 0) + 1;
    });
  });

  const resumoTexto = Object.entries(contador)
    .map(([emoji, count]) => `${emoji} x${count}`)
    .join("  ");

  resumo.innerText = resumoTexto;
};

document.getElementById("limpar-historico").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todo o histórico?")) {
    localStorage.removeItem("moodHistorico");
    historico.length = 0;
    atualizarHistorico();
  }
});
