const challenges = [

  {
  text: "Selecciona los números que sean pares y no divisibles por 4.",
  options: [
    { text: "2", color: "blue" },
    { text: "6", color: "red" },
    { text: "8", color: "green" },
    { text: "10", color: "yellow" },
    { text: "12", color: "purple" }
  ],
  correct: ["2", "6", "10"],
  type: "multi-select",
},

  {
  text: "Selecciona las palabras que siguen el patrón 'consonante-vocal-consonante'.",
  options: [
    { text: "Sol", color: "blue" },
    { text: "Casa", color: "red" },
    { text: "Pan", color: "green" },
    { text: "Juez", color: "purple" },
    { text: "Cine", color: "yellow" }
  ],
  correct: ["Sol"],
  type: "multi-select",
},

  {
  text: "Selecciona las figuras que aparecen dos veces en esta secuencia: 🟢🔴🔵🟡🔴🟢🔵🔵",
  options: [
    { text: "🔵", color: "blue" },
    { text: "🔴", color: "red" },
    { text: "🟡", color: "yellow" },
    { text: "🟢", color: "green" }
  ],
  correct: ["🔵", "🟢", "🔴"],
  type: "multi-select",
},

  {
    text: "Selecciona las figuras que siguen el patrón: rojo, azul, amarillo, rojo, azul...",
    options: [
      { text: "Rojo", color: "blue" },
      { text: "Verde", color: "yellow" },
      { text: "Azul", color: "red" },
      { text: "Amarillo", color: "green" }
    ],
    correct: ["Rojo", "Azul", "Amarillo"],
    type: "multi-select",
  },
  {
    text: "¿Cuál número sigue la serie? 2, 4, 8, 16, 32...",
    options: ["48", "64", "128", "256"],
    correct: "64",
    type: "single-select",
  },
  {
    text: "Selecciona los números primos menores de 20.",
    options: [
      { text: "4", color: "blue" },
      { text: "7", color: "green" },
      { text: "15", color: "red" },
      { text: "19", color: "yellow" },
      { text: "13", color: "purple" }
    ],
    correct: ["7", "13", "19"],
    type: "multi-select",
  },
  {
    text: "¿Cuál cofre tiene la llave? (Número impar divisible entre 3 pero no entre 5)",
    options: ["15", "21", "27", "33"],
    correct: "21",
    type: "single-select",
  },
  {
    text: "Selecciona los elementos que NO encajan con el grupo: Cuadrado, Círculo, Triángulo, Pizza.",
    options: ["Cuadrado", "Círculo", "Triángulo", "Pizza"],
    options: [
      { text: "Cuadrado", color: "blue" },
      { text: "Círculo", color: "green" },
      { text: "Triángulo", color: "red" },
      { text: "Pizza", color: "yellow" },
    ],
    correct: ["Pizza"],
    type: "multi-select",
  },
  {
    text: "Encuentra los múltiplos de 3 que también sean menores de 15.",
    options: ["6", "9", "12", "15", "18"],
     options: [
      { text: "6", color: "blue" },
      { text: "9", color: "green" },
      { text: "12", color: "red" },
      { text: "15", color: "yellow" },
      { text: "18", color: "purple" },
    ],
    correct: ["6", "9", "12"],
    type: "multi-select",
  },
  {
  text: "Encuentra el número que sigue en la serie: 1, 2, 4, 7, 11, 16...",
  options: ["20", "21", "22", "23"],
  correct: "22",
  type: "single-select",
  },
  {
  text: "Selecciona las imágenes que siguen este patrón: 🌕🌗🌑🌒🌕...",
  options: [
    { text: "🌕", color: "yellow" },
    { text: "🌗", color: "purple" },
    { text: "🌑", color: "black" },
    { text: "🌒", color: "white" },
    { text: "🌓", color: "blue" }
  ],
  correct: ["🌕", "🌗", "🌑", "🌒"],
  type: "multi-select",
},




];


let currentChallenge = 0;

const startBtn = document.getElementById("start-btn");
const challengeArea = document.getElementById("challenge-area");
const challengeText = document.getElementById("challenge-text");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  challengeArea.style.display = "block";
  loadChallenge();
});

function loadChallenge() {
  feedback.textContent = "";
  optionsDiv.innerHTML = "";
  nextBtn.style.display = "none";

  const challenge = challenges[currentChallenge];
  challengeText.textContent = challenge.text;

  if (challenge.type === "multi-select") {
    challenge.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.style.color = option.color;
      button.classList.add("option");
      button.addEventListener("click", () => {
        button.classList.toggle("selected");
      });
      optionsDiv.appendChild(button);
    });

    nextBtn.style.display = "inline-block";
    nextBtn.onclick = checkMultiSelect;
  } else {
    challenge.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option");
      button.addEventListener("click", () => {
        checkAnswer(option);
      });
      optionsDiv.appendChild(button);
    });
  }
}

function checkMultiSelect() {
  const challenge = challenges[currentChallenge];
  const selected = Array.from(document.querySelectorAll(".option.selected")).map(
    (btn) => btn.textContent
  );

  if (JSON.stringify(selected.sort()) === JSON.stringify(challenge.correct.sort())) {
    feedback.textContent = "¡Correcto!";
    nextBtn.textContent = "Continuar";
    nextBtn.onclick = nextChallenge;
  } else {
    feedback.textContent = "Intenta de nuevo.";
  }
}

function checkAnswer(selectedOption) {
  const challenge = challenges[currentChallenge];

  if (selectedOption === challenge.correct) {
    feedback.textContent = "¡Correcto!";
    nextBtn.style.display = "inline-block";
    nextBtn.onclick = nextChallenge;
  } else {
    feedback.textContent = "Intenta de nuevo.";
  }
}

function nextChallenge() {
  currentChallenge++;
  if (currentChallenge < challenges.length) {
    loadChallenge();
  } else {
    challengeArea.innerHTML = "<p>¡Felicidades! Completaste todos los desafíos del samurái. 🥋</p>";
  showVictoryMessage(); // Muestra el mensaje al ganar

  }
}
// Función para mostrar el mensaje de victoria y el GIF
function showVictoryMessage() {
  const victoryMessage = document.getElementById("victory-message");
  const samuraiGif = document.getElementById("samurai-gif");

  // Establecer la URL del GIF (puedes reemplazarla con tu propio GIF)
  samuraiGif.src = "https://media1.tenor.com/m/R4d1f5wbUOcAAAAd/cheems-samurai.gif"; // GIF del samurái

  // Mostrar el mensaje y el GIF
  victoryMessage.style.display = "block";
}

// Lógica para llamar a la función cuando el jugador gane
if (gameIsWon) {
  showVictoryMessage();
}
