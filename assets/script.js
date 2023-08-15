var startButton = document.querySelector("#start-button");
var timerDisplay = document.querySelector("#timer");
var questionDisplay = document.querySelector("#question");
var answersDisplay = document.querySelector("#answer");

var startButton = document.getElementById('start-button');
var grade = document.querySelector("#grade");
var h2El = document.querySelector("h2")

var scoreForm = document.getElementById('score-form');
var initialsInput = document.getElementById('initials');
var saveScoreButton = document.getElementById('save-score');
var scoreboard = document.getElementById('scoreboard');
var scoreList = document.getElementById('score-list');

var timer = 60
var questionIndex = 0;
var questions = [
    { question: "What does HTML stand for?", 
    answers: ["Hyper Text Markup Language", "Hyper Text Modality Language", "Human Text Made Language", "Human Text Modality Language"], 
    correct: 0 }, 
    { question: "What does CSS stand for?", 
    answers: ["Computer System Standard", "Cascading Style Sheet", "Creative Styling Sheet", "Cascading System Standard"], 
    correct: 1},
    { question: "How would you iterate through an array?", 
    answers: ["For Loop", "Repeating Loop", ".repeat", ".iterateText"], 
    correct: 0 }, 
    { question: "What does DOM stand for?", 
    answers: ["Digitally Operating Math", "DOS Operating Machine", "Domain Orientated Model", "Document Object Model"], correct: 3}
]

// Event listener for the start button
startButton.addEventListener('click', function() {
    startGame();
})

// Function to start the game
function startGame() {
    startButton.disabled = true;
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
      grade.textContent = " Last answer was correct!!"
    } else {
      // Incorrect answer - subtract time
      timer -= 10;
      grade.textContent = "Last answer was incorrect."
    }
    questionIndex++;
    if (questionIndex < questions.length) {
      displayQuestion();
    }
  }
  
  // Function to end the game
  function endGame() {
    startButton.disabled = false;
    scoreForm.style.display = "block";
  }

 // Event listener for saving the score
saveScoreButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    var initials = initialsInput.value.trim();
    // Saving to local storage
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials: initials, score: timer });
    localStorage.setItem("scores", JSON.stringify(scores));
    displayScoreboard(); //display the scoreboard
  });
  
  // answersDiv.addEventListener('click', function(event) {
  //   var element = event.target;
  //   if (element.matches("button")) {
  //     var answer = element.getAttribute("data-answer");
  //     // Check if the answer is correct
  //     if (answer === questions[questionIndex].correctAnswer) {
  //       // Move to the next question
  //       questionIndex++;
  //       if (questionIndex < questions.length) {
  //         // Display the next question if there are more questions
  //         displayQuestion();
  //       } else {
  //         // End the game if there are no more questions
  //         endGame();
  //       }
  //     } else {
  //       // If the answer is incorrect, you can handle it here (e.g., subtract time)
  //     }
  //   }
  // });
  
  // TODO: Implement display of high scores, reset functionality, etc.
  function displayScoreboard() {
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores = sortScores(scores);
    scoreList.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
      var li = document.createElement("li");
      li.textContent = scores[i].initials + ": " + scores[i].score;
      scoreList.appendChild(li);
    }
    scoreboard.setAttribute("style", "display: flex;");
    h2El.setAttribute("Style", "display: block")
    
  }
  
  function sortScores(scores) {
    return scores.sort(function(a, b) {
      return b.score - a.score; // Sort in descending order by score
    });
  }