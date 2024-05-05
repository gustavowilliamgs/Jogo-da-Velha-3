const scoresEl = document.querySelector("#scores");

const scoresModalEl = $("#modal-settings");
scoresEl.addEventListener("click", () => {
    let scoresX = localStorage.getItem("scores-x");
    let scoresO = localStorage.getItem("scores-o");
    let playerName1 = localStorage.getItem("name-x");
    let playerName2 = localStorage.getItem("name-o");

    const contentScoresModalEl = `
        <div class="player">
            <p class="name" id="name-x" contenteditable>${playerName1}</p>
            <span class="wins">${scoresX} vitórias</span>
        </div>
        <div class="player">
            <p class="name" id="name-o" contenteditable>${playerName2}</p>
            <span class="wins">${scoresO} vitórias</span>
        </div>
    `;

    const settingsModal = document.querySelector(".settings-modal-body");
    settingsModal.innerHTML = contentScoresModalEl;
    scoresModalEl.modal("show");
});

document.querySelector("#btn-save").addEventListener("click", () => {
    let inputPlayerName1 = document.querySelector("#name-x").innerText;
    let inputPlayerName2 = document.querySelector("#name-o").innerText;

    document.querySelector("#player-name-x").innerText = inputPlayerName1;
    document.querySelector("#player-name-o").innerText = inputPlayerName2;

    localStorage.setItem("name-x", inputPlayerName1);
    localStorage.setItem("name-o", inputPlayerName2);
});
