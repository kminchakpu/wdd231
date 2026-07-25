
import { itemsOfInterest } from '../data/discover.mjs';

function buildCards() {
    const container = document.querySelector(".discover-grid");
    if (!container) return;

    container.innerHTML = "";

    itemsOfInterest.forEach((item, index) => {

        const card = document.createElement("section");
        card.className = "discover-card";

        // Assign named grid area
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${item.name}</h2>

            <figure>
                <img 
                    src="${item.image}" 
                    alt="Image of ${item.name}" 
                    width="300" 
                    height="200"
                    loading="lazy"
                >
            </figure>
       
            <p>${item.description}</p>
            <address>${item.address}</address>

            <button>Learn More</button>
        `;

        container.appendChild(card);
    });
}

buildCards();


// Visitor Message
const visitorMessage = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSince < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitorMessage.textContent =
        `You last visited ${daysSince} ${daysSince === 1 ? 'day' : 'days'} ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// Dynamic date updates inside the Footer elements
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// Simple Hamburger Menu Toggle for Responsive Layouts
const menuToggle = document.querySelector('#menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    
    // Check if the menu is open and swap the icon
    if (primaryNav.classList.contains('open')) {
        menuToggle.innerHTML = '&times;'; 
    } else {
        menuToggle.innerHTML = '&#9776;'; 
    }
});