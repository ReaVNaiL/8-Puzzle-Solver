console.clear();

function shuffleGrid() {
    var grid = document.getElementById('grid');

    var gridElements = grid.getElementsByTagName('div');
    var gridArray = Array.from(gridElements);

    gridArray = shuffle(gridArray);
    for (var i = 0; i < gridArray.length; i++) {
        grid.appendChild(gridArray[i]);
    }
}

function shuffle(array) {
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
    var grid = document.getElementById('grid');
    var gridElements = grid.getElementsByTagName('div');
    var gridArray = Array.from(gridElements);
    var newGrid = [];

    for (var i = 0; i < gridArray.length; i++) {
        newGrid.push(gridArray[i].innerHTML);
    }

    return newGrid;
}

function solve_grid() {
    // TODO: Implement this function
}
