document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');

    const resourcesContainer = document.getElementById('resources-container');
    // Example: Load different content based on the topic
    if (topic === 'biology-2120') {
        resourcesContainer.innerHTML = `
            <h2>Resources for Biology BIOL 2120</h2>
            <p>Here are some curated resources for your Biology course.</p>
            <!-- Add links, documents, videos, etc. -->
        `;
    }
    // Add more conditions for other topics as needed
});
