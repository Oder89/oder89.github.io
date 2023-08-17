const quizData = [
  {
    question: '1.Azərbaycan Milli Müstəqillik Günü hansı tarixdə qeyd olunur?',
    options: ['15 iyun', '17 noyabr', '28 may', '18 oktyabr'],
    answer: '28 may',
  },
  {
    question: '2.Vətənim şerinin müəllifi kimdir?',
    options: ['Abbas Səhət', 'Abdulla Şaiq', 'Əhməd Cavad', 'M.Ə.Sabir'],
    answer: 'Abbas Səhət',
  },
  {
    question: '3.Ən  böyük səhra hansıdır?',
    options: ['Kolorado platosu', 'Kalaxari', 'Çiuaua', 'Sonora səhrası'],
    answer: 'Kalaxari',
  },
  {
    question: '4.Bunlardan hansı dünyanın 7 möcüzəsinə aid deyildir?',
    options: ['Xeops ehramı', 'Çin səddi', 'Babilin asma bağları', 'İsgəndəriyyə Mayakı'],
    answer: 'Çin səddi',
  },
  {
    question: '5.Bunlardan hansı Sasanilər imperiyasının hökmdarı olub?',
    options: [
      'Dara',
      'Kir',
      'Ərdəşir',
      'Kambiz',
    ],
    answer: 'Ərdəşir',
  },
  {
    question: '6.Kimyəvi elementlərin dövri sistemində qızıl necə işarələnir?',
    options: ['Bh', 'Au', 'Cu', 'Fe'],
    answer: 'Au',
  },
  {
    question: '7.Mona Liza əsərinin müəllifi kimdir?',
    options: [
      'Pablo Pikasso',
      'Vinsent van Qoq',
      'Leonardo da Vinçi',
      'Michelangelo',
    ],
    answer: 'Leonardo da Vinçi',
  },
  {
    question: '8.Dünyanın ən hündür şələləsi hansıdır?',
    options: ['Viktoriya şəlaləsi', 'Anxel şəlaləsi', 'İquasu şəlaləsi', 'Niaqara şəlaləsi'],
    answer: 'Anxel şəlaləsi',
  },
  {
    question: '9.Quranda ən çox adı çəkilən peyğəmbər hansıdır?',
    options: [
      'Nuh',
      'Adəm',
      'Musa',
      'İsa',
    ],
    answer: 'Musa',
  },
  {
    question: '10.Türkiyə Cümhuriyyətinin üçüncü prezidenti kim olub?',
    options: ['Cövdət Sunay', 'Turqut Özal', 'İsmet İnönü', 'Cəlal Bayar'],
    answer: 'İsmet İnönü',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `Sizin cavablar ${score} dan ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Sual:</strong> ${incorrectAnswers[i].question}<br>
        <strong><font color=red>Sizin cavab:</font></strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong><font color=green>Düzgün cavab:</font></strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Düzgün cavab ${score} dan ${quizData.length}!</p>
    <p><font color=blue>Səhv cavablar:</font></p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();