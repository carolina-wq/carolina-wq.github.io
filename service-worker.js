//   CONSTANTE CACHE
       const CACHE_NAME='tareas-cache-v1';
       const urlsToCache=[
        './',
        './copia de codigo.html',
        './carpeta style/style1.css',
        './carpeta java/java1.js',
        './imagenes/pollo192.webp',
        './imagenes/gato512.webp',
        
       ];


       self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
          .then(cache => {
             return cache.addAll(urlsToCache);
          })
        );
       });




       self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
          .then(response => {
            return response || fetch(event.request);
          })
        );
       });
