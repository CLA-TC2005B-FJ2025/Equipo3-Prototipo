document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("gridContainer");
    const modal = document.getElementById("questionModal");
    const questionText = document.getElementById("questionText");
    const answersList = document.getElementById("answersList");
    const closeBtn = document.querySelector(".close");
  
    // Generar 225 cuadriculas (15x15)
    for (let i = 0; i < 225; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      
      // Asignar atributos de ejemplo para la pregunta y respuestas
      gridItem.setAttribute("data-question", `Pregunta ${i+1}: ¿Ejemplo de pregunta?`);
      gridItem.setAttribute("data-answer1", "Respuesta A");
      gridItem.setAttribute("data-answer2", "Respuesta B");
      gridItem.setAttribute("data-answer3", "Respuesta C");
      gridItem.setAttribute("data-answer4", "Respuesta D");
      // Por ejemplo, marcamos la respuesta 2 como correcta en todos (puedes cambiarlo según tu lógica)
      gridItem.setAttribute("data-correct", "2");
      
      gridContainer.appendChild(gridItem);
    }
  
    // Función para mostrar el modal con la pregunta y respuestas
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
      item.addEventListener("click", function() {
        const question = this.getAttribute("data-question");
        const answer1 = this.getAttribute("data-answer1");
        const answer2 = this.getAttribute("data-answer2");
        const answer3 = this.getAttribute("data-answer3");
        const answer4 = this.getAttribute("data-answer4");
        const correct = this.getAttribute("data-correct");
  
        // Mostrar la pregunta
        questionText.textContent = question;
        
        // Limpiar respuestas previas
        answersList.innerHTML = "";
        
        // Crear array con respuestas
        const answers = [answer1, answer2, answer3, answer4];
        
        // Generar elementos de lista para cada respuesta
        answers.forEach((ans, index) => {
          const li = document.createElement("li");
          li.textContent = ans;
          li.setAttribute("data-index", index + 1);
          li.style.cursor = "pointer";
          
          // Validar respuesta al hacer clic
          li.addEventListener("click", function() {
            if (this.getAttribute("data-index") === correct) {
              alert("¡Respuesta correcta!");
            } else {
              alert("Respuesta incorrecta.");
            }
            modal.style.display = "none";
          });
          answersList.appendChild(li);
        });
        
        // Mostrar el modal
        modal.style.display = "block";
      });
    });
  
    // Cerrar modal al hacer clic en la "X"
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  