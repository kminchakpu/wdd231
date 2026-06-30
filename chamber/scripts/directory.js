// Dynamic date updates inside the Footer elements
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// Simple Hamburger Menu Toggle for Responsive Layouts
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

// JSON Fetch and Directory Card Rendering Engine
const directoryContainer = document.getElementById('directory-container');
const jsonURL = "data/members.json";

async function fetchMembers() {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error(`HTTP network response failure: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error retrieving JSON member directories:", error);
        directoryContainer.innerHTML = `<p class="error">Failed to load directory details.</p>`;
    }
}

// Helper function to convert numeric level to text representation
function getMembershipLabel(level) {
    switch(level) {
        case 3:
            return "Gold Member";
        case 2:
            return "Silver Member";
        case 1:
default:
            return "Member";
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = ""; 
    
    members.forEach(member => {
        const section = document.createElement('section');
        section.classList.add(`level-${member.membershipLevel}`);
        
        // Resolve explicit text label for the badge element
        const membershipLabel = getMembershipLabel(member.membershipLevel);
        
        // standard interior card items (updated with membership badge)
        section.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <span class="membership-badge badge-lvl-${member.membershipLevel}">${membershipLabel}</span>
            <p class="tagline"><em>"${member.tagline}"</em></p>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="url"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;
        
        directoryContainer.appendChild(section);
    });
}

// Layout Selection Toggles
const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');

gridBtn.addEventListener('click', () => {
    directoryContainer.className = "grid-view";
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.className = "list-view";
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Primary Entry Initialization
fetchMembers();