var timerEl = document.getElementById('timer');
var highScore = document.getElementById('high-scores');
var text = document.getElementById('text');
var start = document.getElementById('button');
var head = document.getElementById('head');3
var answers = document.getElementById("answers")
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var isCorrect = document.getElementById("is-correct");
var storedUserName = document.getElementById("storeUserName");
var scoreList = document.getElementById("allScores");
var submit = document.getElementById("submit");

var score = 0;

var compare=[];
var takeFromTimer = 1;
var timerStop= 0;
var questions= [
    {
    question : "Commonly used data types of JavaScript DO NOT include: ",
    ChoiceA : "Booleans",
    ChoiceB : "Strings",
    ChoiceC : "Alerts",
    ChoiceD : "Numbers",
    Correct: "A"
},{
    question: "What is Javascript?",
    ChoiceA : "JavaScript is a scripting language used to make the website interactive",
    ChoiceB : "JavaScript is an assembly language used to make the website interactive",
    ChoiceC : "JavaScript is a compiled language used to make the website interactiv",
    ChoiceD : "None of the mentioned",
    Correct: "A"
},{
    question: "Which of the following is correct about JavaScript?",
    ChoiceA : "JavaScript is a High-level language",
    ChoiceB : "JavaScript is an Object-Oriented language",
    ChoiceC : "JavaScript is Assembly-language",
    ChoiceD : "JavaScript is an Object-Based language",
    Correct: "D"
},{
    question: "Arrays in JavaScript are defined by which of the following statements?",
    ChoiceA : "It is an ordered list of objects",
    ChoiceB : "It is an ordered list of string",
    ChoiceC : "It is an ordered list of values",
    ChoiceD : "It is an ordered list of functions",
    Correct: "C"
},{
    question: "Where is Client-side JavaScript code is embedded within HTML documents?",
    ChoiceA : "A URL that uses the special javascript:code",
    ChoiceB : "A URL that uses the special javascript:protocol",
    ChoiceC : "A URL that uses the special javascript:encoding",
    ChoiceD : " A URL that uses the special javascript:stack",
    Correct: "B"    
}
];
var lastQuestion = questions.length -1;
var currentQuestion = 0;
var timeLeft = 50;


function renderQuestion(){
    start.style.display = "none"
    text.textContent = undefined;
    var q = questions[currentQuestion];
    head.textContent = q.question;
    choiceA.style.display = "block"
    choiceB.style.display = "block"
    choiceC.style.display = "block"
    choiceD.style.display = "block"
    isCorrect.style.display = "block"
    choiceA.textContent = q.ChoiceA;
    choiceB.textContent = q.ChoiceB;
    choiceC.textContent = q.ChoiceC;
    choiceD.textContent = q.ChoiceD;
    
}
function countdown(){
    timeLeft = 50;
    var timeInterval =0;
        return{
            start(){
                timeInterval = setInterval(timer,1000)
            },
            stop(){
                clearInterval(timeInterval);
            }
        }  
}
var counting = countdown();
function timer(){
    if(timeLeft >= 1){
        timerEl.textContent = timeLeft;
        timeLeft--;
        if(takeFromTimer == 0){
            takeFromTimer = 1;
            timeLeft = timeLeft-10;
        
        }   
    }
    else if(timeLeft ==0){
        timerEl.textContent = 'Time is up!';
        timeIsUp();
        scoreRender();
    }
}

function timeIsUp(){
    storedUserName.style.display = "none";
    scoreList.style.display = "none";
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    head.style.display = "none";
}
function checkAnswer(answer){
    if(answer == questions[currentQuestion].Correct){
        takeFromTimer = 1;
        score++;
        isCorrect.textContent = "Right!"   
    }
    else{
        takeFromTimer = 0;
        isCorrect.textContent = "Wrong :("
    }
    if(currentQuestion < lastQuestion){

        currentQuestion++;
        renderQuestion();
    }
    else if(timeLeft > 1){
        scoreRender();   
    }
}

function scoreRender(){
    counting.stop();
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    isCorrect.style.display = "none"
    head.textContent = "All Done!"
    text.textContent = "Score: " + score;
    getInfo(score);
}

function tryAgain(){
    submit.style.display = "none";
    storedUserName.style.display = "none";
    scoreList.style.display = "none";
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    start.style.display ="block";
    start.textContent = "Try again?";
    start.addEventListener("click", function(event){
        currentQuestion=0;
        isCorrect.textContent = "";
        score = 0;
        init();
    })
}
function getInfo(score){
    if(score >2){
    timerStop = 1;
    storedUserName.style.display = "block";
    submit.style.display = "block"
    submit.textContent = "submit";
    }
    else{
        tryAgain();
    }
}
submit.addEventListener("click", function(event){
    event.preventDefault();
    var userText = storedUserName.value + " "+score;
    if(userText == ""){
        return;
    }
    var li = document.createElement("li");
    li.textContent = userText;
    scoreList.appendChild(li);

    storedUserName.value = "";
    userText= "";
    tryAgain();
})
function preStartQuiz(){
    head.textContent = "Coding Quiz Challenge!";
    text.textContent = "This is a JavaScript quiz to test and compare fundamentals!\nThe quiz is 5 questions long and you have 60 seconds\nClick the start button once you are ready!"
    submit.style.display = "none";
    storedUserName.style.display = "none";
    scoreList.style.display = "none";
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    start.style.display ="block";
    start.textContent = "start?"
    start.addEventListener("click", function(event){
        counting.stop();
        renderQuestion();
        counting.start();

        
    });    
}



function init(){
    timeLeft = 50;
    preStartQuiz();
}
highScore.addEventListener("click", function(){
    scoreList.style.display = "block";
})
init();





