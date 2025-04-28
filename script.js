// let questions = [];
// let currentQuestionIndex = 0;
// let score = 0;

// function addQuestion() {
//   const question = document.getElementById('question').value;
//   const options = [
//     document.getElementById('option1').value,
//     document.getElementById('option2').value,
//     document.getElementById('option3').value,
//     document.getElementById('option4').value,
//   ];
//   const correctAnswer = document.getElementById('correct-answer').value;

//   if (!question || options.includes('') || correctAnswer === '') {
//     alert('Please fill out all fields correctly!');
//     return;
//   }

//   questions.push({
//     question,
//     options,
//     correctAnswer: parseInt(correctAnswer)
//   });

//   renderQuestions();

//   document.getElementById('question').value = '';
//   document.getElementById('option1').value = '';
//   document.getElementById('option2').value = '';
//   document.getElementById('option3').value = '';
//   document.getElementById('option4').value = '';
//   document.getElementById('correct-answer').value = '';
// }

// function renderQuestions() {
//   const quizQuestions = document.getElementById('quiz-questions');
//   quizQuestions.innerHTML = '';

//   questions.forEach((q, index) => {
//     const div = document.createElement('div');
//     div.className = 'question-preview';
//     div.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
//     quizQuestions.appendChild(div);
//   });
// }

// function startQuiz() {
//   if (questions.length === 0) {
//     alert('Add some questions first!');
//     return;
//   }
//   document.getElementById('quiz-form').classList.add('hidden');
//   document.getElementById('quiz-questions').classList.add('hidden');
//   document.getElementById('start-quiz').classList.add('hidden');
//   document.getElementById('quiz-area').classList.remove('hidden');
//   showQuestion();
// }

// function showQuestion() {
//   const q = questions[currentQuestionIndex];
//   document.getElementById('current-question').innerText = q.question;

//   const optionsDiv = document.getElementById('options');
//   optionsDiv.innerHTML = '';

//   q.options.forEach((option, index) => {
//     const btn = document.createElement('button');
//     btn.innerText = option;
//     btn.onclick = () => selectAnswer(index);
//     optionsDiv.appendChild(btn);
//   });
// }

// function selectAnswer(selected) {
//   const correct = questions[currentQuestionIndex].correctAnswer;
//   if (selected === correct) {
//     score++;
//   }
//   nextQuestion();
// }

// function nextQuestion() {
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     showQuestion();
//   } else {
//     endQuiz();
//   }
// }

// function endQuiz() {
//   document.getElementById('quiz-area').classList.add('hidden');
//   const resultDiv = document.getElementById('result');
//   resultDiv.classList.remove('hidden');
//   resultDiv.innerText = `Quiz Completed! You scored ${score} out of ${questions.length}.`;
// }
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15; // seconds per question

function addQuestion() {
  const question = document.getElementById('question').value;
  const options = [
    document.getElementById('option1').value,
    document.getElementById('option2').value,
    document.getElementById('option3').value,
    document.getElementById('option4').value,
  ];
  const correctAnswer = document.getElementById('correct-answer').value;

  if (!question || options.includes('') || correctAnswer === '') {
    alert('Please fill out all fields correctly!');
    return;
  }

  questions.push({
    question,
    options,
    correctAnswer: parseInt(correctAnswer)
  });

  localStorage.setItem('quizQuestions', JSON.stringify(questions));
  renderQuestions();

  document.getElementById('question').value = '';
  document.getElementById('option1').value = '';
  document.getElementById('option2').value = '';
  document.getElementById('option3').value = '';
  document.getElementById('option4').value = '';
  document.getElementById('correct-answer').value = '';
}

function renderQuestions() {
  const quizQuestions = document.getElementById('quiz-questions');
  quizQuestions.innerHTML = '';

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question-preview';
    div.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
    quizQuestions.appendChild(div);
  });
}

function startQuiz() {
  if (questions.length === 0) {
    alert('Add some questions first!');
    return;
  }
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('quiz-form').classList.add('hidden');
  document.getElementById('quiz-questions').classList.add('hidden');
  document.getElementById('start-quiz').classList.add('hidden');
  document.getElementById('quiz-area').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;

  const q = questions[currentQuestionIndex];
  document.getElementById('current-question').innerText = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => selectAnswer(index);
    optionsDiv.appendChild(btn);
  });

  updateTimerDisplay();
  timer = setInterval(countdown, 1000);
}

function selectAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestionIndex].correctAnswer;
  if (selected === correct) {
    score++;
  }
  nextQuestion();
}

function countdown() {
  timeLeft--;
  updateTimerDisplay();
  if (timeLeft <= 0) {
    clearInterval(timer);
    nextQuestion();
  }
}

function updateTimerDisplay() {
  let timerDiv = document.getElementById('timer');
  if (!timerDiv) {
    timerDiv = document.createElement('div');
    timerDiv.id = 'timer';
    timerDiv.style.marginTop = '10px';
    timerDiv.style.fontSize = '18px';
    timerDiv.style.color = '#ff3333';
    document.getElementById('quiz-area').insertBefore(timerDiv, document.getElementById('options'));
  }
  timerDiv.innerText = `Time Left: ${timeLeft}s`;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-area').classList.add('hidden');
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('hidden');
  resultDiv.innerText = `Quiz Completed! You scored ${score} out of ${questions.length}.`;
}

// On page load, render any saved questions
renderQuestions();
