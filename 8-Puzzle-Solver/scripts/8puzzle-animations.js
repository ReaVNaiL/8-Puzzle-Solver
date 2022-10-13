// Display Adjacent Elements
function displayAdjacentElements() {
    var gridArray = getCurrentGrid();
    let adjacentElements = getAdjacentElements(gridArray);

    // add ajacent classes to the tiles
    for (let key in adjacentElements) {
        if (adjacentElements.hasOwnProperty(key)) {
            let tile = document.getElementById(adjacentElements[key]);
            tile.classList.add('adjacent');
        }
    }

    // wait 650 ms and remove the classes
    setTimeout(function () {
        for (let key in adjacentElements) {
            if (adjacentElements.hasOwnProperty(key)) {
                let tile = document.getElementById(adjacentElements[key]);
                tile.classList.remove('adjacent');
            }
        }
    }, 650);
}

// Toggle Complete Puzzle Button
function toggleCompleted() {
    if (document.getElementById('grid').classList.contains('completed')) {
        initializePuzzle();
    } else {
        puzzleCompleted();
    }
}

// Complete Puzzle Animation
function puzzleCompleted() {
    //Add background-completed class to body element
    document.body.classList.add('background-completed');

    document.getElementById('grid').classList.add('completed');

    let buttons = document.getElementsByClassName('btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('completed');
    }

    let text = document.getElementsByClassName('title');
    text[0].textContent = 'Puzzle Completed!';
    text[0].classList.add('title-completed');
}

// Reset Puzzle Animations
function initializePuzzle() {
    document.body.classList.remove('background-completed');
    document.getElementById('grid').classList.remove('completed');

    let buttons = document.getElementsByClassName('btn');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('completed');
    }

    let text = document.getElementsByClassName('title');
    text[0].textContent = '8-Puzzle Solver';
    text[0].classList.remove('title-completed');
}
