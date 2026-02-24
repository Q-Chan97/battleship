// Event listeners

// Player name dialog

export async function getPlayerName() {
    return new Promise((resolve) => {
        const submitButton = document.getElementById("player-name-submit-button");
        const playerNameInput = document.getElementById("player-name-input");
        const playerNameDialog = document.getElementById("player-name-dialog");

        playerNameDialog.showModal();

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            const name = playerNameInput.value.trim();
            playerNameDialog.close();

            resolve(name);
        }, { once: true }); // Stops event from being called multiple times
    });
};

export function displayMessage(message) {
    const messageBox = document.getElementById("message-box");

    return messageBox.textContent = message;
}