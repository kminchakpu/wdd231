import { saveCategory, getCategory } from "./storage.js";

/*****************************
 * Footer Information
 *****************************/

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;


/*****************************
 * Hamburger Menu
 *****************************/

const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuToggle.innerHTML =
        navigation.classList.contains("open")
            ? "&times;"
            : "☰";

});


/*****************************
 * Category Filters
 *****************************/

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn =>
            btn.classList.remove("active-filter")
        );
        button.classList.add("active-filter");
        const category = button.dataset.category;
        saveCategory(category);
        loadFeaturedResources(category);

    });

});


/*****************************
 * Fetch Tech Term
 *****************************/

loadTechTerm();
async function loadTechTerm() {
    try {
        const response = await fetch("data/terms.json");
        if (!response.ok) {
            throw new Error("Unable to load terms.");
        }

        const terms = await response.json();
        const random =
            terms[Math.floor(Math.random() * terms.length)];
        displayTechTerm(random);

    }

    catch (error) {
        document.querySelector("#term-container").innerHTML =
        `<p>${error.message}</p>`;
    }

}


/*****************************
 * Display Tech Term
 *****************************/

function displayTechTerm(term) {
    document.querySelector("#term-container").innerHTML = `
        <h3>${term.term}</h3>
        <p>${term.definition}</p>

    `;

}


/*****************************
 * Featured Learning Paths
 *****************************/

const cardContainer =
    document.querySelector("#featured-cards");
loadFeaturedResources(
    getCategory() || "all"
);

async function loadFeaturedResources(category) {
    try {
        const response =
            await fetch("data/tutorials.json");
        if (!response.ok) {
            throw new Error("Unable to load tutorials.");

        }

        const tutorials =
            await response.json();
        const filtered =
            category === "all"
            ? tutorials.slice(0, 6)
            : tutorials.filter(item =>
                item.category.toLowerCase() === category
            );

        displayCards(filtered);

    }

    catch (error) {
        cardContainer.innerHTML =
        `<p>${error.message}</p>`;

    }

}


/*****************************
 * Display Cards
 *****************************/

function displayCards(tutorials) {

    cardContainer.innerHTML = "";

    tutorials.forEach(item => {

        const card = document.createElement("article");

        card.classList.add("resource-card");

        card.innerHTML = `
    <img
        src="${item.image}"
        alt="${item.title}"
        loading="lazy">

    <div class="resource-content">

        <h3>${item.title}</h3>

        <p>
            <strong>Category:</strong>
            ${item.category.toUpperCase()}
        </p>

        <p>
            <strong>Level:</strong>
            ${item.level}
        </p>

        <button class="learn-btn">
            Learn More
        </button>

    </div>
`;

        const learnButton = card.querySelector(".learn-btn");

        learnButton.addEventListener("click", () => {
            openModal(item);
        });

        cardContainer.appendChild(card);

    });

}

/*****************************
 * Modal
 *****************************/

const modal =
document.querySelector("#tutorial-modal");

const closeModal =
document.querySelector("#close-modal");


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

    const topicList =
    document.querySelector("#modal-topics");
    topicList.innerHTML = "";
    tutorial.topics.forEach(topic=>{

        const li =
        document.createElement("li");
        li.textContent = topic;
        topicList.append(li);

    });

    const resource =
    document.querySelector("#modal-resource");
    resource.href =
    tutorial.resource;
    modal.showModal();

}


closeModal.addEventListener("click",()=>{

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


/*****************************
 * Restore Active Button
 *****************************/

const savedCategory =
    getCategory() || "all";

filterButtons.forEach(button => {
    if (button.dataset.category === savedCategory) {
        button.classList.add("active-filter");
    }

});