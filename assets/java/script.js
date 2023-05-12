var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
// Selecting HTML elements that we are interacting with
const time = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const questionsScreen = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const initials = document.querySelector("#initials");
const scores = document.querySelector("#scores");

// Declare the variables that we need for the program
let userChoice = "";
let questionCounter = 0;
let userScore = 0;
let isEndOfGame = false;
let timer;
let timerCount;
let userInitials = "";
Array.length
array = ['a,b,c,d']
function startGame() {
    startScreen.classList.add("hide");
    timerCount = 70;
    questionsScreen.classList.remove("hide");
    startCounting();
}
function showQuestions(questions, quizContainer){
	var output = [];
	var answers;
	for(var i=0; i<questions.length; i++){
		answers = [];
		for(letter in questions[i].answers){
			answers.push(
				'<label>'
					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ questions[i].answers[letter]
				+ '</label>'
			);
		}
		output.push(
			'<div class="question">' + questions[i].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);
	}
	quizContainer = output.join('');
}
showQuestions(questions, quizContainer);

function showResults(questions, quizContainer, resultsContainer){
	var answerContainers = quizContainer.querySelectorAll('.answers');
	var userAnswer = '';
	var numCorrect = 0;
	for(var i=0; i<questions.length; i++){
		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
		if(userAnswer===questions[i].correctAnswer){
			numCorrect++;
			answerContainers[i].style.color = 'lightgreen';
		}
		else{
			answerContainers[i].style.color = 'red';
		}
	}
	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}
submitButton.onclick = function(){
	showResults(questions, quizContainer, resultsContainer);
}

function startCounting() {
    timer = setInterval(function() {
      timerCount--;
      time.textContent = timerCount;
      if (timerCount === 0 || questionCounter > 5) {
        clearInterval(timer);
      }
    }, 1000);
}
function callEndScreen() {
  time.textContent = timerCount;
  endScreen.classList.remove("hide");
  finalScore.textContent = userScore;
}

function saveScore(_event) {
  if (initials.value === "") {
    return;
  } else {
  userInitials = initials.value;
  console.log(userInitials);
  localStorage.setItem("userInitials", userInitials);
  localStorage.setItem("userScore", userScore);
  initials.textContent = "";
  location.replace("highscores.html");
  }
}
function highScores(){
    endScreen.setAttribute("style", "display:none;");
    scores.removeAttribute("style");
}
// Add event listener to button
startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", saveScore);