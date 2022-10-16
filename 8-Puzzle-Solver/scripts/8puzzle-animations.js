/* ------------------ Puzzle Event Animations ------------------ */
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
    document.getElementById('container-box').classList.remove('hidden');

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
        buttons[i].classList.add('fade-out');
    }

    // Wait 1 second and hide the buttons
    setTimeout(function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.add('remove');
            buttons[i].classList.remove('fade-out');
        }
    }, 100);
}

// Show all Buttons
function showAllButtons() {
    let buttons = document.getElementsByClassName('btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('fade-in');
    }

    // Wait 1 second and hide the buttons
    setTimeout(function () {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('fade-in');
        }
    }, 500);
}

// Reset Default Buttons
function resetButtons() {
    document.getElementById('container-box').classList.add('hidden');

    let solveButton = document.getElementById('solve');
    let resetButton = document.getElementById('reset');
    let solutionButton = document.getElementById('solution');

    solveButton.classList.remove('remove');
    resetButton.classList.remove('remove');
    solutionButton.classList.add('remove');
    showAllButtons();
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
async function displayAdjacentElements(time) {
    var gridArray = getCurrentGrid();
    let adjacentElements = getAdjacentElementsHtml(gridArray);

    // add ajacent classes to the tiles
    for (let i = 0; i < adjacentElements.length; i++) {
        let element = document.getElementById(`${adjacentElements[i]}`);
        element.classList.add('adjacent');
    }

    // wait 650 ms and remove the classes
    await new Promise((resolve) => setTimeout(resolve, time));
    for (let i = 0; i < adjacentElements.length; i++) {
        let element = document.getElementById(`${adjacentElements[i]}`);
        element.classList.remove('adjacent');
    }
}

async function highlightMovedTile(grid1, grid2) {
    // Get the tile that was moved
    let movedTile = findMovedElement(grid1, grid2);

    // Get the tile element
    let tile = document.getElementById(`${movedTile}`);
    tile.classList.add('adjacent');

    // wait 300 ms and remove the classes
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
    if (index > 0) await highlightMovedTile(currentGrid, previousGrid);
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Drawing the grid
    drawGrid(currentGrid);

    if (index > 0) await highlightMovedTile(currentGrid, previousGrid);
    if (index < solutionArr.length - 1) await new Promise((resolve) => setTimeout(resolve, 150));
    await new Promise((resolve) => setTimeout(resolve, 300));
}

function addElementToStatsBox(content, isAppend) {
    let element = document.createElement('p');
    element.textContent = content;
    element.classList.add('stats-text');
    let boxElements = document.getElementsByClassName('stats-box');
    if (isAppend) boxElements[0].appendChild(element);
    else boxElements[0].prepend(element);
}

function updateStatsBox(stats) {
    console.log(stats);

    // Create a new element for each stat
    for (let i = 0; i < stats.length; i++) {
        addElementToStatsBox(stats[i], true);
    }
}

function clearStatsBox() {
    let boxElements = document.getElementsByClassName('stats-box');

    // Remove all elements from the stats box except the first 2
    while (boxElements[0].children.length > 0) {
        boxElements[0].removeChild(boxElements[0].lastChild);
    }
}
