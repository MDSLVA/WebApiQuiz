//The variables startButton, timerEl, questionsEl, and answersEl are used to store references to specific elements in the HTML document.
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelectorAll(".answers button");

//quizQuestionsIndex keeps track of the current question index.
var quizQuestionsIndex = 0;

//quizQuestions is an array of objects, where each object represents a question and its corresponding answer choices.
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: ["<script>", "<javascript>", "<scripting>", "<js>"],
    correctAnswer: "<script>"
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answer: ["alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');"],
    correctAnswer: "alert('Hello World');"
  },
  {
    question: "How does a FOR loop start?",
    answer: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
    correctAnswer: "for (i = 0; i <= 5; i++)"
  },
];
//timerCount is the initial countdown value for the timer.
var timerCount = 60;
var interval;

//The startButton element is assigned a click event listener that calls the startQuiz function when clicked.
startButton.addEventListener('click', function() {
  startQuiz();
  startButton.style.display = 'none';
});

//The startQuiz function starts the timer and displays the first question.
function startQuiz() {
  startTimer();
  displayQuestion();
}

//The startTimer function updates the timer element every second and checks if the timer has reached zero.
function startTimer() {
  timerEl.textContent = timerCount;

  interval = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;

    if (timerCount === 0) {
      clearInterval(interval);
      terminateQuiz();
    }
  }, 1000);
}

//The displayQuestion function retrieves the current question from the quizQuestions array and displays it along with the answer choices.
function displayQuestion() {
  var question = quizQuestions[quizQuestionsIndex];
  questionsEl.textContent = question.question;

  //The for loop with answer buttons is used in the displayQuestion function to assign event listeners to each answer button.
  var answerButtons = document.querySelectorAll(".answers button");
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].textContent = question.answer[i];
  }

  answerButtons.forEach(function (button) {
    button.addEventListener("click", checkAnswer);
  });
}

//The checkAnswer function is called when an answer button is clicked.
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var question = quizQuestions[quizQuestionsIndex];

  if (selectedAnswer === question.correctAnswer) {
    console.log("Correct!");
  } else {
    timerCount -= 10;
    console.log("Wrong!");
    timerEl.textContent = timerCount;
  }

  quizQuestionsIndex++;
  if (quizQuestionsIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    terminateQuiz();
  }
}


//The terminateQuiz function is called when the timer reaches zero or all questions are answered. It clears the timer interval, prompts the user to enter their initials, stores the user's score and initials in local storage, and logs the termination details to the console.
function terminateQuiz() {
  clearInterval(interval);

  var initials = prompt("Enter your initials:");
  var score = timerCount;

  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(highScores));

  console.log("Quiz terminated");
  console.log("Initials:", initials);
  console.log("Score:", score);
}