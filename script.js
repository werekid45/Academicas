// Sample data for quiz and flashcards
const quizQuestions = [
    { question: "What is the boiling point of water?", answer: "100°C" },
    // Add more quiz questions here
];

const flashcards = [
    { term: "Photosynthesis", definition: "The process by which green plants and some other organisms use sunlight to synthesize foods." },
    // Add more flashcards here
];

let currentQuizQuestion = 0;
let currentFlashcard = 0;

function nextQuestion() {
    const quizElement = document.getElementById("quiz");
    if (currentQuizQuestion < quizQuestions.length) {
        quizElement.innerText = quizQuestions[currentQuizQuestion].question + " - " + quizQuestions[currentQuizQuestion].answer;
        currentQuizQuestion++;
    } else {
        quizElement.innerText = "End of Quiz";
    }
}

function nextFlashcard() {
    const flashcardElement = document.getElementById("flashcard-content");
    if (currentFlashcard < flashcards.length) {
        flashcardElement.innerText = flashcards[currentFlashcard].term + " - " + flashcards[currentFlashcard].definition;
        currentFlashcard++;
    } else {
        flashcardElement.innerText = "End of Flashcards";
    }
}

// Initialize the first quiz question and flashcard
document.addEventListener('DOMContentLoaded', function() {
    nextQuestion();
    nextFlashcard();
});
