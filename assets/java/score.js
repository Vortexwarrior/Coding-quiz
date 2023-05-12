
var highScoresEl = document.querySelector("#highscores");
var clearBtnEl = document.querySelector("#clear");
let scoreArr = JSON.parse(localStorage.getItem("highScores"));

if(scoreArr != null) {
    if(scoreArr.length > 1){
    scoreArr.sort(function(a,b) {
    return b.score -a.score;})
    console.log(scoreArr);
    }
    scoreArr.forEach(element => {
    let scoreList = document.createElement("li");
    scoreList.textContent = element.initials + ": " + element.score;
    highScoresEl.appendChild(scoreList);
    });
}
function clearData() {
    localStorage.clear();
    highScoresEl.innerHTML = "";
}

clearBtnEl.addEventListener("click", clearData)