// 8 Puzzle Solver
// let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7];
// let grid = [1, 2, 3, 4, 5, 6, 7, 0, 8];
let grid = [1, 2, 3, 4, 5, 0, 6, 7, 8];
let goalGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];

// A* Search Algorithm
async function aStarSearch(grid, goalGrid) {
    let openList = [];
    let closedList = [];
    let startNode = new Node(grid, 0, 0, null);
    openList.push(startNode);

    while (openList.length > 0) {
        let currentNode = openList[0];
        let currentIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }
        openList.splice(currentIndex, 1);
        closedList.push(currentNode);
        if (currentNode.grid.toString() === goalGrid.toString()) {
            let path = [];
            let current = currentNode;
            while (current != null) {
                path.push(current.grid);
                current = current.parent;
            }
            return path.reverse();
        }
        let children = [];
        let possibleMoves = getPossibleMoves(currentNode.grid);
        // Wait for 1 second
        // await new Promise(resolve => setTimeout(resolve, 3));
        for (let i = 0; i < possibleMoves.length; i++) {
            let newGrid = swap(
                currentNode.grid,
                possibleMoves[i][0],
                possibleMoves[i][1]
            );
            let newNode = new Node(newGrid, currentNode.g + 1, 0, currentNode);
            children.push(newNode);
        }
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            for (let j = 0; j < closedList.length; j++) {
                if (child.grid.toString() === closedList[j].grid.toString()) {
                    continue;
                }
            }
            child.h = heuristic(child.grid, goalGrid);
            child.f = child.g + child.h;
            // console.log("State: ", child.grid, "f: ", child.f, "g: ", child.g, "h: ", child.h);
            for (let j = 0; j < openList.length; j++) {
                if (
                    child.grid.toString() === openList[j].grid.toString() &&
                    child.g > openList[j].g
                ) {
                    continue;
                }
            }
            openList.push(child);
        }
    }
    return "No solution found";
}

// Node Class
class Node {
    constructor(grid, g, h, parent) {
        this.grid = grid;
        this.g = g;
        this.h = h;
        this.f = g + h;
        this.parent = parent;
    }
}

// Heuristic Function
function distanceFromGoal(currTileIndex, goalIndex) {
    // Get the rows. The grid is 3x3, so the rows are 0, 1, 2
    let rows = [Math.floor(currTileIndex / 3), Math.floor(goalIndex / 3)]

    // Get the columns.
    let columns = [currTileIndex % 3, goalIndex % 3];

    // Calculate the distance x2 - x1 + y2 - y1
    return Math.abs(rows[0] - rows[1]) + Math.abs(columns[0] - columns[1]);
}

function heuristic(state) {
    let solutionGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let cost = 0;

    for (let i = 0; i < state.length; i++) {
        let tile = parseInt(state[i]);
        if (state[i] != 0) {
            let distance = distanceFromGoal(i, solutionGrid.indexOf(tile));
            cost += distance;
        }
    }
    // console.log("State", state, "Cost: ", cost);
    return cost;
}

// Get Possible Moves
function getPossibleMoves(grid) {
    let possibleMoves = [];
    let zeroIndex = grid.indexOf(0);
    if (zeroIndex > 2) {
        possibleMoves.push([zeroIndex, zeroIndex - 3]);
    }
    if (zeroIndex < 6) {
        possibleMoves.push([zeroIndex, zeroIndex + 3]);
    }
    if (zeroIndex % 3 !== 0) {
        possibleMoves.push([zeroIndex, zeroIndex - 1]);
    }
    if (zeroIndex % 3 !== 2) {
        possibleMoves.push([zeroIndex, zeroIndex + 1]);
    }
    return possibleMoves;
}

// Swap Function
function swap(grid, index1, index2) {
    let newGrid = grid.slice();
    let temp = newGrid[index1];
    newGrid[index1] = newGrid[index2];
    newGrid[index2] = temp;
    return newGrid;
}

// Print Grid
function printGrid(grid) {
    let gridString = "";
    for (let i = 0; i < grid.length; i++) {
        if (i % 3 === 0) {
            gridString += "\n[ ";
        }
        gridString += grid[i] + " ";
        if (i % 3 === 2) {
            gridString += "]";
        }
    }
    return gridString;
}

// Print Solution
function printSolution(solution) {
    for (let i = 0; i < solution.length; i++) {
        console.log(printGrid(solution[i]));
    }
}

// Run Program
// Measure the time it takes to solve the puzzle
let start = new Date();
aStarSearch(grid, goalGrid).then((solution) => {
    let end = new Date();
    let time = end - start;
    console.log("Time: ", time);
    printSolution(solution);
});

// let solution = aStarSearch(grid, goalGrid);
// printSolution(solution);
