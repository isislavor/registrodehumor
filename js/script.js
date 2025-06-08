const nome = prompt("Digite seu nome:");
const paragrafo = document.getElementById("mensagem-boas-vindas");
if(nome != null){
    paragrafo.innerHTML = `Olá  ${nome}! Tudo bem? Seja bem vindo(a)! \uD83E\uDD17\u2728<br><br>
    Nós somos o MoodDaily, registre seu humor conosco! \u2764\uFE0F`;
}
else{
    paragrafo.innerHTML = `Olá visitante! Tudo bem? Seja bem vindo(a)! \uD83E\uDD17\u2728<br><br>
    Nós somos o MoodDaily, registre seu humor conosco! \u2764\uFE0F`;
};
