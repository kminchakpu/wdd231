import { saveCategory, getCategory } from "./storage.js";

/****************************************
 * Footer
 ****************************************/

document.querySelector("#current-year").textContent =
new Date().getFullYear();

document.querySelector("#last-modified").textContent =
document.lastModified;


/****************************************
 * Mobile Navigation
 ****************************************/

const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuToggle.innerHTML =
        navigation.classList.contains("open")
            ? "&times;"
            : "☰";

});


/****************************************
 * DOM Elements
 ****************************************/

const tutorialContainer =
document.querySelector("#tutorial-container");

const searchInput =
document.querySelector("#search");

const filterButtons =
document.querySelectorAll(".tutorial-filter");

const modal =
document.querySelector("#tutorial-modal");

const closeModal =
document.querySelector("#close-modal");


let tutorials = [];

let currentCategory =
getCategory() || "all";


/****************************************
 * Load Tutorials
 ****************************************/

loadTutorials();

async function loadTutorials() {

    try {
        const response =
        await fetch("data/tutorials.json");
        if (!response.ok) {
            throw new Error("Unable to load tutorials.");

        }

        tutorials =
        await response.json();
        displayTutorials();
        restoreFilter();

    }

    catch(error){

        tutorialContainer.innerHTML =
        `<p>${error.message}</p>`;

    }

}


/****************************************
 * Display Tutorials
 ****************************************/

function displayTutorials() {

    tutorialContainer.innerHTML = "";

    const searchTerm =
    searchInput.value.toLowerCase();

    const filteredTutorials =
    tutorials.filter(tutorial => {

        const matchesCategory =

        currentCategory === "all"

        ||

        tutorial.category === currentCategory;

        const matchesSearch =

        tutorial.title
            .toLowerCase()
            .includes(searchTerm)

        ||

        tutorial.description
            .toLowerCase()
            .includes(searchTerm)

        ||

        tutorial.topics.some(topic =>

            topic
            .toLowerCase()
            .includes(searchTerm)

        );

        return matchesCategory && matchesSearch;

    });

    if(filteredTutorials.length === 0){
        tutorialContainer.innerHTML =
        "<p>No tutorials found.</p>";
        return;

    }

    filteredTutorials.forEach(createCard);

}


/****************************************
 * Create Tutorial Card
 ****************************************/

function createCard(tutorial){

    const card =
    document.createElement("article");

    card.classList.add("tutorial-card");

    card.innerHTML = `

        <img
        src="${tutorial.image}"
        alt="${tutorial.title}"
        loading="lazy">

        <div class="tutorial-content">

            <h3>${tutorial.title}</h3>

            <p>

            <strong>Category:</strong>

            ${tutorial.category.toUpperCase()}

            </p>

            <p>

            <strong>Type:</strong>

            ${tutorial.type}

            </p>

            <p>

            <strong>Level:</strong>

            ${tutorial.level}

            </p>

            <p>

            ${tutorial.description}

            </p>

            <button
            class="learn-btn">

            Learn More

            </button>

        </div>

    `;

    card
    .querySelector(".learn-btn")
    .addEventListener("click", () => {

        openModal(tutorial);

    });

    tutorialContainer.append(card);

}


/****************************************
 * Search
 ****************************************/

searchInput.addEventListener("input", () => {

    displayTutorials();

});


/****************************************
 * Filters
 ****************************************/

filterButtons.forEach(button=>{

    button.addEventListener("click", ()=>{
        filterButtons.forEach(btn=>{
            btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");
        currentCategory =
        button.dataset.category;
        saveCategory(currentCategory);
        displayTutorials();

    });

});


function restoreFilter(){

    filterButtons.forEach(button=>{
        if(button.dataset.category===currentCategory){
            button.classList.add("active-filter");
        }

    });

}


/****************************************
 * Modal
 ****************************************/

function openModal(tutorial){

    document.querySelector("#modal-title").textContent =
    tutorial.title;

    document.querySelector("#modal-category").textContent =
    tutorial.category.toUpperCase();

    document.querySelector("#modal-type").textContent =
    tutorial.type;

    document.querySelector("#modal-level").textContent =
    tutorial.level;

    document.querySelector("#modal-duration").textContent =
    tutorial.duration;

    document.querySelector("#modal-description").textContent =
    tutorial.description;

    const topics =
    document.querySelector("#modal-topics");

    topics.innerHTML = "";

    tutorial.topics.forEach(topic=>{

        const li =
        document.createElement("li");

        li.textContent =
        topic;

        topics.append(li);

    });

    const resource =
    document.querySelector("#modal-resource");

    resource.href =
    tutorial.resource;

    modal.showModal();

}


/****************************************
 * Close Modal
 ****************************************/

closeModal.addEventListener("click", ()=>{

    modal.close();

});


modal.addEventListener("click",(event)=>{

    const rect =
    modal.getBoundingClientRect();

    const inside =

    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

    if(!inside){

        modal.close();

    }

});


document.addEventListener("keydown",(event)=>{
    if(event.key==="Escape"){
        modal.close();

    }

});