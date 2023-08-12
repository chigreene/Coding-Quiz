var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var questionDisplay = document.querySelector("#question");
var questionDisplay = document.querySelector("#answer");

var timer = 60
var questionIndex = 0;
var questions = [
    {questions: "What does HTML stand for?", 
    answer: ["Hyper Text Markup Language", "Hyper Text Modality Language", "Human Text Made Language", "Human Text Modality Language"], 
    correct: 1 },
    {question: "What does CSS stand for?", 
    answer: ["Computer System Standard", "Cascading Style Sheet", "Creative Styling Sheet", "Cascading System Standard"], 
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
    // displayQuestion();
    // Start the timer
    var interval = setInterval(function() {
      timer--;
      timerDisplay.textContent = "Time Left: " + timer;
      if (timer <= 0 || questionIndex >= questions.length) {
        clearInterval(interval);
        // endGame();
      }
    }, 1000);
  }
