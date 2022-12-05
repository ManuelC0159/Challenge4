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
var timerStyle = document.getElementById("timerStyle");
//counts score
var score = 0;
//test to take 10 seconds from timer on wrong answer
var takeFromTimer = 1;
//questions and answers
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
    ChoiceC : "JavaScript is a compiled language used to make the website interactive",
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
    ChoiceD : "A URL that uses the special javascript:stack",
    Correct: "B"    
}
];
var lastQuestion = questions.length -1;
var currentQuestion = 0;
var timeLeft = 50;

//renders question
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
//timer function
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
//allows functions to start and end timer
var counting = countdown();
//actual timer
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
        timerStyle.style.display ="none";
        timerEl.textContent = 'Time is up!';
        timeIsUp();
        scoreRender();
    }
}
//runs when user runs out of time 
function timeIsUp(){
    storedUserName.style.display = "none";
    scoreList.style.display = "none";
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    head.style.display = "none";
}
//checks if correct as user answers
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
//renders final score
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
//asks user if they wish to try again
function tryAgain(){
    submit.style.display = "none";
    storedUserName.style.display = "none";
    scoreList.style.display = "none";
    choiceA.style.display = "none"
    choiceB.style.display = "none"
    choiceC.style.display = "none"
    choiceD.style.display = "none"
    start.style.display ="block";
    start.textContent = "Try again";
    start.addEventListener("click", function(event){
        currentQuestion=0;
        isCorrect.textContent = "";
        score = 0;
        init();
    })
}
//prompt user to submit high score if it is greater than 2
function getInfo(score){
    if(score >2){
    storedUserName.style.display = "block";
    submit.style.display = "block"
    submit.textContent = "submit";
    }
    else{
        tryAgain();
    }
}
//submit button
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
//before quiz startscreen
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

//initialize quiz
function init(){
    timeLeft = 50;
    timerStyle.style.display = "block";
    timerStyle.textContent = "Timer: ";
    preStartQuiz();
}
//button to check saved high scores
highScore.addEventListener("click", function(){
    scoreList.style.display = "block";
})


init();





