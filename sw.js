const CACHE_NAME = "hrpp-altas-v1.1.1";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/config.js",
  "./js/storage.js",
  "./js/sync.js",
  "./js/app.js",
  "./assets/icons/paciente.svg",
  "./assets/icons/visitante.svg",
  "./assets/icons/acompanhante.svg",
  "./assets/icons/clinica_medica.svg",
  "./assets/icons/clinica_cirurgica_I.svg",
  "./assets/icons/clinica_cirurgica_II.svg",
  "./assets/icons/maternidade.svg",
  "./assets/icons/pediatria.svg",
  "./assets/icons/uti_a.svg",
  "./assets/icons/uti_b.svg",
  "./assets/icons/limpeza.svg",
  "./assets/icons/muito-satisfeito.svg",
  "./assets/icons/satisfeito.svg",
  "./assets/icons/pouco-satisfeito.svg",
  "./assets/icons/insatisfeito.svg",
  "./assets/icons/indiferente.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(chaves.filter(chave => chave !== CACHE_NAME).map(chave => caches.delete(chave)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cacheada => {
      return cacheada || fetch(event.request).then(resposta => {
        const clone = resposta.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return resposta;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
