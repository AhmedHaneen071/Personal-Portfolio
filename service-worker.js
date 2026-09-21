/* AHMED HANEEN — portfolio service worker (network-first) */
const CACHE = 'portfolio-v1';
const SHELL = ['./index.html', './style.css', './script.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // leave CDNs + APIs alone

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches
          .open(CACHE)
          .then((cache) => cache.put(req, copy))
          .catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then(
          (match) =>
            match ||
            (req.mode === 'navigate' ? caches.match('./index.html') : undefined)
        )
      )
  );
});