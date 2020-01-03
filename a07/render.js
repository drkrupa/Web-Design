import Game from "./engine/game.js";

var g = new Game(4);

export const loadGameBoard = function(game) {
    const $root = $('#root');
    let e = renderGameBoard(game);
    $root.append(e);
}

export function renderGameBoard(game) {
    let r = new Array(16);
    for (let i = 0; i < r.length; i++) {
        if (game.gameState.board[i] == 0) {
            r[i] = "";
        } else {
            r[i] = ""+game.gameState.board[i];
        }
    }
    let c = new Array(16);
    for (let i = 0; i < c.length; i++) {
        if (r[i] == 0) {
            c[i] = "darkgray"
        } else if (r[i] == 2) {
            c[i] = "gainsboro";
        } else if (r[i] == 4) {
            c[i] = "wheat";
        } else if (r[i] == 8) {
            c[i] = "sandybrown";
        } else if (r[i] == 16) {
            c[i] = "darkorange";
        } else if (r[i] == 32) {
            c[i] = "salmon";
        } else if (r[i] == 64) {
            c[i] = "orangered";
        } else {
            c[i] = "gold";
        }
    }
    let e = `<div id="game">
            <div class="title has-text-centered">Score: ${game.gameState.score}</div>
            <div class="columns is-multiline">
            <div class="column is-4"></div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[0]}">
  <p class="title has-text-centered" id=""+${r[0]}>${r[0]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[1]}">
  <p class="title has-text-centered">${r[1]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[2]}">
  <p class="title has-text-centered">${r[2]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[3]}">
  <p class="title has-text-centered">${r[3]}</p>
  </div>
  </div>
  <div class="column is-4"></div>
  <div class="column is-4"></div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[4]}">
  <p class="title has-text-centered">${r[4]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[5]}">
  <p class="title has-text-centered">${r[5]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[6]}">
  <p class="title has-text-centered">${r[6]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[7]}">
  <p class="title has-text-centered">${r[7]}</p>
  </div>
  </div>
  <div class="column is-4"></div>
  <div class="column is-4"></div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[8]}">
  <p class="title has-text-centered">${r[8]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[9]}">
  <p class="title has-text-centered">${r[9]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[10]}">
  <p class="title has-text-centered">${r[10]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[11]}">
  <p class="title has-text-centered">${r[11]}</p>
  </div>
  </div>
  <div class="column is-4"></div>
  <div class="column is-4"></div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[12]}">
  <p class="title has-text-centered">${r[12]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[13]}">
  <p class="title has-text-centered">${r[13]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[14]}">
  <p class="title has-text-centered">${r[14]}</p>
  </div>
  </div>
  <div class="column" style="background-color:gray">
  <div class="box" style="background-color:${c[15]}">
  <p class="title has-text-centered">${r[15]}</p>
  </div>
  </div>
  <div class="column is-4"></div>
</div>


</div>`
return e;
}

export function handleButtonPress(event) {
    g = new Game(4);
    let e = renderGameBoard(g);
    $('#game').replaceWith(e);
    $('#lost').remove();
    $('#won').remove();
    g.onLose(handleLose);
    g.onWin(handleWin);
}

export function handleKeyUp(event) {
    if (event.which == 37) {
        g.move("left");
        let e = renderGameBoard(g);
        $('#game').replaceWith(e);
    } else if (event.which == 38) {
        g.move("up");
        let e = renderGameBoard(g);
        $('#game').replaceWith(e);
    } else if (event.which == 39) {
        g.move("right");
        let e = renderGameBoard(g);
        $('#game').replaceWith(e);
    } else if (event.which == 40) {
        g.move("down");
        let e = renderGameBoard(g);
        $('#game').replaceWith(e);
    }
}

export function handleLose() {
    let e = `<div id="lost" class="hero is-dark">
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title has-text-centered">YOU LOST :(</h1>
        </div>
    </div>
</div>`
$('#root').append(e);
$('#won').remove();
}

export function handleWin() {
    let e = `<div id="won" class="hero is-dark">
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title has-text-centered">YOU WON :)</h1>
        </div>
    </div>
</div>`
$('#won').remove();
$('#root').append(e);
}



$(document).ready(() => {
    $("button").on('click', handleButtonPress);
    $(document).keyup(handleKeyUp);
    g.onLose(handleLose);
    g.onWin(handleWin);
    loadGameBoard(g);
});