//   CONSTANTE CACHE
       const CACHE_NAME='tareas-cache-v2';
       const urlsToCache=[
        './',
        './index.html',
        './carpeta style/style1.css',
        './carpeta java/java1.js',
        './imagenes/192x192.png',
        './imagenes/512x512.png',
       ];



      self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open('app-cache').then((cache) => {
         return cache.addAll([
            '/',
            './index.html',
            './carpeta style/style.css',
            './carpeta java/java1.js'
         ]);
      })
   );
});


self.addEventListener('activate', event => {
       const cacheWhiteList = [CACHE_NAME];
       event.waitUntil(
              caches.keys().then(cacheNames => {
                     return Promise.all (
                            cacheNames.map(cacheName =>{
                                   if (!cacheWhitelist.includes (cacheName)){
                                          return caches.delete(cacheName);
                                   }
                            })
                     );
              })
       );
});


       self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
          .then(response => {
            return response || fetch(event.request);
          }).catch(error => {
                 cosole.error('fetch falled; returnig offline page instead.', error);
        );
       });











