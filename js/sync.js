const Sync = {
  emAndamento: false,

  async enviarRegistro(registro) {
    if (!CONFIG.SCRIPT_URL) {
      throw new Error("SCRIPT_URL não configurada.");
    }

    const payload = { ...registro };
    delete payload.status;
    delete payload.sincronizado_local_em;

    const body = new URLSearchParams();
    Object.entries(payload).forEach(([chave, valor]) => {
      if (valor === null || valor === undefined) valor = "";
      body.append(chave, typeof valor === "object" ? JSON.stringify(valor) : String(valor));
    });

    await fetch(CONFIG.SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body
    });

    return true;
  },

  async sincronizar() {
    if (this.emAndamento || !navigator.onLine || !CONFIG.SCRIPT_URL) {
      await atualizarIndicadores();
      return;
    }

    this.emAndamento = true;

    try {
      const pendentes = await DB.pendentes();

      for (const registro of pendentes) {
        try {
          await this.enviarRegistro(registro);
          await DB.marcarSincronizado(registro.id_resposta);
          await atualizarIndicadores();
        } catch (erro) {
          console.warn("Falha ao sincronizar:", registro.id_resposta, erro);
          break;
        }
      }
    } finally {
      this.emAndamento = false;
      await atualizarIndicadores();
    }
  }
};

async function atualizarIndicadores() {
  const statusConexao = document.getElementById("statusConexao");
  const statusFila = document.getElementById("statusFila");

  if (navigator.onLine) {
    statusConexao.textContent = "● Online";
    statusConexao.classList.remove("offline");
  } else {
    statusConexao.textContent = "● Offline";
    statusConexao.classList.add("offline");
  }

  try {
    const quantidade = await DB.contarPendentes();
    statusFila.textContent = `${quantidade} pendente(s)`;
    statusFila.classList.toggle("hidden", quantidade === 0);
  } catch {
    statusFila.textContent = "Fila indisponível";
    statusFila.classList.remove("hidden");
  }
}

window.addEventListener("online", async () => {
  await Sync.sincronizar();
  await atualizarIndicadores();
});

window.addEventListener("offline", atualizarIndicadores);
