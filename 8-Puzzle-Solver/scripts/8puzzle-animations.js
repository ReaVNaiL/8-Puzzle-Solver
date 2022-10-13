// Complete Puzzle Animation
function puzzleCompleted() {
    hideButtons();

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
    resetButtons();

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

// Hide Reset/Solve Buttons
function hideButtons() {
    let solveButton = document.getElementById('solve');
    let resetButton = document.getElementById('reset');
    let shuffleButton = document.getElementById('shuffle');
    let solutionButton = document.getElementById('solution');

    solveButton.classList.add('remove');
    resetButton.classList.add('remove');
    shuffleButton.classList.remove('remove');
    solutionButton.classList.remove('remove');
}

// Hide all Buttons
function hideAllButtons() {
    let buttons = document.getElementsByClassName('btn');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('remove');
    }
}

// Reset Default Buttons
function resetButtons() {
    let solveButton = document.getElementById('solve');
    let resetButton = document.getElementById('reset');
    let shuffleButton = document.getElementById('shuffle');
    let solutionButton = document.getElementById('solution');

    solveButton.classList.remove('remove');
    resetButton.classList.remove('remove');
    solutionButton.classList.add('remove');
}

// Toggle Complete Puzzle Button
function toggleCompleted() {
    if (document.getElementById('grid').classList.contains('completed')) {
        initializePuzzle();
    } else {
        puzzleCompleted();
    }
}

// Display Adjacent Elements
function displayAdjacentElements(time) {
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
    }, time);
}

function highlightMovedTile(grid1, grid2) {
    // Get the tile that was moved
    let movedTile = findMovedElement(grid1, grid2);

    // Get the tile element
    let tile = document.getElementById(`${movedTile}`);
    tile.classList.add('adjacent');

    // wait 650 ms and remove the classes
    setTimeout(function () {
        tile.classList.remove('adjacent');
    }, 300);
}

/*-- Function to display animation of solution once found. --*/
async function displaySolution(solutionArr, index) {
    // Saving Grids to variables
    let currentGrid = convertToStringArray(solutionArr[index]);
    let previousGrid = [];

    if (index > 0) previousGrid = convertToStringArray(solutionArr[index - 1]);

    // Highlighting the tiles that are different
    if (index > 0) highlightMovedTile(currentGrid, previousGrid);
        await new Promise((resolve) => setTimeout(resolve, 100));

    // Drawing the grid
    drawGrid(currentGrid);

    if (index > 0) highlightMovedTile(currentGrid, previousGrid);
    if (index < solutionArr.length - 1)
        await new Promise((resolve) => setTimeout(resolve, 600));
}
