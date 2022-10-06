/* ------------------ Helper Functions ------------------ */
function shuffleGridArray(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* ------------------ Draw Grid Function ------------------ */
function drawGrid(defaultGrid) {
    for (var i = 0; i < defaultGrid.length; i++) {
        var tile = document.getElementById(defaultGrid[i]);
        var grid = document.getElementById('grid');
        grid.appendChild(tile);
    }
}

function resetGrid() {
    var standardGrid = [5, 4, 1, 0, 2, 8, 3, 6, 7];
    initializePuzzle();
    addTileEventListeners();
    drawGrid(standardGrid);
}

function shuffleGrid() {
    resetGrid();
    var gridArray = getCurrentGrid();
    drawGrid(shuffleGridArray(gridArray));
}

function getCurrentGrid() {
    var gridElements = document
        .getElementById('grid')
        .getElementsByTagName('div');
        
    var gridArray = Array.from(gridElements);
    var newGrid = [];

    for (var i = 0; i < gridArray.length; i++) {
        newGrid.push(gridArray[i].innerHTML);
    }

    return newGrid;
}

function solveGrid() {
    // TODO: Implement this function
}

function isSolved() {
    var gridArray = getCurrentGrid();
    var solvedGrid = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

    for (var i = 0; i < gridArray.length; i++) {
        if (gridArray[i] != solvedGrid[i]) {
            return false;
        }
    }
    return true;
}

/* ------------------ StartUp Call ------------------ */
initializePuzzle();
addTileEventListeners();
