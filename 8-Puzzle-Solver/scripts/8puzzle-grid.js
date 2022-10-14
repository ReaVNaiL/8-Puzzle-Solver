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

// Convert Int Array to String Array
function convertToStringArray(intArray) {
    let stringArray = [];
    for (let i = 0; i < intArray.length; i++) {
        stringArray.push(intArray[i].toString());
    }
    return stringArray;
}

// Finds the element that was moved between two grids
function findMovedElement(grid1, grid2) {
    let movedElement = 0;

    for (let i = 0; i < grid1.length; i++) {
        if (grid1[i] != grid2[i] && grid1[i] != 0) {
            movedElement = grid1[i];
        }
    }

    return movedElement;
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
    clearStatsBox();
    resetGrid();

    let newGrid = shuffleGridArray(getCurrentGrid());
    
    while(!isSolutionPossible(newGrid)) {
        shuffleGridArray(newGrid);
    }

    drawGrid(newGrid);
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

function getCurrentGridInt() {
    var gridElements = document
        .getElementById('grid')
        .getElementsByTagName('div');

    var gridArray = Array.from(gridElements);
    var newGrid = [];

    for (var i = 0; i < gridArray.length; i++) {
        newGrid.push(parseInt(gridArray[i].innerHTML));
    }

    return newGrid;
}

function solveGrid() {
    initializePuzzle();

    let goalGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let grid = getCurrentGridInt();
    
    /* Test Cases */
    // let grid = [ 1, 2, 3, 4, 0, 6, 7, 5, 8 ] // Easy Puzzle
    // let grid = [0, 1, 2, 4, 5, 3, 6, 7, 8]; // Medium Puzzle
    // let grid = [ 4, 0, 1, 5, 3, 2, 6, 7, 8]; // Harder Puzzle
    // let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7]; // Should Be Solving The Puzzle
    
    let canBeSolved = isSolutionPossible(grid);

    if (canBeSolved) {
        disableEvents();
        hideAllButtons();
        let start = new Date();

        aStarSearch(grid, goalGrid).then((solution) => {
            let end = new Date();
            let time = end - start;
            console.log("Time: ", time);

            if (isSolved()) {
                puzzleCompleted();
                disableEvents();
            }

            // Update time in HTML
            document.getElementById('time').innerHTML = "Time: " + time + " ms";
            
            // Wait for click event on solution button
            document.getElementById('solution').addEventListener('click', () => {
                // Animate solution
                initializePuzzle();
                hideAllButtons();
                printSolution(solution);
                showAllButtons();
            });
        });
    } else {
        alert("This puzzle cannot be solved!");
    }
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
