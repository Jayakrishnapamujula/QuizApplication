const quetions = [
    {
        quetion: "Which type of JavaScript language is ___",
        answers: [
            { text: "Object-Oriented", correct: false},
            { text: "Object-Based", correct: true},
            { text: "Assembly-language", correct: false},
            { text: "High-level", correct: false},
        ]
    },
    {
        quetion: "Which one of the following also known as Conditional Expression",
        answers: [
            { text: "Alternative to if-else", correct: false},
            { text: "Switch statement", correct: false},
            { text: "If-then-else statement", correct: false},
            { text: "immediate if", correct: true},
        ]
    },
    {
        quetion: "In JavaScript, what is a block of statement?",
        answers: [
            { text: "Conditional block", correct: false},
            { text: "block that combines a number of statements into a single compound statement", correct: true},
            { text: "both conditional block and a single statement", correct: false},
            { text: "block that contains a single statement", correct: false},
        ]
    },
    {
        quetion: "When interpreter encounters an empty statements, what it will do",
        answers: [
            { text: "Shows a warning", correct: false},
            { text: "Prompts to complete the statement", correct: false},
            { text: "Throws an error", correct: false},
            { text: "Ignores the statements", correct: true},
        ]
    },
    {
        quetion: 'The "function" and " var" are known as',
        answers: [
            { text: "Keywords", correct: false},
            { text: "Data types", correct: false},
            { text: "Declaration statements", correct: true},
            { text: "Prototypes", correct: false},
        ]
    },
    {
        quetion: "Which of the following variables takes precedence over the others if the names are the same?",
        answers: [
            { text: "Global variable", correct: false},
            { text: "The local element", correct: true},
            { text: "The two of the above", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
];

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = quetions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+ ". " + currentQuestion.quetion;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct ;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); 
   }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
            }
        button.disabled = true;
     });
     nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} our of ${quetions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quetions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}



nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < quetions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();