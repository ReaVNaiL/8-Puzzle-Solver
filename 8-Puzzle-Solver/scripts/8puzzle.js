function shuffleGrid() {
    var grid = document.getElementById('grid');

    var gridElements = grid.getElementsByTagName('div');
    var gridArray = Array.from(gridElements);

    gridArray = shuffleGridArray(gridArray);
    for (var i = 0; i < gridArray.length; i++) {
        grid.appendChild(gridArray[i]);
    }
}

function shuffleGridArray(array) {
    var currentIndex = array.length,
        temp,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

function getCurrentGrid() {
    var gridElements = document.getElementById('grid').getElementsByTagName('div');
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

// Reset Grid using the current grid;
function resetGrid() {
    defaultGrid = [5, 4, 1, 0, 2, 8, 3, 7, 6];

    for (var i = 0; i < defaultGrid.length; i++) {
        var tile = document.getElementById(defaultGrid[i]);
        var grid = document.getElementById('grid');
        grid.appendChild(tile);
    }
}