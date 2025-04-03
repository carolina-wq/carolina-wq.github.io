//   CONSTANTE CACHE
       const CACHE_NAME='tareas-cache-v1';
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
            '/index.html',
            '/styles.css',
            '/script.js'
         ]);
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




// Escucha el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
    // Previene que el navegador muestre el diálogo de instalación inmediatamente
    event.preventDefault();

    // Almacena el evento para que se pueda mostrar el diálogo de instalación más tarde
    let deferredPrompt = event;

    // Muestra un botón de instalación personalizado o realiza alguna acción
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Oculta el botón de instalación
        installButton.style.display = 'none';

        // Muestra el diálogo de instalación
        deferredPrompt.prompt();

        // Espera a que el usuario responda al diálogo de instalación
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó la instalación');
            } else {
                console.log('El usuario rechazó la instalación');
            }
            deferredPrompt = null;
        });
    });
});

// Escucha el evento appinstalled
window.addEventListener('appinstalled', (event) => {
    console.log('La aplicación ha sido instalada con éxito');
});






