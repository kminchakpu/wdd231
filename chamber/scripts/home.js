// Configuration constants
const WEATHER_API_URL =
    "https://api.openweathermap.org/data/2.5/forecast?q=Kano,NG&units=metric&appid=8fe74b653d457a7148ddc2e78f2b9506";

const MEMBERS_JSON_URL = "data/members.json";

document.addEventListener("DOMContentLoaded", () => {
    initWeather();
    initSpotlights();
});

/**
 * Weather Module
 */
async function initWeather() {
    try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
            throw new Error("Weather metrics failed to fetch.");
        }

        const data = await response.json();

        // Current Weather
        const currentData = data.list[0];

        document.getElementById("current-temp").textContent =
            `${Math.round(currentData.main.temp)}°C`;

        document.getElementById("weather-desc").textContent =
            currentData.weather[0].description;

        document.getElementById("humidity").textContent =
            `${currentData.main.humidity}%`;

        const icon = document.getElementById("weather-icon");
        icon.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
        icon.alt = currentData.weather[0].description;

        // 3-Day Forecast
        const forecastList = document.getElementById("forecast-list");
        forecastList.innerHTML = "";

        const today = data.list[0].dt_txt.split(" ")[0];
        const days = [];

        data.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            if (
                date !== today &&
                !days.some(day => day.date === date) &&
                days.length < 3
            ) {
                days.push({
                    date,
                    temp: Math.round(item.main.temp),
                    description: item.weather[0].description
                });
            }
        });

        days.forEach(day => {
            const dayName = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "long"
            });

            const li = document.createElement("li");
            li.innerHTML = `<strong>${dayName}</strong>: ${day.temp}°C — <em>${day.description}</em>`;
            forecastList.appendChild(li);
        });

    } catch (error) {
        console.error(error);

        document.getElementById("weather-desc").textContent =
            "Weather data unavailable.";
    }
}

/**
 * Spotlight Module
 */
/**
 * Spotlight Module
 */
async function initSpotlights() {
    try {
        const response = await fetch(MEMBERS_JSON_URL);

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        // members.json is an array
        const members = await response.json();

        // Only Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 2 ||
            member.membershipLevel === 3
        );

        // Shuffle the eligible members
        const shuffled = [...eligibleMembers].sort(() => Math.random() - 0.5);

        // Always display exactly 3 members
        const selectedMembers = shuffled.slice(0, 3);

        const container = document.getElementById("spotlight-container");
        container.innerHTML = "";

        selectedMembers.forEach(member => {
            const membership =
                member.membershipLevel === 3 ? "Gold" : "Silver";

            const card = document.createElement("section");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy">

                <h4>${member.name}</h4>

                <p class="spotlight-tagline">${member.tagline}</p>

                <hr>

                <p><strong>Phone:</strong> ${member.phone}</p>

                <p><strong>Address:</strong> ${member.address}</p>

                <p>
                    <a href="${member.website}" target="_blank" rel="noopener">
                        Visit Website
                    </a>
                </p>

                <p><strong>Membership:</strong> ${membership}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);

        document.getElementById("spotlight-container").innerHTML =
            "<p>Unable to load business spotlights.</p>";
    }
}