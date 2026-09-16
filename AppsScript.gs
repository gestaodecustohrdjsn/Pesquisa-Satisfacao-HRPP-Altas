const PLANILHA_ID = "124-F-l3JjAiF9etAgB9z37ssPU9RMbUXZ6r5YxJX62w";
const ABA_RESPOSTAS = "Respostas";

const COLUNAS_BASE = [
  "id_resposta",
  "data_hora_resposta",
  "data_hora_sincronizacao",
  "perfil",
  "setor_internacao",
  "indicaria",
  "voltaria",
  "avaliacao_geral",
  "nota_limpeza_conforto",
  "nome",
  "telefone",
  "endereco",
  "versao_app",
  "origem_envio"
];

function doGet() {
  return json_({
    ok: true,
    app: "Pesquisa de Satisfação - HRPP - Altas",
    servidor: new Date().toISOString()
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const dados = normalizarDados_(e);
    if (!dados.id_resposta) {
      return json_({ ok: false, erro: "id_resposta ausente" });
    }

    const ss = SpreadsheetApp.openById(PLANILHA_ID);
    let aba = ss.getSheetByName(ABA_RESPOSTAS);

    if (!aba) {
      aba = ss.insertSheet(ABA_RESPOSTAS);
    }

    garantirCabecalhos_(aba, dados);

    if (idJaExiste_(aba, dados.id_resposta)) {
      return json_({
        ok: true,
        duplicado: true,
        id_resposta: dados.id_resposta
      });
    }

    const cabecalhos = obterCabecalhos_(aba);
    dados.data_hora_sincronizacao = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd HH:mm:ss"
    );

    const linha = cabecalhos.map(coluna => {
      const valor = dados[coluna];
      return valor === undefined || valor === null ? "" : valor;
    });

    aba.appendRow(linha);

    return json_({
      ok: true,
      duplicado: false,
      id_resposta: dados.id_resposta
    });

  } catch (erro) {
    console.error(erro);
    return json_({
      ok: false,
      erro: String(erro && erro.message ? erro.message : erro)
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

function normalizarDados_(e) {
  const dados = {};

  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(chave => {
      dados[chave] = String(e.parameter[chave] ?? "").trim();
    });
  }

  return dados;
}

function garantirCabecalhos_(aba, dados) {
  let cabecalhos = obterCabecalhos_(aba);

  if (cabecalhos.length === 0) {
    aba.getRange(1, 1, 1, COLUNAS_BASE.length).setValues([COLUNAS_BASE]);
    aba.setFrozenRows(1);
    cabecalhos = [...COLUNAS_BASE];
  }

  const novas = Object.keys(dados).filter(chave => !cabecalhos.includes(chave));

  if (novas.length > 0) {
    aba.getRange(1, cabecalhos.length + 1, 1, novas.length).setValues([novas]);
  }
}

function obterCabecalhos_(aba) {
  const ultimaColuna = aba.getLastColumn();
  if (ultimaColuna === 0) return [];

  return aba
    .getRange(1, 1, 1, ultimaColuna)
    .getValues()[0]
    .map(v => String(v).trim())
    .filter(Boolean);
}

function idJaExiste_(aba, id) {
  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha < 2) return false;

  const cabecalhos = obterCabecalhos_(aba);
  const colunaId = cabecalhos.indexOf("id_resposta") + 1;
  if (colunaId <= 0) return false;

  const finder = aba
    .getRange(2, colunaId, ultimaLinha - 1, 1)
    .createTextFinder(String(id))
    .matchEntireCell(true)
    .findNext();

  return finder !== null;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
