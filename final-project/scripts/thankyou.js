document.addEventListener("DOMContentLoaded", () => {
    const dataDisplay = document.getElementById("data-review-display");

    if (!dataDisplay) return;

    const urlParams = new URLSearchParams(window.location.search);

const expectedFields = [
    { key: "fname", label: "First Name" },
    { key: "lastname", label: "Last Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Mobile Number" },
    { key: "category", label: "Category" },
    { key: "url", label: "Resource URL" },
    { key: "comments", label: "Why It's Helpful" },
    { key: "timestamp", label: "Submission Time" }
];

    let displayHTML = `<div class="receipt-table">`;
    let validFieldsFound = 0;

    expectedFields.forEach(field => {
        if (!urlParams.has(field.key)) return;

        let value = (urlParams.get(field.key) || "").trim();

        if (!value) return;

        // Format timestamp
        if (field.key === "timestamp") {
            const milliseconds = Number(value);
            if (!isNaN(milliseconds) && milliseconds > 0) {
                value = new Date(milliseconds).toLocaleString(undefined, {
                    dateStyle: "long",
                    timeStyle: "short"
                });
            }
        }

        // Display category in uppercase
        if (field.key === "category") {
            value = value.toUpperCase();
        }

        // Sanitize user input
        const div = document.createElement("div");
        div.textContent = value;
        let cleanValue = div.innerHTML;

        // Make URL clickable
        if (field.key === "url" && value.startsWith("http")) {
            cleanValue = `<a href="${cleanValue}" target="_blank" rel="noopener noreferrer">${cleanValue}</a>`;
        }

        displayHTML += `
            <div class="receipt-row">
                <span class="receipt-label">${field.label}</span>
                <span class="receipt-value">${cleanValue}</span>
            </div>
        `;

        validFieldsFound++;
    });

    displayHTML += `</div>`;

    if (validFieldsFound > 0) {
        dataDisplay.classList.remove("loading-fallback");
        dataDisplay.innerHTML = displayHTML;
    } else {
        dataDisplay.innerHTML = `
            <p class="loading-fallback" style="color:#ef4444; text-align:center;">
                No submission data was found.
            </p>
        `;
    }
});