const questions = [
     // Your questions array should be defined here.
     {
         category: 'Math',
         question: "What is 5 + 8?",
         choices: ["10", "12", "13", "15"],
         answer: "13"
     },
     {
         category: 'Math',
         question: "What is the square root of 36?",
         choices: ["6", "8", "7", "9"],
         answer: "6"
     },
     {
         category: 'Science',
         question: "What planet is known as the living Planet?",
         choices: ["Earth", "Mars", "Jupiter", "Venus"],
         answer: "Earth"
     },
     {
         category: 'Science',
         question: "What gas do plants absorb during photosynthesis?",
         choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
         answer: "Carbon Dioxide"
     },
     {
         category: 'History',
         question: "Who was the first President of the United States?",
         choices: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
         answer: "George Washington"
     },
     {
         category: 'History',
         question: "In which year did World War II end?",
         choices: ["1941", "1942", "1945", "1950"],
         answer: "1945"
     },
     {
         category: 'Geography',
         question: "Which is the largest continent?",
         choices: ["Africa", "Asia", "Europe", "Australia"],
         answer: "Asia"
     },
     {
         category: 'Geography',
         question: "What is the capital of France?",
         choices: ["Paris", "Rome", "Berlin", "Madrid"],
         answer: "Paris"
     },
     {
         category: 'Sports',
         question: "Which country won the FIFA World Cup in 2018?",
         choices: ["Germany", "Brazil", "France", "Argentina"],
         answer: "France"
     },
     {
         category: 'Sports',
         question: "Which sport is known as the 'king of sports'?",
         choices: ["Basketball", "Soccer", "Tennis", "Cricket"],
         answer: "Soccer"
     }
 ];
 
 let currentQuestionIndex = 0;
 let score = 0;
 let timer;
 let timeLeft = 30;  // 30 seconds per question
 let totalQuestions = questions.length;
 
 document.getElementById('next-btn').addEventListener('click', loadNextQuestion);
 document.getElementById('back-btn').addEventListener('click', loadPreviousQuestion); // Add event listener for back button
 
 function startQuiz() {
     shuffleQuestions();
     resetTimer();
     loadQuestion();
     updateProgress();
     startTimer();
 }
 
 function shuffleQuestions() {
     for (let i = questions.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [questions[i], questions[j]] = [questions[j], questions[i]];
     }
 }
 
 // Function to load a question
 function loadQuestion() {
     resetState();
     const currentQuestion = questions[currentQuestionIndex];
     document.getElementById('question').innerText = currentQuestion.question;
 
     const choicesList = document.getElementById('choices');
     currentQuestion.choices.forEach(choice => {
         const li = document.createElement('li');
         li.innerText = choice;
         li.addEventListener('click', () => selectAnswer(li, currentQuestion.answer));
         choicesList.appendChild(li);
     });
 
     document.getElementById('next-btn').disabled = true; // Disable "Next" button initially
 }
 
 // Function to handle the answer selection
 function selectAnswer(selectedLi, correctAnswer) {
     const choicesList = document.getElementById('choices');
     const allChoices = choicesList.getElementsByTagName('li');
 
     Array.from(allChoices).forEach(li => {
         li.removeEventListener('click', selectAnswer); // Disable all choices
         if (li.innerText === correctAnswer) {
             li.classList.add('correct'); // Highlight correct answer in green
         } else if (li === selectedLi) {
             li.classList.add('incorrect'); // Highlight incorrect choice in red
         }
     });
 
     if (selectedLi.innerText === correctAnswer) {
         score++;
     }
 
     document.getElementById('next-btn').disabled = false; // Enable "Next" button
 }
 
 // Function to reset the state for the next question
 function resetState() {
     const choicesList = document.getElementById('choices');
     choicesList.innerHTML = ''; // Clear the choices list
     document.getElementById('next-btn').disabled = true; // Disable "Next" button
 }
 
 // Function to go to the next question
 function loadNextQuestion() {
     currentQuestionIndex++;
     if (currentQuestionIndex >= totalQuestions) {
         endQuiz();
     } else {
         document.getElementById('next-btn').disabled = true;
         resetTimer();
         loadQuestion();
         updateProgress();
     }
 }
 
 // Function to go to the previous question
 function loadPreviousQuestion() {
     if (currentQuestionIndex > 0) {
         currentQuestionIndex--;
         resetState();
         loadQuestion();
         updateProgress();
     }
 }
 
 // Function to display progress
 function updateProgress() {
     const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
     document.getElementById('progress').style.width = `${progress}%`;  // Correct template literal usage
 }
 
 // Timer functionality
 function startTimer() {
     clearInterval(timer);  // Clear any existing timer
     timeLeft = 30;  // Reset time
     document.getElementById('time').innerText = timeLeft;
 
     timer = setInterval(() => {
         if (timeLeft <= 0) {
             loadNextQuestion();
         } else {
             timeLeft--;
             document.getElementById('time').innerText = timeLeft;
         }
     }, 1000);
 }
 
 function resetTimer() {
     clearInterval(timer);
     timeLeft = 30;
     document.getElementById('time').innerText = timeLeft;
 }
 
 // End the quiz and save high score
 // End the quiz and save high score
 function endQuiz() {
     clearInterval(timer);
     saveHighScore();
     document.getElementById('quiz-container').innerHTML = `
         <h2>Quiz completed! Your score: ${score} out of ${totalQuestions}</h2>
         <button><a href="index.html" onclick="goBackToQuiz()">Go Back to Quiz</a></button>
     `;
 }
 
 function goBackToQuiz() {
     currentQuestionIndex = 0;  // Reset question index
     score = 0;  // Reset score
     resetState();  // Clear the previous question's choices
     resetTimer();  // Reset the timer to the starting value
     updateProgress();  // Reset progress bar to 0%
     startQuiz();  // Restart the quiz by calling startQuiz
 }
 
 
 function saveHighScore() {
     const highScore = localStorage.getItem('highScore') || 0;
     if (score > highScore) {
         localStorage.setItem('highScore', score);
     }
 }
 
 function displayHighScore() {
     const highScore = localStorage.getItem('highScore') || 0;
     alert(`High Score: ${highScore}`); // Corrected alert syntax
 }
 
 // Restart the quiz
 function restartQuiz() {
     currentQuestionIndex = 0;  // Reset question index
     score = 0;  // Reset score
     resetState();  // Clear the previous question's choices
     resetTimer();  // Reset the timer to the starting value
     updateProgress();  // Reset progress bar to 0%
     startQuiz();  // Restart the quiz by calling startQuiz
 }
 
 // Initialize the quiz
 startQuiz();

