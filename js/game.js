
(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    let x = true;
    let o = false;

    const $game = document.querySelector('#game');

    const $gameBoard = document.createElement('div');
    $gameBoard.id = 'game-board';

    const $player1 = document.createElement('div');
    $player1.id = 'player-1';
    $player1.className = 'players';
    $player1.innerHTML = `<h2>Jogador 1</h2>`;

    const $player2 = document.createElement('div');
    $player2.id = 'player-2';
    $player2.className = 'players';
    $player2.innerHTML = `<h2>Jogador 2</h2>`;

    $game.appendChild($player1);
    $game.appendChild($gameBoard);
    $game.appendChild($player2);

    for (let i = 0; i < 3; i++) {
        const $x = document.createElement('div');
        const $o = document.createElement('div');

        $x.className = 'x-parts parts';
        $o.className = 'y-parts parts';

        $x.id = 'x-' + i;
        $o.id = 'o-' + i;

        $x.draggable = x;
        $o.draggable = o;

        $player1.appendChild($x);
        $player2.appendChild($o);
    }

    for (let i = 0; i < 9; i++) {
        const $square = document.createElement('div');
        $square.className = 'squares';

        $gameBoard.appendChild($square);
    }

    const $parts = document.querySelectorAll('.parts');
    const $squares = document.querySelectorAll('.squares');

    $parts.forEach(part => {
        part.ondragstart = function(event) {
            event.dataTransfer.setData("text", event.target.id);
            event.dataTransfer.effectAllowed = "move";
        };
    });

    $squares.forEach(square => {
        square.ondragover = function(event) {
            event.preventDefault();
        };
    });

    $squares.forEach(square => {
        square.ondrop = function(event) {
            let data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            event.preventDefault();
            changePlayer();
        }; 
    });

    function changePlayer() {
        const $parts = document.querySelectorAll('.parts');

        $parts.forEach(part => {
            part.draggable = !part.draggable;
        });
    }
})();