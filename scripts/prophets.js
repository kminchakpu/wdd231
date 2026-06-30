// Declare the URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML container element
const cards = document.querySelector('#cards');

// Define the async function to fetch the prophet data
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    
    // Pass the prophets array into the display function
    displayProphets(data.prophets); 
}

// Define the function expression to display the cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements for the card container and its content
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let portrait = document.createElement('img');
        
        // Create extra paragraphs for birth information
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');

        // Populate the heading element with the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; 

        // Populate the birth details text content
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build the image portrait attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements to the section card 
        card.appendChild(fullName); 
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Append the completed card to the main #cards container
        cards.appendChild(card);
    }); 
}

// Execute the fetch function to run the process
getProphetData();