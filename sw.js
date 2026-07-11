const CACHE_NAME = 'painel-mestre-v1';
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
