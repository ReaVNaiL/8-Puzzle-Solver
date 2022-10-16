/* ------------------ Helper Functions ------------------ */
// Storing the solution in a global variable
let global_ai_solution = [];
let manual_moves = 0;


// Shuffle the grid array
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

// Convert String Array To Int Array
function convertToIntArray(stringArray) {
    let intArray = [];
    for (let i = 0; i < stringArray.length; i++) {
        intArray.push(parseInt(stringArray[i]));
    }
    return intArray;
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

function startPuzzle() {
    initializePuzzle();
    addTileEventListeners();
}

function completePuzzle() {
    puzzleCompleted();
    disableEvents();
}

/* ------------------ Draw Grid Function ------------------ */
// Draw the grid on the screen with the given array
function drawGrid(defaultGrid) {
    for (var i = 0; i < defaultGrid.length; i++) {
        var tile = document.getElementById(defaultGrid[i]);
        var grid = document.getElementById('grid');
        grid.appendChild(tile);
    }
}

/* ------------------ Helper Grid Functions ------------------ */
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

// Grid Int Variation Int
function getCurrentGridInt() {
    let gridArray = getCurrentGrid();
    let intArray = convertToIntArray(gridArray);
    return intArray;
}

function isSolved(checkGrid) {
    var gridArray = checkGrid ? convertToStringArray(checkGrid) : getCurrentGrid();
    var solvedGrid = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

    for (var i = 0; i < gridArray.length; i++) {
        if (gridArray[i] != solvedGrid[i]) {
            return false;
        }
    }
    return true;
}


/* ------------------ Button Event Functions ------------------ */
function resetGrid() {
    manual_moves = 0;
    var standardGrid = [5, 4, 1, 0, 2, 8, 3, 6, 7];
    startPuzzle();
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

async function solveGrid() {
    initializePuzzle();

    let grid = getCurrentGridInt();
    /* Test Cases */
    // let grid = [ 1, 2, 3, 4, 0, 6, 7, 5, 8 ] // Easy Puzzle
    // let grid = [0, 1, 2, 4, 5, 3, 6, 7, 8]; // Medium Puzzle
    // let grid = [ 4, 0, 1, 5, 3, 2, 6, 7, 8]; // Harder Puzzle
    // let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7]; // Should Be Solving The Puzzle
    
    let isPossible = isSolutionPossible(grid);

    if (isPossible) {

        disableEvents();
        hideAllButtons();
        
        await new Promise(r => setTimeout(r, 100));
        let tree = new DecisionTree(grid);

        global_ai_solution = await tree.aStarSearch(true);
        
        if (isSolved()) { 
            completePuzzle()
            let solutionBtn = document.getElementById('solution');
            solutionBtn.innerHTML = 'Show Solution';
            solutionBtn.disabled = false; 
        }
    } else {
        alert("This puzzle cannot be solved!");
    }
}

function showSolution() {
    let solutionBtn = document.getElementById('solution');

    if (global_ai_solution.length > 0) {
        initializePuzzle();
        hideAllButtons();
        printSolution(global_ai_solution);
        showAllButtons();
    } else {
        solutionBtn.innerHTML = 'Not Available';
        solutionBtn.disabled = true;
    }
}

/* ------------------ StartUp Call ------------------ */
startPuzzle();
