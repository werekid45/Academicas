document.addEventListener('DOMContentLoaded', function() {
    fetchExistingQuizzes();

    document.getElementById('add-question-button').addEventListener('click', addNewQuestion);
    document.getElementById('save-quiz-button').addEventListener('click', saveQuiz);
    document.getElementById('start-quiz-button').addEventListener('click', startQuiz);
    
});

function fetchExistingQuizzes() {
    fetch('/quizzes')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('quiz-selector');
            selectElement.innerHTML = ''; // Clear existing options
            data.quizzes.forEach(quiz => {
                const option = document.createElement('option');
                option.value = quiz.id;
                option.textContent = quiz.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching quizzes:', error));
}


function startQuiz() {
    const selectedQuizId = document.getElementById('quiz-selector').value;
    // Fetch and display the selected quiz using selectedQuizId
    // You might need an endpoint in your backend to fetch a quiz by ID
}

function addNewQuestion() {
    // Append new question-answer input fields to the form
    const form = document.getElementById('quiz-form');
    const newQuestionDiv = document.createElement('div');
    newQuestionDiv.classList.add('quiz-question');
    newQuestionDiv.innerHTML = `
        <label>Question:</label>
        <input type="text" name="question">

        <label>Answer:</label>
        <input type="text" name="answer">
    `;
    form.appendChild(newQuestionDiv);
}

function saveQuiz() {
    // Updated implementation to fetch quiz name and serialize content
    const quizName = document.getElementById('quiz-name-input').value;
    const questions = document.querySelectorAll('.quiz-question');
    const quizContent = Array.from(questions).map(questionDiv => {
        return {
            question: questionDiv.querySelector('input[name^="question"]').value,
            answer: questionDiv.querySelector('input[name^="answer"]').value
        };
    });

    fetch('/quizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: quizName, content: JSON.stringify(quizContent) }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Quiz saved:', data);
        // Add success handling here
    })
    .catch((error) => {
        console.error('Error saving the quiz:', error);
        // Add error handling here
    });
}

function startQuiz() {
    const selectedQuizId = document.getElementById('quiz-selector').value;
    if (!selectedQuizId) {
        alert("Please select a quiz to start.");
        return;
    }

    fetch(`/quizzes/${selectedQuizId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayQuiz(data.quiz);
        })
        .catch((error) => {
            console.error('Error fetching quiz:', error);
            alert("Error fetching quiz: " + error.message);
        });
}

function displayQuiz(quiz) {
    const quizSection = document.getElementById('take-quiz-section');
    quizSection.innerHTML = '<h2>' + quiz.name + '</h2>';

    quiz.content.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        questionDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${item.question}</p>
            <input type="text" placeholder="Your answer" name="answer-${index}">
        `;
        quizSection.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.onclick = submitQuiz;
    quizSection.appendChild(submitButton);
}

function submitQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let correctAnswers = 0;

    questions.forEach((questionDiv, index) => {
        const userAnswer = questionDiv.querySelector(`input[name="answer-${index}"]`).value.trim().toLowerCase();
        const correctAnswer = questionDiv.dataset.correctAnswer.toLowerCase(); // assuming you store the correct answer as a data attribute

        if (userAnswer === correctAnswer) {
            correctAnswers++;
            // Optionally, indicate correct answers in the UI
        } else {
            // Optionally, indicate incorrect answers in the UI
        }
    });

    const totalQuestions = questions.length;
    const score = (correctAnswers / totalQuestions) * 100;

    alert(`Your score: ${score}% (${correctAnswers} out of ${totalQuestions} correct)`);
    // Additional logic here if needed, such as sending results to the server
}



function addNewQuestion() {
    const form = document.getElementById('quiz-form');
    const questionCount = form.getElementsByClassName('quiz-question').length;

    const newQuestionDiv = document.createElement('div');
    newQuestionDiv.classList.add('quiz-question');
    newQuestionDiv.innerHTML = `
        <label for="question-${questionCount}">Question:</label>
        <input type="text" id="question-${questionCount}" name="question-${questionCount}">

        <label for="answer-${questionCount}">Answer:</label>
        <input type="text" id="answer-${questionCount}" name="answer-${questionCount}">
    `;

    form.appendChild(newQuestionDiv);
}


function saveQuiz() {
    const quizName = document.getElementById('quiz-name-input').value;
    const questions = document.querySelectorAll('.quiz-question');
    const quizContent = Array.from(questions).map(questionDiv => {
        return {
            question: questionDiv.querySelector('input[name^="question"]').value,
            answer: questionDiv.querySelector('input[name^="answer"]').value
        };
    });

    fetch('/quizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: quizName, content: quizContent }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Quiz saved:', data);
        alert('Quiz saved successfully');
        resetQuizForm();
    })
    .catch((error) => {
        console.error('Error saving the quiz:', error);
        alert('Error saving quiz');
    });
}

function resetQuizForm() {
    // Clear the quiz name input
    document.getElementById('quiz-name-input').value = '';

    // Clear existing questions
    const form = document.getElementById('quiz-form');
    form.innerHTML = '';

    // Add a new blank question field
    addNewQuestion();
}


function addNewQuestion() {
    const form = document.getElementById('quiz-form');
    const questionCount = form.getElementsByClassName('quiz-question').length;

    const newQuestionDiv = document.createElement('div');
    newQuestionDiv.classList.add('quiz-question');
    newQuestionDiv.innerHTML = `
        <label for="question-${questionCount}">Question:</label>
        <input type="text" id="question-${questionCount}" name="question-${questionCount}">

        <label for="answer-${questionCount}">Answer:</label>
        <input type="text" id="answer-${questionCount}" name="answer-${questionCount}">
    `;

    form.appendChild(newQuestionDiv);
}

