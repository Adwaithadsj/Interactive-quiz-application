const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Coded Style Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

let currentIndex = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");

function showQuestion(index) {
  const currentQ = questions[index];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";
  currentQ.options.forEach((optionText) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = optionText;
    div.addEventListener("click", () => selectOption(div, currentQ.answer));
    optionsEl.appendChild(div);
  });
  nextBtn.disabled = true;
}

function selectOption(selectedDiv, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => opt.classList.remove("selected"));
  selectedDiv.classList.add("selected");
  nextBtn.disabled = false;
  if (selectedDiv.textContent === correctAnswer) {
    selectedDiv.dataset.correct = true;
  } else {
    selectedDiv.dataset.correct = false;
  }
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".option.selected");
  if (selected && selected.dataset.correct === "true") {
    score++;
  }
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion(currentIndex);
  } else {
    displayScore();
  }
});

function displayScore() {
  document.getElementById("quiz-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreEl.textContent = `${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion(currentIndex);
}

showQuestion(currentIndex);
