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