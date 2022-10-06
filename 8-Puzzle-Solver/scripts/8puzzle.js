console.clear();

function shuffle_grid() {
    var grid = document.getElementById('grid');

    var grid_elements = grid.getElementsByTagName('div');
    var grid_elements_array = Array.from(grid_elements);

    grid_elements_array = shuffle(grid_elements_array);
    for (var i = 0; i < grid_elements_array.length; i++) {
        grid.appendChild(grid_elements_array[i]);
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function get_current_grid() {
    var grid = document.getElementById('grid');
    var grid_elements = grid.getElementsByTagName('div');
    var grid_elements_array = Array.from(grid_elements);
    var grid_array = [];

    for (var i = 0; i < grid_elements_array.length; i++) {
        grid_array.push(grid_elements_array[i].innerHTML);
    }

    return grid_array;
}

function solve_grid() {
    // TODO: Implement this function
}
