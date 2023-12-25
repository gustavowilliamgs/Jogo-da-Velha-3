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

    $x.className = 'x-parts';
    $o.className = 'y-parts';

    $x.draggable = "true";
    $o.draggable = "true";

    $player1.appendChild($x);
    $player2.appendChild($o);
}

for (let i = 0; i < 9; i++) {
    const $square = document.createElement('div');
    $square.className = 'squares';

    $gameBoard.appendChild($square);
}