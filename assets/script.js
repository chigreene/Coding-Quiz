var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var questionDisplay = document.querySelector("#question");
var answersDisplay = document.querySelector("#answer");

var timer = 60
var questionIndex = 0;
var questions = [
    { question: "What does HTML stand for?", 
    answers: ["Hyper Text Markup Language", "Hyper Text Modality Language", "Human Text Made Language", "Human Text Modality Language"], 
    correct: 1 }, { question: "What does CSS stand for?", 
    answers: ["Computer System Standard", "Cascading Style Sheet", "Creative Styling Sheet", "Cascading System Standard"], 
    correct: 1}
]

// Event listener for the start button
startButton.addEventListener('click', function() {
    startGame();
})

// Function to start the game
function startGame() {
    questionIndex = 0;
    // when is question index increase
    timer = 60;
    displayQuestion();
    // Start the timer
    var interval = setInterval(function() {
      timer--;
      timerDisplay.textContent = "Time Left: " + timer;
      if (timer <= 0 || questionIndex >= questions.length) {
        clearInterval(interval);
        endGame();
      }
    }, 1000);
  }

  function displayQuestion() {
    var question = questions[questionIndex];
    questionDisplay.textContent = question.question;
    answersDisplay.innerHTML = "";
    // answer display seems broken
    for (var i = 0; i < question.answers.length; i++) {
      var button = document.createElement("button");
      button.textContent = question.answers[i];
      // Using data attributes to store the index of the answer
      button.setAttribute("data-index", i);
      button.setAttribute("style", "margin: 10px");
      button.addEventListener('click', selectAnswer);
      answersDisplay.appendChild(button);
    }
  }

  // Function to handle answer selection
function selectAnswer(event) {
    var answerIndex = event.target.getAttribute("data-index");
    if (parseInt(answerIndex) === questions[questionIndex].correct) {
      // Correct answer
    } else {
      // Incorrect answer - subtract time
      timer -= 10;
    }
    questionIndex++;
    if (questionIndex < questions.length) {
      displayQuestion();
    }
  }
  
  // Function to end the game
  function endGame() {
    scoreForm.style.display = "block";
  }
  