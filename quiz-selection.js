
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic'); // Get the topic from URL

    const quizList = document.getElementById('quiz-list');
    // Fetch quiz list from server or local data filtered by topic
    // Sample data
    const quizzes = {
        science: ['Science Quiz 1', 'Science Quiz 2'],
        math: ['Math Quiz 1', 'Math Quiz 2']
        // other topics...
    };

    (quizzes[topic] || []).forEach(quiz => {
        const quizLink = document.createElement('button');
        quizLink.innerText = quiz;
        quizLink.onclick = function() { 
            window.location.href = `quiz.html?topic=${topic}&quiz=${quiz}`;
        };
        quizList.appendChild(quizLink);
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const addQuestionBtn = document.getElementById('add-question-button');
    const saveQuizBtn = document.getElementById('save-quiz-button');
    const quizForm = document.getElementById('quiz-form');

    addQuestionBtn.addEventListener('click', function() {
        // Add a new question to the form
        // You can create input fields for question text and options here
    });

    saveQuizBtn.addEventListener('click', function() {
        // Process and save the created quiz
        // You can save it to local storage or send it to the server if you have a backend set up
    });

    // Functionality to load and take a pre-made quiz
    // This could involve fetching quiz data and displaying it in a user-friendly format
});

function fetchExistingQuizzes() {
    fetch('http://localhost:3000/quizzes') // Update with your server's URL
        .then(response => response.json())
        .then(data => {
            populateQuizDropdown(data.quizzes);
        })
        .catch(error => {
            console.error('Error fetching quizzes:', error);
        });
}

function populateQuizDropdown(quizzes) {
    const quizSelector = document.getElementById('quiz-selector');
    quizzes.forEach(quiz => {
        const option = document.createElement('option');
        option.value = quiz.id;
        option.textContent = quiz.name;
        quizSelector.appendChild(option);
    });
}


