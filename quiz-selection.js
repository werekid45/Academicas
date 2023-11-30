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
