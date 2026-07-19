document.addEventListener("DOMContentLoaded", () => {
    const modalButtons = document.querySelectorAll(".open-modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal-btn");
    const modals = document.querySelectorAll(".membership-modal");
    const joinForm = document.getElementById("membership-form");

    // --- Force Timestamp on Form Submission ---
    if (joinForm) {
        joinForm.addEventListener("submit", () => {
            const timestampInput = document.getElementById("form-timestamp");
            if (timestampInput) {
                // Captures the exact millisecond count right before redirecting
                timestampInput.value = Date.now(); 
            }
        });
    }

    // Open Modal Action
    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.showModal(); 
            }
        });
    });

    // Close Modal Action via Button Click
    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const openModal = e.target.closest("dialog");
            if (openModal) {
                openModal.close();
            }
        });
    });

    // Close Modal Action via Clicking Outside content window frame boundary zones
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});