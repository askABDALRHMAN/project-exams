const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Mark Twain",
      "William Shakespeare",
      "J.K. Rowling",
      "Charles Dickens",
    ],
    correctAnswer: "William Shakespeare",
  },
];

let currentQuestion = 0;
const userAnswers = new Array(questions.length).fill(null);

const quizContainer = document.getElementById("quiz-container");
const progressBar = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitContainer = document.getElementById("submitContainer");
const messageBox = document.getElementById("messageBox");

function renderQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="answers">
          ${q.options
            .map((opt, i) => {
              const checked =
                userAnswers[currentQuestion] === opt ? "checked" : "";
              return `<label><input type="radio" name="answer" value="${opt}" ${checked}> ${opt}</label>`;
            })
            .join("")}
        </div>
      `;

  document.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      userAnswers[currentQuestion] = e.target.value;
    });
  });

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";

  prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentQuestion === questions.length - 1 ? "none" : "inline-block";
  submitContainer.classList.toggle(
    "hidden",
    currentQuestion !== questions.length - 1
  );
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function submitQuiz() {
  let score = 0;
  const breakdown = [];

  userAnswers.forEach((answer, index) => {
    const correct = answer === questions[index].correctAnswer;
    breakdown.push({
      question: questions[index].question,
      userAnswer: answer,
      correctAnswer: questions[index].correctAnswer,
      correct,
    });
    if (correct) score++;
  });

  const percentage = Math.round((score / questions.length) * 100);

  localStorage.setItem("quizScore", percentage);
  localStorage.setItem("answerBreakdown", JSON.stringify(breakdown));

  messageBox.style.display = "block";

  setTimeout(() => {
    window.location.href = "result.html";
  }, 1000);
}

renderQuestion();
