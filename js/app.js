const tela = document.getElementById("tela");
const btnVoltar = document.getElementById("btnVoltar");

const estado = {
  etapa: 0,
  fluxo: [],
  resposta: {}
};

function agoraLocalISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 19);
}

function gerarId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
}

function obterBlocosNotasAtivos() {
  return AVALIACOES_NOTA
    .filter(bloco => bloco.ativo !== false)
    .map(bloco => ({
      ...bloco,
      itens: bloco.itens.filter(item => item.ativo !== false)
    }))
    .filter(bloco => bloco.itens.length > 0);
}

function construirFluxo() {
  const fluxo = [];

  if (CONFIG.dadosPessoais.ativo) {
    fluxo.push("dados");
  }

  fluxo.push("perfil", "setor", "fidelizacao", "avaliacao");

  obterBlocosNotasAtivos().forEach((_, indice) => {
    fluxo.push(`notas:${indice}`);
  });

  return fluxo;
}

function iniciarPesquisa() {
  estado.fluxo = construirFluxo();
  estado.etapa = 0;
  estado.resposta = {
    id_resposta: gerarId(),
    data_hora_resposta: "",
    perfil: "",
    setor_internacao: "",
    indicaria: "",
    voltaria: "",
    avaliacao_geral: "",
    nome: "",
    telefone: "",
    endereco: "",
    versao_app: CONFIG.APP_VERSION,
    origem_envio: navigator.onLine ? "ONLINE" : "OFFLINE/SINCRONIZADO"
  };

  obterBlocosNotasAtivos().forEach(bloco => {
    bloco.itens.forEach(item => {
      estado.resposta[item.campoPlanilha] = "";
    });
  });

  renderizar();
}

function etapaAtual() {
  return estado.fluxo[estado.etapa];
}

function avancar() {
  estado.etapa++;
  renderizar();
}

function voltar() {
  if (estado.etapa <= 0) return;
  estado.etapa--;
  renderizar();
}

btnVoltar.addEventListener("click", voltar);

function atualizarVoltar() {
  btnVoltar.classList.toggle("hidden", estado.etapa === 0 || etapaAtual() === "fim");
}

function atualizarProgresso() {
  const barra = document.getElementById("progressBar");
  if (!barra || !estado.fluxo.length) return;
  const percentual = Math.min(100, ((estado.etapa + 1) / estado.fluxo.length) * 100);
  barra.style.width = `${percentual}%`;
}

function cardBase(titulo, subtitulo, conteudo) {
  return `
    <div class="screen-card">
      <h2 class="screen-title">${titulo}</h2>
      ${subtitulo ? `<p class="screen-subtitle">${subtitulo}</p>` : ""}
      ${conteudo}
    </div>
  `;
}

function renderizar() {
  atualizarVoltar();
  atualizarProgresso();

  const etapa = etapaAtual();

  if (!etapa) {
    finalizarPesquisa();
    return;
  }

  if (etapa === "dados") renderDados();
  if (etapa === "perfil") renderPerfil();
  if (etapa === "setor") renderSetor();
  if (etapa === "fidelizacao") renderFidelizacao();
  if (etapa === "avaliacao") renderAvaliacao();
  if (etapa && etapa.startsWith("notas:")) {
    const indiceBloco = Number(etapa.split(":")[1]);
    renderBlocoNotas(indiceBloco);
  }
}

function renderDados() {
  const campos = CONFIG.dadosPessoais.campos;
  const obrigatorio = CONFIG.dadosPessoais.obrigatorios ? "required" : "";

  tela.innerHTML = cardBase(
    "Antes de começar",
    "Preencha somente as informações solicitadas.",
    `
      <div class="personal-grid">
        ${campos.nome ? `<div class="field"><label for="nome">Nome</label><input id="nome" value="${estado.resposta.nome || ""}" ${obrigatorio}></div>` : ""}
        ${campos.telefone ? `<div class="field"><label for="telefone">Telefone</label><input id="telefone" inputmode="tel" value="${estado.resposta.telefone || ""}" ${obrigatorio}></div>` : ""}
        ${campos.endereco ? `<div class="field"><label for="endereco">Endereço</label><input id="endereco" value="${estado.resposta.endereco || ""}" ${obrigatorio}></div>` : ""}
      </div>
      <button class="primary-btn" id="continuarDados">Continuar</button>
    `
  );

  document.getElementById("continuarDados").onclick = () => {
    if (campos.nome) estado.resposta.nome = document.getElementById("nome").value.trim();
    if (campos.telefone) estado.resposta.telefone = document.getElementById("telefone").value.trim();
    if (campos.endereco) estado.resposta.endereco = document.getElementById("endereco").value.trim();

    if (CONFIG.dadosPessoais.obrigatorios) {
      const obrigatoriosVazios =
        (campos.nome && !estado.resposta.nome) ||
        (campos.telefone && !estado.resposta.telefone) ||
        (campos.endereco && !estado.resposta.endereco);

      if (obrigatoriosVazios) return;
    }

    avancar();
  };
}

function renderPerfil() {
  const botoes = CONFIG.perfis.map(item => `
    <button class="option-btn" data-valor="${item.valor}">
      <span class="option-icon"><img src="${item.icone}" alt="" aria-hidden="true"></span>
      <span class="option-label">${item.rotulo}</span>
    </button>
  `).join("");

  tela.innerHTML = cardBase(
    "Como você se identifica?",
    "Selecione uma opção.",
    `<div class="options-grid">${botoes}</div>`
  );

  tela.querySelectorAll("[data-valor]").forEach(btn => {
    btn.onclick = () => {
      estado.resposta.perfil = btn.dataset.valor;
      avancar();
    };
  });
}

function renderSetor() {
  const botoes = CONFIG.setores.map(item => `
    <button class="option-btn" data-valor="${item.valor}">
      <span class="option-icon"><img src="${item.icone}" alt="" aria-hidden="true"></span>
      <span class="option-label">${item.rotulo}</span>
    </button>
  `).join("");

  tela.innerHTML = cardBase(
    "Setor de internação do paciente",
    "Em qual setor ocorreu a internação?",
    `<div class="options-grid sector-grid">${botoes}</div>`
  );

  tela.querySelectorAll("[data-valor]").forEach(btn => {
    btn.onclick = () => {
      estado.resposta.setor_internacao = btn.dataset.valor;
      avancar();
    };
  });
}

function renderFidelizacao() {
  tela.innerHTML = cardBase(
    "Sobre sua experiência",
    "Responda às duas perguntas.",
    `
      <div class="dual-questions">
        <div class="question-card">
          <h2>Você indicaria este serviço para um parente ou amigo?</h2>
          <div class="yes-no">
            <button class="choice yes" data-campo="indicaria" data-valor="SIM">SIM</button>
            <button class="choice no" data-campo="indicaria" data-valor="NÃO">NÃO</button>
          </div>
        </div>

        <div class="question-card">
          <h2>Você voltaria a utilizar este serviço?</h2>
          <div class="yes-no">
            <button class="choice yes" data-campo="voltaria" data-valor="SIM">SIM</button>
            <button class="choice no" data-campo="voltaria" data-valor="NÃO">NÃO</button>
          </div>
        </div>
      </div>
    `
  );

  const marcarSelecionados = () => {
    tela.querySelectorAll(".choice").forEach(btn => {
      btn.classList.toggle("selected", estado.resposta[btn.dataset.campo] === btn.dataset.valor);
    });
  };

  marcarSelecionados();

  tela.querySelectorAll(".choice").forEach(btn => {
    btn.onclick = () => {
      estado.resposta[btn.dataset.campo] = btn.dataset.valor;
      marcarSelecionados();

      if (estado.resposta.indicaria && estado.resposta.voltaria) {
        setTimeout(avancar, 250);
      }
    };
  });
}

function renderAvaliacao() {
  const botoes = CONFIG.avaliacaoGeral.map(item => `
    <button class="satisfaction ${item.classe}" data-valor="${item.valor}">
      <span class="face"><img src="${item.icone}" alt="" aria-hidden="true"></span>
      <span>${item.rotulo}</span>
    </button>
  `).join("");

  tela.innerHTML = cardBase(
    "De um modo geral, como você avalia o serviço prestado?",
    "Toque na opção que melhor representa sua experiência.",
    `<div class="satisfaction-grid">${botoes}</div>`
  );

  tela.querySelectorAll("[data-valor]").forEach(btn => {
    btn.onclick = () => {
      estado.resposta.avaliacao_geral = btn.dataset.valor;
      avancar();
    };
  });
}

function valorNotaRespondido(valor) {
  return valor !== "" && valor !== null && valor !== undefined;
}

function renderBlocoNotas(indiceBloco) {
  const blocos = obterBlocosNotasAtivos();
  const bloco = blocos[indiceBloco];

  if (!bloco) {
    avancar();
    return;
  }

  const ultimoBloco = indiceBloco === blocos.length - 1;

  const legenda = `
    <div class="rating-legend" aria-label="Referência da escala">
      <span><strong>0–2</strong> Ruim</span>
      <span><strong>3–4</strong> Regular</span>
      <span><strong>5–6</strong> Bom</span>
      <span><strong>7–8</strong> Ótimo</span>
      <span><strong>9–10</strong> Excelente</span>
    </div>
  `;

  const cards = bloco.itens.map((item, itemIndex) => {
    const valorAtual = estado.resposta[item.campoPlanilha];

    const notas = Array.from({ length: 11 }, (_, nota) => `
      <button
        type="button"
        class="rating-btn ${String(valorAtual) === String(nota) ? "selected" : ""}"
        data-campo="${item.campoPlanilha}"
        data-valor="${nota}"
        aria-pressed="${String(valorAtual) === String(nota)}">
        ${nota}
      </button>
    `).join("");

    const naoSeAplicaSelecionado = valorAtual === VALOR_NAO_SE_APLICA;

    return `
      <article class="service-card rating-question-card">
        <div class="rating-question-head">
          <span class="rating-question-number">${itemIndex + 1}</span>
          <h3 class="service-title">${item.nome}</h3>
        </div>

        <div class="rating-scale">
          ${notas}
        </div>

        <button
          type="button"
          class="rating-na ${naoSeAplicaSelecionado ? "selected" : ""}"
          data-campo="${item.campoPlanilha}"
          data-valor="${VALOR_NAO_SE_APLICA}"
          aria-pressed="${naoSeAplicaSelecionado}">
          Não se aplica
        </button>
      </article>
    `;
  }).join("");

  tela.innerHTML = cardBase(
    "Que nota você dá para:",
    `${bloco.titulo}`,
    `
      <div class="rating-step">
        <span>Avaliação ${indiceBloco + 1} de ${blocos.length}</span>
        <p>${bloco.descricao || ""}</p>
      </div>

      ${legenda}

      <div class="services-stack rating-block-stack">
        ${cards}
      </div>

      <div class="rating-actions">
        <p id="mensagemNotas" class="rating-message" aria-live="polite"></p>
        <button
          type="button"
          class="primary-btn rating-continue-btn"
          id="continuarNotas"
          disabled>
          ${ultimoBloco ? "Finalizar" : "Continuar"}
        </button>
      </div>
    `
  );

  const botaoContinuar = document.getElementById("continuarNotas");
  const mensagemNotas = document.getElementById("mensagemNotas");

  const blocoConcluido = () =>
    bloco.itens.every(item => valorNotaRespondido(estado.resposta[item.campoPlanilha]));

  const atualizarBotao = () => {
    const concluido = blocoConcluido();
    botaoContinuar.disabled = !concluido;

    if (concluido) {
      mensagemNotas.textContent = "Todas as avaliações deste bloco foram respondidas.";
      mensagemNotas.classList.add("complete");
    } else {
      const faltantes = bloco.itens.filter(
        item => !valorNotaRespondido(estado.resposta[item.campoPlanilha])
      ).length;

      mensagemNotas.textContent =
        faltantes === 1
          ? "Falta responder 1 item."
          : `Faltam responder ${faltantes} itens.`;

      mensagemNotas.classList.remove("complete");
    }
  };

  const marcarSelecao = (campo, valorSelecionado) => {
    tela.querySelectorAll(`[data-campo="${campo}"]`).forEach(botao => {
      const selecionado = String(botao.dataset.valor) === String(valorSelecionado);
      botao.classList.toggle("selected", selecionado);
      botao.setAttribute("aria-pressed", String(selecionado));
    });
  };

  tela.querySelectorAll(".rating-btn, .rating-na").forEach(botao => {
    botao.onclick = () => {
      const campo = botao.dataset.campo;
      const valor = botao.dataset.valor;

      estado.resposta[campo] =
        valor === VALOR_NAO_SE_APLICA
          ? VALOR_NAO_SE_APLICA
          : Number(valor);

      marcarSelecao(campo, estado.resposta[campo]);
      atualizarBotao();
    };
  });

  botaoContinuar.onclick = async () => {
    if (!blocoConcluido()) {
      atualizarBotao();
      return;
    }

    botaoContinuar.disabled = true;

    if (ultimoBloco) {
      await finalizarPesquisa();
    } else {
      avancar();
    }
  };

  atualizarBotao();
}

async function finalizarPesquisa() {
  if (estado.resposta.data_hora_resposta) return;

  estado.resposta.data_hora_resposta = agoraLocalISO();
  estado.resposta.origem_envio = navigator.onLine ? "ONLINE" : "OFFLINE/SINCRONIZADO";

  const registroLocal = {
    ...estado.resposta,
    status: "PENDENTE"
  };

  try {
    await DB.salvar(registroLocal);
    await atualizarIndicadores();

    if (navigator.onLine) {
      Sync.sincronizar();
    }

    mostrarAgradecimento();
  } catch (erro) {
    console.error("Erro ao salvar localmente:", erro);
    mostrarAgradecimento(true);
  }
}

function mostrarAgradecimento(comErro = false) {
  btnVoltar.classList.add("hidden");
  const barra = document.getElementById("progressBar");
  if (barra) barra.style.width = "100%";

  tela.innerHTML = `
    <div class="screen-card thanks">
      <div class="thanks-icon">${comErro ? "⚠️" : "✓"}</div>
      <h2>${comErro ? "Não foi possível salvar" : "Obrigado pela sua participação!"}</h2>
      <p>${comErro
        ? "Por favor, avise a equipe responsável antes de fechar esta tela."
        : "Sua avaliação foi registrada."}</p>
    </div>
  `;

  if (!comErro) {
    setTimeout(iniciarPesquisa, CONFIG.TEMPO_AGRADECIMENTO_MS);
  }
}

async function iniciarApp() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (erro) {
      console.warn("Service Worker não registrado:", erro);
    }
  }

  await atualizarIndicadores();
  iniciarPesquisa();

  if (navigator.onLine) {
    Sync.sincronizar();
  }
}

iniciarApp();
