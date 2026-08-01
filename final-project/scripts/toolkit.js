document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recommendation-form");
    const timestampInput = document.getElementById("timestamp");

    // Set the timestamp as soon as the page loads
    if (timestampInput) {
        timestampInput.value = Date.now().toString();
    }

    // Update it again just before submitting (optional but ensures accuracy)
    if (form && timestampInput) {
        form.addEventListener("submit", () => {
            timestampInput.value = Date.now().toString();
        });
    }
});