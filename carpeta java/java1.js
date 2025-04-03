document.addEventListener("DOMContentLoaded", cargarTareas);
     function agregarTarea() {
        let input = document.getElementById("nuevaTarea");
        let texto = input.value.trim();


       
        if (texto !== "") {
            let lista = document.getElementById("tareas");
            let tarea = document.createElement("li");
            tarea.innerHTML = `${texto} <button onclick="eliminarTarea(this)">Borrar</button>`;
            lista.appendChild(tarea);
            guardarTareas();
            input.value =""; //Limpiar el campo después de agregar la tarea 
            input.focus();

        }
     
    }
     
     
       function eliminarTarea(boton) {
        let tarea = boton.parentElement;
        tarea.remove();
        guardarTareas();
       }

       function guardarTareas() {
         let tareas = [];
            document.querySelectorAll("#tareas li").forEach(tarea => {
               tareas.push(tarea.firstChild.textContent.trim());
           });
         localStorage.setItem("tareas", JSON.stringify(tareas));
       } 

       function cargarTareas() {
         let tareas =JSON.parse(localStorage.getItem("tareas")) || [];
         let lista = document.getElementById("tareas");
         tareas.forEach(texto => {
            let tarea = document.createElement("li");
            tarea.innerHTML = `${texto} <button onclick="eliminarTarea(this)">Eliminar</button>`;
            lista.appendChild(tarea);
        });
       }



        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(error) {
                    console.log('ServiceWorker registration failed: ', error);
                });
            });
        }
    




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
