document.addEventListener('DOMContentLoaded', function() {
    const flashcardList = document.getElementById('flashcard-list');
    // Fetch flashcard list from server or local data
    // Sample data
    const flashcards = ['Flashcard Set 1', 'Flashcard Set 2', 'Flashcard Set 3'];
    flashcards.forEach(set => {
        const flashcardLink = document.createElement('button');
        flashcardLink.innerText = set;
        flashcardLink.onclick = function() { 
            // Redirect to the selected flashcard set
            window.location.href = 'flashcards.html?set=' + set;
        };
        flashcardList.appendChild(flashcardLink);
    });
});
