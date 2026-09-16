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

function construirFluxo() {
  const fluxo = [];
  if (CONFIG.dadosPessoais.ativo) fluxo.push("dados");
  fluxo.push("perfil", "setor", "fidelizacao", "avaliacao", "servicos");
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

  CONFIG.servicos
    .filter(s => s.ativo)
    .forEach(s => estado.resposta[s.campoPlanilha] = "");

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
  if (etapa === "servicos") renderServicos();
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
    "Identificação",
    "Selecione uma opção",
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
    "Setor de Internação do Paciente",
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

function renderServicos() {
  const servicos = CONFIG.servicos.filter(s => s.ativo);

  const cards = servicos.map(servico => {
    const notas = Array.from({ length: 11 }, (_, i) => `
      <button
        class="rating-btn ${String(estado.resposta[servico.campoPlanilha]) === String(i) ? "selected" : ""}"
        data-servico="${servico.campoPlanilha}"
        data-nota="${i}">
        ${i}
      </button>
    `).join("");

    return `
      <article class="service-card">
        <div class="service-head">
          <div class="service-icon"><img src="${servico.icone}" alt="" aria-hidden="true"></div>
          <h3 class="service-title">${servico.nome}</h3>
        </div>
        <div class="rating-scale">${notas}</div>
      </article>
    `;
  }).join("");

  tela.innerHTML = cardBase(
    "Que nota você dá para:",
    "Avalie cada item de 0 a 10",
    `<div class="services-stack">${cards}</div>`
  );

  tela.querySelectorAll(".rating-btn").forEach(btn => {
    btn.onclick = () => {
      const campo = btn.dataset.servico;
      estado.resposta[campo] = Number(btn.dataset.nota);

      tela.querySelectorAll(`[data-servico="${campo}"]`).forEach(item => {
        item.classList.toggle("selected", item === btn);
      });

      const concluiu = servicos.every(s => estado.resposta[s.campoPlanilha] !== "");
      if (concluiu) {
        setTimeout(finalizarPesquisa, 300);
      }
    };
  });
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
