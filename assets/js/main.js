
/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBeterrn: 24,
    loop: 'true',
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true
    },
    breakpoints: {
        992: {
          spaceBetween: 80,
        },
      },
  });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

function scrollHeader(){
    const navmenu = document.getElementById('nav-menu')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) navmenu.classList.add('nav-hide'); else navmenu.classList.remove('nav-hide')
}
window.addEventListener('scroll', scrollHeader)



/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/ 


/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
  })
  
  sr.reveal(`.skills__container, .footer`)
  sr.reveal(`.home__data`, {delay: 400})
  sr.reveal(`.quiz`,{origin: 'left'})
  sr.reveal(`.home__img`,{origin: 'right'})

/*=============== QUIZ ===============*/


const quizArray = [
    { id: "0", question: "What type of furry friend do I have?", options: ["Dog", "Opossum", "Cat", "Koala"], correct: "Cat", image: "quiz-1.png" },
    { id: "1", question: "Which language did I learn first?", options: ["Spanish", "Japanese", "German", "Korean"], correct: "Korean", image: "quiz-2.png" },
    { id: "2", question: "What's my favorite hobby?", options: ["Drawing", "Dance", "Fishing", "Karate"], correct: "Drawing", image: "quiz-3.png" },
    { id: "3", question: "Which states I'm currently based?", options: ["Ohio", "California", "New Mexico", "Texas"], correct: "Texas", image: "quiz-4.png" },
    { id: "4", question: "What is my go-to comfort food?", options: ["Burgers", "Sushi", "Tteokbokki", "Curry"], correct: "Tteokbokki", image: "quiz-5.png" },
    { id: "5", question: "Who's my stan?", options: ["Higedan", "Taylor Swift", "BTS", "Kanye West"], correct: "Higedan", image: "quiz-6.png" },
    { id: "6", question: "In college, what was my major?", options: ["Graphic Design", "Film", "Photography", "New Media"], correct: "New Media", image: "quiz-7.png" },
    { id: "7", question: "What is my all-time favorite TV show?", options: ["The Office", "Breaking Bad", "Game of Thrones", "The Walking Dead"], correct: "Breaking Bad", image: "quiz-8.png" },
    { id: "8", question: "What's my MBTI type?", options: ["ENTJ", "ISFJ", "ESTP", "INFP"], correct: "INFP", image: "quiz-9.png" },
    { id: "9", question: "What's my Zodiac sign?", options: ["Virgo", "Capricorn", "Gemini", "Cancer"], correct: "Virgo", image: "quiz-10.png" },
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionImageElement = document.getElementById("question-image");
const questionTextElement = document.getElementById("question-text");
const optionsListElement = document.getElementById("options-list");
const feedbackTextElement = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const scoreContainer = document.getElementById("score-container");
const restartButton = document.getElementById("restart-button")
const questionNumber = document.getElementById("numberofquestion");
const scoreMessageElement = document.getElementById("score-message");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    shuffle(quizArray);
    loadQuestion();
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    scoreContainer.style.display = "none";
}

function initial() {
    currentQuestionIndex = 0;
    score = 0;
    shuffle(quizArray);
    loadQuestion();
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    scoreContainer.style.display = "none";
    feedbackTextElement.textContent = "";
}

function loadQuestion() {
    const currentQuestion = quizArray[currentQuestionIndex];
    questionImageElement.src = currentQuestion.image;
    questionTextElement.textContent = currentQuestion.question;
    optionsListElement.innerHTML = "";
    questionNumber.innerHTML = currentQuestionIndex + 1 + " of " + (quizArray.length - 5);

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(option));
        optionsListElement.appendChild(li);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizArray[currentQuestionIndex];
    const options = optionsListElement.getElementsByTagName('li');

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.removeEventListener('click', checkAnswer); 

        if (option.textContent === currentQuestion.correct) {
            option.classList.add('correct'); 
        } else if (option.textContent === selectedOption) {
            option.classList.add('incorrect'); 
        }
        option.classList.add('answered');
    }

    if (selectedOption === currentQuestion.correct) {
        feedbackTextElement.textContent = "That's right!";
    } else {
        feedbackTextElement.textContent = "Nah, but nice try!";
    }

    if (selectedOption === currentQuestion.correct) {
        score++; 
        scoreElement.textContent = score;
    }
    nextButton.style.display = "block";
}

    
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        loadQuestion();
        nextButton.style.display = "none";
        feedbackTextElement.textContent = "";
    } else {
        // Quiz ended, show final score or redirect to another page
        let message = "";
        if (score === 5) {
            message = "Incredible! It's like we're two peas in a pod! 🫛";
            scoreMessageElement.classList.add("score-message");
        } else if (score >= 3) {
            message = "We're vibing! Keep up the good guessing! 🤸‍♀️";
            scoreMessageElement.classList.add("score-message");
        } else {
            message = "At least we can still be friends, right? 🦑";
            scoreMessageElement.classList.add("score-message");
        }
        scoreElement.innerHTML = score + " out of " + currentQuestionIndex;
        scoreMessageElement.textContent = message;
        scoreContainer.style.display = "block";
        nextButton.style.display = "none";
        quizContainer.style.display = "none";
    }
}


startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", initial);
