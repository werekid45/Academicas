document.addEventListener('DOMContentLoaded', function() {
    
    // Function to load resources
    function loadResources(topic) {
        const resourcesContainer = document.getElementById('resources-container');
        resourcesContainer.innerHTML = ''; // Clear existing content

        
        const resources = {
            'biology-2120': [
                { title: 'Introduction to Biology', url: 'https://openstax.org/books/biology-2e/pages/1-introduction' },
                { title: 'Cell Structure', url: 'https://openstax.org/books/biology-2e/pages/4-introduction' },
                { title: 'Genetics and Evolution', url: 'https://openstax.org/books/biology-2e/pages/11-introduction' }
                // Add more resources as needed
            ]
        };

        // Display resources for the specified topic
        if (resources[topic]) {
            resources[topic].forEach(resource => {
                const resourceElement = document.createElement('div');
                resourceElement.className = 'resource';
                resourceElement.innerHTML = `
                    <h2>${resource.title}</h2>
                    <a href="${resource.url}" target="_blank">Learn More</a>
                `;
                resourcesContainer.appendChild(resourceElement);
            });
        } else {
            resourcesContainer.innerHTML = '<p>No additional resources found for this topic.</p>';
        }
    }

    // Get the topic from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic') || 'biology-2120'; // Default to 'biology-2120' if no parameter is provided

    // Load resources for the given topic
    loadResources(topic);
});
