const links = document.querySelectorAll('.quiz-category');  // все ссылки міні-тестів 

const renderAccents = (accents) => {
    console.log(accents);

const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');


const optionElements = document.querySelectorAll('.quiz__option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion;
let indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

const questions = accents;

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];

	numberOfQuestion.innerHTML = indexOfPage + 1;
	indexOfPage++;
};

let completedAnswers = []

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if (indexOfPage == questions.length) {
		quizOver()
	} else {
		if (completedAnswers.length > 0) {
			completedAnswers.forEach(item => {
				if (item == randomNumber) {
					hitDuplicate = true;
				}
			})
			if (hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			}
		}
		if (completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		}
	}
	completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
	if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions();
}

for (let option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
}


const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add('correct');
		}
	})
}


const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	})
}

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	})
}

const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
	if (!optionElements[0].classList.contains('disabled')) {
		alert('Вам потрібно обрати один з варіантів відповіді');
	} else {
		randomQuestion();
		enableOptions();
	}
}

const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
	window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
	validate();
})

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})
}

const getData = (value) => {
    fetch('https://accents-dba57-default-rtdb.firebaseio.com/db.json')
        .then((res) => res.json())
        .then((data) => {
	    console.log(data);
            const array = data.filter((item) => item.category === value);

            localStorage.setItem('accents', JSON.stringify(array));

            window.location.href = 'quiz.html';

            renderAccents(array);
        }) 

}

links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const linkValue = link.textContent;
        
        getData(linkValue);
    })
})

if (localStorage.getItem('accents') && window.location.pathname === '/quiz.html') {
    renderAccents(JSON.parse(localStorage.getItem('accents')))
}
