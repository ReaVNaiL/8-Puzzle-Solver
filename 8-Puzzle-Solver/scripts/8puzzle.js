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
    addTileEventListeners();
    
    let goalGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let grid = getCurrentGridInt();
    
    // let grid = [ 1, 2, 3, 4, 0, 6, 7, 5, 8 ] // Easy Puzzle
    // let grid = [0, 1, 2, 4, 5, 3, 6, 7, 8]; // Medium Puzzle
    // let grid = [ 4, 0, 1, 5, 3, 2, 6, 7, 8]; // Harder Puzzle
    // let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7]; // Should Be Solving The Puzzle
    
    let canBeSolved = isSolutionPossible(grid);

    if (canBeSolved) {
        
        let start = new Date();

        aStarSearch(grid, goalGrid).then((solution) => {
            let end = new Date();
            let time = end - start;
            console.log("Time: ", time);
            // Update time in HTML
            document.getElementById('time').innerHTML = "Time: " + time + " ms";
            printSolution(solution);
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
