document.addEventListener('DOMContentLoaded', function() {
    const topicsContainer = document.getElementById('science-topics');

    // Example topics
    const topics = [
        { name: 'Biology BIOL 2120', url: 'biology-2120.html', img: 'path-to-biology-image.jpg' },
        { name: 'Biology BIOL 3166', url: 'biology-3166.html', img: 'path-to-biology-image2.jpg' },
        // Add more topics here
    ];

    topics.forEach(topic => {
        const button = document.createElement('button');
        button.className = 'topic-button';
        button.style.backgroundImage = `url('${topic.img}')`;

        const link = document.createElement('a');
        link.href = topic.url;
        link.textContent = topic.name;

        button.appendChild(link);
        topicsContainer.appendChild(button);
    });
});
