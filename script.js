class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length ; i++) {
            let choiceElement = document.getElementById("choice"+ i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
    let quizEndHTML = 
        `
            <h1>Quiz Completed</h1>
            <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
            <div class="quiz-repeat">
                <a href="index.html">Take Quiz Again</a>
            </div>
        `;
        let quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizEndHTML;
}

let questions = [
    new Question(
        "Hyper Text Markup Language Stands For?", ["JQuery","XHTML","CSS","HTML"], "HTML"
    ),
    new Question(
        "What is MC's middle name?", ["Hetiagan","Getigon","Getigan","Hetiagon"], "Getigan"
    ),
    new Question(
        "Which Disney Princess has the least amount of screen time?", ["Rapunzel from Tangled","Merida from Brave","Cinderella","Aurora from Sleeping Beauty"], "Aurora from Sleeping Beauty"
    ),
    new Question(
        "How many stars are on the national flag of USA?", ["30","99","50","75"], "50"
    ),
    new Question(
        "If you have cryophobia, what are you afraid of?", ["Ice","Fire","Water","Earth"], "Ice"
    )
];

let quiz = new Quiz(questions);

displayQuestion();


let time = 50;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min}:${sec}`;
        }

    }, 1000)
}

startCountdown();

// const startQ = document.getElementById("start");

// function startQuiz(){
//     startQ.onClick("click", startCountdown()){
//         startQ.style.display = 'none';
//     }
// }