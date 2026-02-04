// 1. Variáveis globais (estado do jogo)
let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;

// Elementos do HTML que vamos manipular
const inputPalpite = document.getElementById("palpite");
const botaoChutar = document.getElementById("btn-chutar");
const mensagemResultado = document.getElementById("mensagem-resultado");
const spanTentativas = document.getElementById("tentativas");

// 2. Função para iniciar/reiniciar o jogo
function iniciarJogo() {
  // Gera número aleatório entre 1 e 100
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativasRestantes = maxTentativas;

  // Atualiza a tela
  spanTentativas.textContent = tentativasRestantes;
  mensagemResultado.textContent = "";
  inputPalpite.value = "";
  inputPalpite.disabled = false;
  botaoChutar.disabled = false;

  console.log("Número secreto (para teste):", numeroSecreto); // Ajuda a testar
}

// 3. Função principal: Verificar o chute
function verificarPalpite() {
  // Pega o valor do input e converte para número inteiro
  const palpiteUsuario = parseInt(inputPalpite.value);

  // Validação: Se não for número ou estiver fora do limite
  if (isNaN(palpiteUsuario) || palpiteUsuario < 1 || palpiteUsuario > 100) {
    mensagemResultado.textContent =
      "Por favor, digite um número válido entre 1 e 100.";
    mensagemResultado.className = "aviso"; // Cor laranja
    return; // Para a execução da função aqui
  }

  // Lógica do jogo
  if (palpiteUsuario === numeroSecreto) {
    // Cenário: Ganhou
    mensagemResultado.textContent = `Parabéns! Você acertou! O número era ${numeroSecreto}.`;
    mensagemResultado.className = "sucesso"; // Cor verde
    encerrarJogo();
  } else {
    // Cenário: Errou
    tentativasRestantes--; // Diminui 1 tentativa
    spanTentativas.textContent = tentativasRestantes;

    if (tentativasRestantes === 0) {
      // Acabaram as chances
      mensagemResultado.textContent = `Suas tentativas acabaram! O número era ${numeroSecreto}.`;
      mensagemResultado.className = "erro";
      encerrarJogo();
    } else {
      // Ainda tem chances: dar dica
      if (palpiteUsuario > numeroSecreto) {
        mensagemResultado.textContent = "O número secreto é MENOR.";
      } else {
        mensagemResultado.textContent = "O número secreto é MAIOR.";
      }
      mensagemResultado.className = "aviso";

      // Limpa o input para o próximo palpite e foca nele
      inputPalpite.value = "";
      inputPalpite.focus();
    }
  }
}

// 4. Função para bloquear o jogo quando termina
function encerrarJogo() {
  inputPalpite.disabled = true;
  botaoChutar.disabled = true;
}

// Adiciona o evento de clique no botão
botaoChutar.addEventListener("click", verificarPalpite);

// Começa o jogo assim que a página carrega
iniciarJogo();
