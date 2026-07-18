document.addEventListener("DOMContentLoaded", () => {
    const dataDisplay = document.getElementById("data-review-display");

    if (dataDisplay) {
      
        const urlParams = new URLSearchParams(window.location.search);

       
        const expectedFields = [
            { key: "firstname", label: "First Name" },
            { key: "lastname", label: "Last Name" },
            { key: "orgtitle", label: "Organizational Title" },
            { key: "email", label: "Email Address" },
            { key: "phone", label: "Mobile Number" },
            { key: "orgname", label: "Business/Org Name" },
            { key: "membership-level", label: "Selected Tier" },
            { key: "description", label: "Business Description" },
            { key: "timestamp", label: "Submission Time" }
        ];

        let displayHTML = `<div class="receipt-table">`;
        let validFieldsFound = 0;

        expectedFields.forEach(field => {
            if (urlParams.has(field.key)) {
                let value = urlParams.get(field.key).trim();

                // Skip printing the field if the user left an optional field blank
                if (value === "") {
                    return;
                }

                // Convert raw milliseconds string into a human-readable date
                if (field.key === "timestamp") {
                    const milliseconds = Number(value);
                    if (!isNaN(milliseconds)) {
                        value = new Date(milliseconds).toLocaleString(undefined, {
                            dateStyle: "long",
                            timeStyle: "short"
                        });
                    }
                }

                // Capitalize the membership tier
                if (field.key === "membership-level") {
                    value = value.toUpperCase();
                }

                // Sanitize user inputs safely to protect document structures
                const div = document.createElement("div");
                div.textContent = value;
                let cleanValue = div.innerHTML;

                displayHTML += `
                    <div class="receipt-row">
                        <span class="receipt-label">${field.label}</span>
                        <span class="receipt-value">${cleanValue}</span>
                    </div>
                `;
                validFieldsFound++;
            }
        });

        displayHTML += `</div>`;

       
        if (validFieldsFound > 0) {
            dataDisplay.className = ""; 
            dataDisplay.innerHTML = displayHTML;
        } else {
            dataDisplay.innerHTML = `
                <p class="loading-fallback" style="color: #d9534f;">
                    No application configuration data was detected in this load session execution.
                </p>
            `;
        }
    }

    // Auto-update footer current year text element
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});