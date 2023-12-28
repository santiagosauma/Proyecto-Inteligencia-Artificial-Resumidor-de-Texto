const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

// Inicialmente, desactivamos el botón de enviar.
submitButton.disabled = true;

// Añadimos un escuchador de eventos al área de texto para verificar la longitud del texto.
textArea.addEventListener("input", verifyTextLength);
// Añadimos un escuchador de eventos al botón de enviar para procesar la solicitud.
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  // La propiedad e.target nos proporciona el elemento HTML que activó el evento, en este caso, el área de texto. Guardamos esto en una variable llamada 'textarea'.
  const textarea = e.target;

  // Verifica el valor del TextArea.
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // Habilita el botón cuando el área de texto tiene valor.
    submitButton.disabled = false;
  } else {
    // Deshabilita el botón cuando el área de texto está vacía.
    submitButton.disabled = true;
  }
}

function submitData(e) {

  // Esto se utiliza para añadir animación al botón de enviar.
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Envía el texto al servidor usando la API fetch

  // Nota: aquí podemos omitir el “baseUrl” que necesitábamos en Postman y simplemente usar un camino relativo a “/summarize” porque estaremos llamando a la API desde nuestro entorno!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // La respuesta será el texto resumido.
    .then(summary => {
      // ¡Haz algo con la respuesta resumida de la API!

      // Actualiza el área de texto de salida con el nuevo resumen.
      summarizedTextArea.value = summary;

      // Detiene la animación de carga giratoria.
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      // Registra el mensaje de error en consola.
      console.log(error.message);
    });
}
