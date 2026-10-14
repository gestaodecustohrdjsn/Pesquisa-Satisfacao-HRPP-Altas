const CACHE_NAME = "hrpp-altas-v1.2.1";

const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/config.js",
  "./js/avaliacoes.js",
  "./js/storage.js",
  "./js/sync.js",
  "./js/app.js",
  "./assets/icons/nota-limpeza.svg",
  "./assets/icons/nota-sinalizacao.svg",
  "./assets/icons/nota-silencio.svg",
  "./assets/icons/nota-informacoes.svg",
  "./assets/icons/nota-confianca.svg",
  "./assets/icons/nota-medico.svg",
  "./assets/icons/nota-enfermagem.svg",
  "./assets/icons/nota-outros.svg",
  "./assets/icons/nota-cuidados.svg",
  "./assets/icons/nota-alta.svg",
  "./assets/icons/nota-ouvidoria.svg",
  "./assets/icons/nota-atendimento.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS_ESSENCIAIS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(
        chaves
          .filter(chave => chave !== CACHE_NAME)
          .map(chave => caches.delete(chave))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cacheada => {
      if (cacheada) return cacheada;

      return fetch(event.request)
        .then(resposta => {
          const clone = resposta.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });

          return resposta;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return Response.error();
        });
    })
  );
});
