// ======================= 
// CARRUSEL (MANUAL)
// =======================

let index = 0;
// Variable que controla la posición actual del carrusel (índice del array de imágenes)

const slides = document.querySelectorAll(".carousel img");
// Selecciona todas las imágenes dentro del carrusel (NodeList)

const next = document.getElementById("next");
const prev = document.getElementById("prev");
// Referencias a los botones de navegación


// MOSTRAR SLIDE
function mostrarSlide(i){
  // Función que muestra una imagen concreta según el índice recibido

  slides.forEach(slide => slide.classList.remove("active"));
  // Recorre todas las imágenes y elimina la clase "active" (ocultándolas)

  slides[i].classList.add("active");
  // Añade la clase "active" solo a la imagen seleccionada (la hace visible)
}


// SIGUIENTE
next.addEventListener("click", () => {
  // Evento al hacer clic en botón "siguiente"

  index = (index + 1) % slides.length;
  // Incrementa el índice y usa módulo (%) para volver al inicio si llega al final

  mostrarSlide(index);
  // Llama a la función para mostrar la nueva imagen
});


// ANTERIOR
prev.addEventListener("click", () => {
  // Evento al hacer clic en botón "anterior"

  index = (index - 1 + slides.length) % slides.length;
  // Decrementa el índice y evita valores negativos usando módulo

  mostrarSlide(index);
  // Muestra la imagen correspondiente
});


// =======================
// MENÚ (SPA)
// =======================

const menu = document.getElementById("menu");
// Referencia al menú de navegación

const hamburger = document.getElementById("hamburger");
// Referencia al icono de menú hamburguesa

const enlaces = document.querySelectorAll(".menu a");
// Selecciona todos los enlaces del menú

hamburger.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    hamburger.click();
  }
});

// TOGGLE MENÚ
hamburger.addEventListener("click", (e) => {

  e.stopPropagation();
  // Evita que el evento se propague al document (importante para no cerrar el menú inmediatamente)

  menu.classList.toggle("active");
  // Muestra u oculta el menú en móvil

  hamburger.classList.toggle("active");
  // Activa la animación del icono hamburguesa
});


// CAMBIO DE SECCIÓN
enlaces.forEach(enlace => {

  enlace.addEventListener("click", () => {

    const id = enlace.dataset.seccion;
    // Obtiene el valor del atributo data-seccion (identifica la sección a mostrar)

    // ocultar todas las secciones
    document.querySelectorAll("section").forEach(sec => {
      sec.classList.remove("active");
    });
    // Recorre todas las secciones y las oculta

    // mostrar la seleccionada
    document.getElementById(id).classList.add("active");
    // Activa la sección correspondiente

    // marcar enlace activo
    enlaces.forEach(e => e.classList.remove("active"));
    // Elimina clase activa de todos los enlaces

    enlace.classList.add("active");
    // Marca el enlace actual como activo

    // cerrar menú en móvil
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    // Oculta menú tras selección (mejora UX en móviles)
  });
});

    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });

// CERRAR MENÚ AL HACER CLICK FUERA
document.addEventListener("click", (e) => {

  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    // Comprueba si el click NO está dentro del menú ni del botón hamburguesa

    menu.classList.remove("active");
    hamburger.classList.remove("active");
    // Cierra el menú automáticamente
  }
});


// =======================
// GALERÍA
// =======================

function changeImg(img){
  // Función que cambia la imagen principal al hacer clic en miniatura

  document.getElementById("mainImg").src = img.src;
  // Sustituye la imagen principal por la seleccionada
}


// HOVER EN MINIATURAS
const thumbnails = document.querySelector(".thumbnails");
// Contenedor de miniaturas

const mainImg = document.getElementById("mainImg");
// Imagen principal

if (thumbnails && mainImg) {
  // Comprueba que los elementos existen (evita errores)

  thumbnails.addEventListener("mouseover", (e) => {

    if (e.target.tagName === "IMG") {
      // Verifica que el elemento sobre el que se pasa el ratón es una imagen

      mainImg.src = e.target.src;
      // Cambia la imagen principal automáticamente
    }
  });
}


// =======================
// VALIDACIÓN FORMULARIO
// =======================

function validar(){

  let valido = true;

  // LIMPIAR ERRORES
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
  document.querySelectorAll("input").forEach(i => i.classList.remove("error-input"));

  // INPUTS
  let nombre = document.getElementById("nombre");
  let email = document.getElementById("email");
  let fecha = document.getElementById("fecha");

  // ======================
  // VALIDAR NOMBRE
  // ======================
  if(nombre.value.trim() === ""){
    document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
    nombre.classList.add("error-input");
    valido = false;
  }

  // ======================
  // VALIDAR EMAIL
  // ======================
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email.value.trim() === ""){
    document.getElementById("errorEmail").textContent = "El email es obligatorio";
    email.classList.add("error-input");
    valido = false;

  } else if(!regex.test(email.value)){
    document.getElementById("errorEmail").textContent = "Formato de email no válido";
    email.classList.add("error-input");
    valido = false;
  }

  // ======================
  // VALIDAR FECHA
  // ======================
  if(fecha.value === ""){
    document.getElementById("errorFecha").textContent = "La fecha es obligatoria";
    fecha.classList.add("error-input");
    valido = false;
  }

  // ======================
  // RESULTADO FINAL
  // ======================
  if(!valido){
    alert("⚠️ Revisa los campos obligatorios antes de enviar la reserva.");
    return false;
  }

  //ENVIADO CON ÉXITO
  alert("✅ Reserva enviada correctamente. ¡Te esperamos!");

  // LIMPIAR FORMULARIO
  document.querySelector(".formulario").reset();

  return false; // SPA
}

// RECUPERAR SECCIÓN ACTIVA
const seccionGuardada = localStorage.getItem("seccionActiva");

if(seccionGuardada){
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(seccionGuardada).classList.add("active");

  enlaces.forEach(e => e.classList.remove("active"));
  document.querySelector(`[data-seccion="${seccionGuardada}"]`).classList.add("active");
}