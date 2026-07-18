const CACHE_NAME = 'painel-mestre-v3';
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

// ─── INSTALL: cacheia apenas assets estáticos (ícones) ────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        assets.map(asset =>
          fetch(asset, { cache: 'reload' })
            .then(response => {
              if (response.ok) cache.put(asset, response);
            })
            .catch(() => {})
        )
      );
    })
  );
});

// ─── ACTIVATE: limpa caches antigos ────────────────────────────────
self.addEventListener('activate', event => {
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

// ─── FETCH: Estratégia "Network-Only" para o conteúdo e index ───────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Se for o conteúdo (data.txt) ou o index, NUNCA usar cache se estiver online
  // Isso garante que o commit novo apareça na hora
  if (url.pathname.endsWith('data.txt') || url.pathname.endsWith('index.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(networkResponse => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Se falhar a rede (offline), aí sim usa o cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para ícones e manifest: cache-first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
