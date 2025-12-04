const SHELL_CACHE = 'app-shell-v7';
const API_CACHE = SHELL_CACHE;

// Базовый набор для оффлайн-загрузки интерфейса
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-96x96.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/vite.svg',
];

// Установка - кешируем App Shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => {
      return cache.addAll([
        APP_SHELL
      ]);
    })
  );
});

// Активация - удаляем старые кеши и берем управление
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      Promise.all(
        keys.filter(key => key !== SHELL_CACHE).map(key => caches.delete(key))
      )
    })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Только GET-запросы
  if (request.method !== 'GET') return;

  // Пропускаем приватные/внешние авторизационные вызовы
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('identitytoolkit')
  ) {
    return;
  }

  // Навигация: SPA fallback на кешированный index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(SHELL_CACHE).then(cache => cache.put('/index.html', copy));
          }
          return response;
        })
        .catch(() =>
          caches.match('/index.html').then(
            cached =>
              cached ||
              new Response('Offline', {
                status: 503,
                headers: { 'Content-Type': 'text/html' },
              })
          )
        )
    );
    return;
  }

  // Статика того же домена
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request)
          .then(response => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(SHELL_CACHE).then(cache => cache.put(request, copy));
            }
            return response;
          })
          .catch(() =>
            caches.match(request).then(
              res =>
                res ||
                new Response('', {
                  status: 503,
                  statusText: 'Offline',
                  headers: { 'Content-Type': 'application/javascript' },
                })
            )
          );
      })
    );
    return;
  }

  // Публичный Rick & Morty API
  if (url.hostname === 'rickandmortyapi.com' && url.pathname.startsWith('/api/character')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache =>
        fetch(request)
          .then(response => {
            if (response && response.ok) {
              const copy = response.clone();
              cache.put(request, copy);
            }
            return response;
          })
          .catch(() =>
            cache.match(request).then(
              cached =>
                cached ||
                new Response(
                  JSON.stringify({ message: 'Offline. Cached data unavailable.' }),
                  { status: 503, headers: { 'Content-Type': 'application/json' } }
                )
            )
          )
      )
    );
    return;
  }
});
