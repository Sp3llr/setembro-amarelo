document.addEventListener("DOMContentLoaded", function () {
  const mensagens = [
    "Você não precisa ter todas as respostas hoje. Um pequeno passo já é movimento.",
    "Pedir ajuda não diminui sua força. É uma forma corajosa de cuidar de si.",
    "Dias difíceis não definem toda a sua história. Ainda existem páginas para viver.",
    "O que você sente importa. Dê a si mesmo o cuidado que ofereceria a alguém querido.",
    "Respire com calma. Você pode atravessar este momento um minuto de cada vez.",
    "Sua presença faz diferença, mesmo quando você não consegue perceber isso agora."
  ];

  const mensagem = document.getElementById("supportMessage");
  const botaoMensagem = document.getElementById("messageButton");

  const botaoRespirar = document.getElementById("breathingButton");
  const botaoParar = document.getElementById("stopButton");
  const circulo = document.getElementById("breathingCircle");
  const textoRespiracao = document.getElementById("breathingText");
  const instrucao = document.getElementById("breathingInstruction");
  const barraProgresso = document.getElementById("progressBar");
  const ano = document.getElementById("year");

  let mensagemAtual = 0;
  let temporizadores = [];
  let temporizadorProgresso = null;

  // Atualiza automaticamente o ano do rodapé
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  // Gera uma nova mensagem de apoio
  if (botaoMensagem && mensagem) {
    botaoMensagem.addEventListener("click", function () {
      let novaMensagem;

      do {
        novaMensagem = Math.floor(Math.random() * mensagens.length);
      } while (
        novaMensagem === mensagemAtual &&
        mensagens.length > 1
      );

      mensagemAtual = novaMensagem;
      mensagem.textContent = mensagens[mensagemAtual];
    });
  }

  function limparTemporizadores() {
    temporizadores.forEach(function (temporizador) {
      clearTimeout(temporizador);
    });

    temporizadores = [];

    if (temporizadorProgresso !== null) {
      clearInterval(temporizadorProgresso);
      temporizadorProgresso = null;
    }
  }

  function alterarEtapa(nome, mensagemInstrucao, classeAnimacao) {
    textoRespiracao.textContent = nome;
    instrucao.textContent = mensagemInstrucao;

    circulo.classList.remove("inhale", "hold", "exhale");
    circulo.classList.add(classeAnimacao);
  }

  function programarCiclo(atraso) {
    const inspirar = setTimeout(function () {
      alterarEtapa(
        "Inspire",
        "Inspire lentamente pelo nariz durante 4 segundos.",
        "inhale"
      );
    }, atraso);

    const segurar = setTimeout(function () {
      alterarEtapa(
        "Segure",
        "Segure o ar com conforto durante 4 segundos.",
        "hold"
      );
    }, atraso + 4000);

    const expirar = setTimeout(function () {
      alterarEtapa(
        "Expire",
        "Solte o ar devagar durante 6 segundos.",
        "exhale"
      );
    }, atraso + 8000);

    temporizadores.push(inspirar, segurar, expirar);
  }

  function pararRespiracao(concluido) {
    limparTemporizadores();

    circulo.classList.remove("inhale", "hold", "exhale");

    if (concluido) {
      textoRespiracao.textContent = "Muito bem!";
      instrucao.textContent =
        "Exercício concluído. Perceba como seu corpo está agora.";
      barraProgresso.style.width = "100%";
    } else {
      textoRespiracao.textContent = "Pronto?";
      instrucao.textContent =
        "Inspire por 4 segundos, segure por 4 e expire por 6.";
      barraProgresso.style.width = "0%";
    }

    botaoRespirar.textContent = "Começar novamente";
    botaoRespirar.hidden = false;
    botaoParar.hidden = true;
  }

  function iniciarRespiracao() {
    limparTemporizadores();

    botaoRespirar.hidden = true;
    botaoParar.hidden = false;
    barraProgresso.style.width = "0%";

    const duracaoTotal = 42000;
    const momentoInicial = Date.now();

    // Três ciclos de 14 segundos
    for (let atraso = 0; atraso < duracaoTotal; atraso += 14000) {
      programarCiclo(atraso);
    }

    temporizadorProgresso = setInterval(function () {
      const tempoDecorrido = Date.now() - momentoInicial;
      const porcentagem = Math.min(
        100,
        (tempoDecorrido / duracaoTotal) * 100
      );

      barraProgresso.style.width = porcentagem + "%";
    }, 200);

    const finalizacao = setTimeout(function () {
      pararRespiracao(true);
    }, duracaoTotal);

    temporizadores.push(finalizacao);
  }

  const elementosRespiracaoExistem =
    botaoRespirar &&
    botaoParar &&
    circulo &&
    textoRespiracao &&
    instrucao &&
    barraProgresso;

  if (elementosRespiracaoExistem) {
    botaoRespirar.addEventListener("click", iniciarRespiracao);

    botaoParar.addEventListener("click", function () {
      pararRespiracao(false);
    });
  } else {
    console.warn(
      "Alguns elementos do exercício de respiração não foram encontrados."
    );
  }
});