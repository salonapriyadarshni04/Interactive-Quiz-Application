const questions = [
    { question: 'What is 2 + 2?', answers: [{ text: '4', correct: true }, { text: '22', correct: false }] },
    { question: 'Which language runs in a web browser?', answers: [{ text: 'Java', correct: false }, { text: 'JavaScript', correct: true }] }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if(answer.correct) { button.dataset.correct = answer.correct; }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) { score++; }
    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) { showQuestion(); }
    else {
        resetState();
        questionElement.innerHTML = `Quiz Finished! Your score: ${score}/${questions.length}`;
        nextButton.innerHTML = 'Restart';
        nextButton.classList.remove('hide');
        nextButton.addEventListener('click', startQuiz);
    }
});

startQuiz();

