const challenges = [
  {
    text: "Elige las figuras que siguen el patrón: rojo, azul, amarillo, rojo, azul...",
    options: [
      { text: "Rojo", class: "red" },
      { text: "Verde", class: "green" },
      { text: "Azul", class: "blue" },
      { text: "Amarillo", class: "yellow" },
    ],
    correct: ["Rojo", "Azul", "Amarillo"],
    type: "multi-select",
    disorderColors: true,
  },
  {
    text: "¿Cuál cofre contiene la llave? (divisible por 3 pero no por 5)",
    options: ["15", "18", "20"],
    correct: "18",
    type: "single-select",
  },
  {
    text: "Completa el patrón: 1, 2, 4, 8...",
    options: ["12", "14", "16", "18"],
    correct: "16",
    type: "single-select",
  },
  {
    text: "Selecciona los elementos que no encajan con el grupo: Triángulo, Cuadrado, Círculo, Pizza...",
    options: ["Triángulo", "Cuadrado", "Círculo", "Pizza"],
    correct: ["Pizza"],
    type: "multi-select",
  },
  {
    text: "¿Qué número sigue esta serie? 81, 27, 9, 3...",
    options: ["1", "2", "3", "1/3"],
    correct: "1",
    type: "single-select",
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

  if (challenge.disorderColors) {
    challenge.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.classList.add("option", "color-disorder", option.class);
      button.addEventListener("click", () => {
        button.classList.toggle("selected");
      });
      optionsDiv.appendChild(button);
    });

    nextBtn.style.display = "inline-block";
    nextBtn.onclick = checkMultiSelect;
  } else if (challenge.type === "multi-select") {
    challenge.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
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
  }
}
