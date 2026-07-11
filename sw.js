const CACHE_NAME = 'painel-mestre-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png'
];

// ─── INSTALL: cacheia os arquivos ──────────────────────────────────
self.addEventListener('install', event => {
  // Pular o estado "waiting" e ativar imediatamente
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache com network-fallback (se falhar um asset, não quebra tudo)
      return Promise.all(
        assets.map(asset =>
          fetch(asset, { cache: 'no-store' })
            .then(response => {
              if (response.ok) cache.put(asset, response);
            })
            .catch(() => {}) // se falhar, ignora sem quebrar
        )
      );
    })
  );
});

// ─── ACTIVATE: limpa caches antigos ────────────────────────────────
self.addEventListener('activate', event => {
  // assumir controle de todas as páginas imediatamente
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// ─── FETCH: network-first para index.html (sempre buscar versão nova) ─
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Para index.html e a raiz: SEMPRE tentar a rede primeiro
  if (url.pathname.endsWith('index.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(networkResponse => {
          // Se veio da rede com sucesso, atualiza o cache
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Se offline, serve do cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para os demais assets: cache-first (mais rápido)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request, { cache: 'no-store' })
        .then(networkResponse => {
          // Cacheia novos assets que não estavam no cache
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        });
    })
  );
});
