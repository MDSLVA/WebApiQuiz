var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelectorAll (".answers button")

var quizQuestionsIndex = 0;
var quizQuestions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answer: ["<script>", "<javascript>", "<scripting>", "<js>"],
      correctAnswer: [0]
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      answer: ["alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');"],
      correctAnswer: [0]
    },
    
    {
      question: "How does a FOR loop start?",
      answer: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
      correctAnswer: [1]
    },

    {
      question: "Which of the following is correct about JavaScript?",
      answer: ["JavaScript is an Object-Based language", "JavaScript is Assembly-language", "JavaScript is an Object-Oriented language","JavaScript is a High-level language"],
      correctAnswer: [2]
    },
  ];

var timerCount = 60;

startButton.addEventListener('click', function() {
  startQuiz();
  startButton.style.display = 'none';
});

function startQuiz() {
  startTimer()
  displayQuestion ()
}



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

  function displayQuestion () {
    var questionDisplayed = quizQuestions [quizQuestionsIndex];
    questionsEl.textContent = questionDisplayed.question;
    answersEl.forEach(function(button, index) {
    button.textContent = questionDisplayed.answer[index];
    button.addEventListener ('click', function(){
        checkAnswer(index)
    })
      });
      
  }
  function checkAnswer(selectedIndex) {
    var question = quizQuestions[quizQuestionsIndex];
    if (question.correctAnswer.indexOf(selectedIndex) >= 0) {
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
  
      timerCount -= 10;
      timerEl.textContent = timerCount;
    }
  
    quizQuestionsIndex++;
    if (quizQuestionsIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      terminateQuizQuiz();
    }
  }

  function terminateQuiz() {
    clearInterval(interval);
    saveScore();
    displayScore();
  }
    