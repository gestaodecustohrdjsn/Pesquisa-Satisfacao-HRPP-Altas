const DB = {
  nome: "pesquisa_hrpp_altas",
  versao: 1,
  store: "respostas",

  abrir() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.nome, this.versao);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.store)) {
          const store = db.createObjectStore(this.store, { keyPath: "id_resposta" });
          store.createIndex("status", "status", { unique: false });
          store.createIndex("data_hora_resposta", "data_hora_resposta", { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async salvar(registro) {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.store, "readwrite");
      tx.objectStore(this.store).put(registro);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },

  async pendentes() {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.store, "readonly");
      const request = tx.objectStore(this.store).index("status").getAll("PENDENTE");
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  },

  async marcarSincronizado(id) {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.store, "readwrite");
      const store = tx.objectStore(this.store);
      const req = store.get(id);

      req.onsuccess = () => {
        const item = req.result;
        if (!item) return;
        item.status = "SINCRONIZADO";
        item.sincronizado_local_em = new Date().toISOString();
        store.put(item);
      };

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },

  async contarPendentes() {
    const itens = await this.pendentes();
    return itens.length;
  }
};
