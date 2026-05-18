const CACHE_NAME = 'dhan-pos-v2';
const FILES_TO_CACHE = [
  './admin.html',
  './viewer.html',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // index.html = Network only. No offline access
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/ghost/') || url.pathname.endsWith('/ghost')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          `<html>
            <body style="font-family:Poppins,sans-serif;text-align:center;padding:50px;">
              <h2>🔌 No Internet Connection</h2>
              <p>Online store requires internet connection.</p>
              <button onclick="window.location.reload()" style="padding:12px 24px;background:#ff6b35;color:white;border:none;border-radius:8px;font-weight:700;">Retry</button>
            </body>
          </html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      })
    );
    return;
  }

  // admin.html, viewer.html = Cache first. Pwede offline
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
