const scoresEl = document.querySelector("#scores");
const btnScoresEl = document.querySelector("#btn-scores");

const scoresModalEl = $("#modal-settings");

scoresEl.addEventListener("click", openSettings);
btnScoresEl.addEventListener("click", openSettings);

function openSettings() {
    let scoresX = localStorage.getItem("scores-x");
    let scoresO = localStorage.getItem("scores-o");
    let playerName1 = localStorage.getItem("name-x");
    let playerName2 = localStorage.getItem("name-o");

    const contentScoresModalEl = `
        <div class="player">
            <div class="edit-name">
                <label>Nome do jogador 1:</label>
                <input type="text" id="name-x" placeholder="${playerName1}"/>
            </div>
            <div class="number-wins">
                <span>${scoresX} vitórias</span>
            </div>
        </div>
        <div class="player">
            <div class="edit-name">
                <label>Nome do jogador 2:</label>
                <input type="text" id="name-o" placeholder="${playerName2}"/>
            </div>
            <div class="number-wins">
                <span>${scoresO} vitórias</span>
            </div>
        </div>
    `;

    const settingsModal = document.querySelector(".settings-modal-body");
    settingsModal.innerHTML = contentScoresModalEl;
    scoresModalEl.modal("show");
}

document.querySelector("#btn-save").addEventListener("click", () => {
    let inputPlayerName1 = document.querySelector("#name-x").value;
    let inputPlayerName2 = document.querySelector("#name-o").value;

    console.log(inputPlayerName2);

    if (inputPlayerName1) {
        document.querySelector("#player-name-x").innerText = inputPlayerName1;
        localStorage.setItem("name-x", inputPlayerName1);
        scoresModalEl.modal("hide");
    }
    
    if (inputPlayerName2) {
        document.querySelector("#player-name-o").innerText = inputPlayerName2;
        localStorage.setItem("name-o", inputPlayerName2);
        scoresModalEl.modal("hide");
    }
});

document.querySelector("#btn-clear").addEventListener("click", () => {
    localStorage.removeItem("name-x");
    localStorage.removeItem("name-o");
    localStorage.removeItem("scores-x");
    localStorage.removeItem("scores-o");
    location.reload();
});
