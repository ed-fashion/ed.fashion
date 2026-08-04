const CACHE_NAME = 'ed-fashion-cache-v1';

// Ficheiros essenciais para o cache inicial (ajusta se tiveres nomes diferentes)
const CORE_ASSETS = [
  '/ed.fashion/',
  '/ed.fashion/index.html',
  '/ed.fashion/logo.png'
];

// Instala o service worker e guarda os ficheiros essenciais em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(() => {
        // Se algum ficheiro não existir, não bloqueia a instalação
      });
    })
  );
  self.skipWaiting();
});

// Limpa caches antigas quando uma nova versão é ativada
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estratégia: tenta a rede primeiro, cai para cache se offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
