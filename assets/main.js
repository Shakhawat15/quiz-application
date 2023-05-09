// Getting all required elements
const startBtn = document.getElementById('start');
const infoBox = document.getElementById('infoBox');
const exitBtn = document.getElementsByClassName('quit')[0];
const continueBtn = document.getElementsByClassName('continue')[0];
const quizBox = document.getElementById('quizBox');
const optionList = document.querySelector('.option_list');
const timeCount = quizBox.querySelector('.time_sec');
const timeLine = quizBox.querySelector('.time_line');
const timeOff = quizBox.querySelector('.time_text');

// IF start Quiz Button Clicked
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    infoBox.classList.remove('d-none'); // Show the Information Box
})

// IF Exit Button Clicked
exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    infoBox.classList.add('d-none'); // Hide the Information Box
})

// IF Continue Button Clicked
continueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    infoBox.classList.add('d-none'); // Hide the Information Box
    quizBox.classList.remove('d-none'); // Show the Quiz Box
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
})

let questionCount = 0;
let questionNumber = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = document.getElementById('next');
const resultBox = document.querySelector('#resultBox');
const restartQuiz = resultBox.querySelector('.restart');
const quitQuiz = resultBox.querySelector('.quit');

// IF Next Button Clicked
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.classList.add('d-none');
        timeOff.textContent = 'Time Left';
    } else {
        console.log('Question Complete')
        showResult();
    }
});

// IF Quit Button Clicked
quitQuiz.addEventListener('click', (e) => {
   e.preventDefault();
   window.location.reload();
});

// IF Replay Button Clicked
restartQuiz.addEventListener('click', (e) => {
   e.preventDefault();
    quizBox.classList.remove('d-none'); // Show the Quiz Box
    resultBox.classList.add('d-none'); // Hide the Result Box
    let questionCount = 0;
    let questionNumber = 1;
    let timeValue = 15;
    let widthValue = 0;
    // let userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.classList.add('d-none');
});


// Getting questions and options from array
const showQuestions = (index) => {
    const questionText = document.querySelector('.card-title');
    let questionTag = `<h5>${questions[index].number}. ${questions[index].question}</h5>`;
    let optionTag = `<p class="card-text option"><span>${questions[index].options[0]}</span></p>
                        <p class="card-text option"><span>${questions[index].options[1]}</span></p>
                        <p class="card-text option"><span>${questions[index].options[2]}</span></p>
                        <p class="card-text option"><span>${questions[index].options[3]}</span></p>`;
    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
    const options = optionList.querySelectorAll('.option');
    for (let option of options) {
        option.setAttribute('onclick', 'optionSelected(this)')
    }
}


let tickIcon = `<span class="icon tick"><i class="fa-solid fa-check"></i></span>`;
let crossIcon = `<span class="icon cross"><i class="fa-sharp fa-solid fa-xmark"></i></span>`;

const optionSelected = (answer) => {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAns === correctAns) {
        userScore++;
        console.log(userScore);
        answer.classList.add('correct')
        answer.insertAdjacentHTML('beforeend', tickIcon);
    } else {
        answer.classList.add('inCorrect');
        answer.insertAdjacentHTML('beforeend', crossIcon);
        //     If answer is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAns) {
                optionList.children[i].setAttribute('class', 'option correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }
    }

//     Once User Selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.remove('d-none');
}

const showResult = () => {
    // infoBox.classList.add('d-none'); // Hide the Information Box
    quizBox.classList.add('d-none'); // Hide the Quiz Box
    resultBox.classList.remove('d-none'); // Show the Result Box
    const scoreText = resultBox.querySelector('.score');
    if (userScore > 3) {
        let scoreTag = `<p class="fs-5 mb-4">and congrats! you got <span class="mx-1 fw-bold">${userScore}</span> out of <span class="mx-1 fw-bold">${questions.length}</span></p>`;
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = `<p class="fs-5 mb-4">and nice, you got <span class="mx-1 fw-bold">${userScore}</span> out of <span class="mx-1 fw-bold">${questions.length}</span></p>`;
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = `<p class="fs-5 mb-4">and sorry, you got only <span class="mx-1 fw-bold">${userScore}</span> out of <span class="mx-1 fw-bold">${questions.length}</span></p>`;
        scoreText.innerHTML = scoreTag;
    }
}

const startTimer = (time) => {
    counter = setInterval(() => {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = `0${addZero}`;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = '00';
            timeOff.textContent = 'Time Off';

            let correctAns = questions[questionCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent === correctAns) {
                    optionList.children[i].setAttribute('class', 'option correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add('disabled');
            }
            nextBtn.classList.remove('d-none');
        }
    }, 1000)
}

const startTimerLine = (time) => {
    counterLine = setInterval(() => {
        time++;
        timeLine.style.width = `${time}px`;
        if (time > 549) {
            clearInterval(counterLine);
        }
    }, 29)
}

const questionCounter = (index) => {
    const bottomQuestionCounter = document.querySelector('.total_que');
    let totalQuestionCountingTag = `<p><span class="mx-1 fw-bold">${index}</span> of <span class="mx-1 fw-bold">${questions.length}</span> Question</p>`
    bottomQuestionCounter.innerHTML = totalQuestionCountingTag;
}


