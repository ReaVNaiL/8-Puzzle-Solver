// 8 Puzzle Solver
// let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7];
// let grid = [0, 1, 2, 4, 5, 3, 6, 7, 8]; // Medium Puzzle
let grid = [ 4, 0, 1, 5, 3, 2, 6, 7, 8]; // Harder Puzzle
// let grid = [5, 4, 1, 0, 2, 8, 3, 6, 7]; // Should Be Solving The Puzzle
// let grid = [4, 1, 0, 5, 3, 2, 6, 7, 8];
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
        let possibleMoves = await getPossibleMoves(currentNode.grid);
        // Wait for 1 second
        await new Promise(resolve => setTimeout(resolve, 1));
        for (let i = 0; i < possibleMoves.length; i++) {
            let newGrid = await swap(
                currentNode.grid,
                possibleMoves[i][0],
                possibleMoves[i][1]
            );
            let newNode = new Node(newGrid, currentNode.g + 1, 0, currentNode);
            children.push(newNode);
        }

        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                let inClosedList = false;
                for (let j = 0; j < closedList.length; j++) {
                    if (child.grid.toString() === closedList[j].grid.toString()) {
                        inClosedList = true;
                        break;
                    }
                }
                if (inClosedList) {
                    continue;
                }
                child.h = await heuristic(child.grid, goalGrid);
                child.f = child.g + child.h;
                console.log("State: ", child.grid, "f: ", child.f, "g: ", child.g, "h: ", child.h);

                /* This is addons. */
                // console.log(printGrid(solution[i]));
                let newSol = convertToStringArray(child.grid);
                // wait for 1 second
                drawGrid(newSol);
                
                
                let inOpenList = false;
                for (let j = 0; j < openList.length; j++) {
                    if (child.grid.toString() === openList[j].grid.toString()) {
                        inOpenList = true;
                        break;
                    }
                }
                if (!inOpenList) {
                    openList.push(child);
                }
            }
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

// Calculate Heuristic Asynchronously
async function heuristic(grid, goalGrid) {
    let heuristic = 0;
    for (let i = 0; i < grid.length; i++) {
        let currTile = grid[i];
        let goalIndex = goalGrid.indexOf(currTile);
        heuristic += distanceFromGoal(i, goalIndex);
    }
    return heuristic;
}

// Get Possible Moves Async
async function getPossibleMoves(grid) {
    let possibleMoves = [];
    let zeroIndex = grid.indexOf(0);
    if (zeroIndex % 3 != 0) {
        possibleMoves.push([zeroIndex, zeroIndex - 1]);
    }
    if (zeroIndex % 3 != 2) {
        possibleMoves.push([zeroIndex, zeroIndex + 1]);
    }
    if (zeroIndex > 2) {
        possibleMoves.push([zeroIndex, zeroIndex - 3]);
    }
    if (zeroIndex < 6) {
        possibleMoves.push([zeroIndex, zeroIndex + 3]);
    }
    return possibleMoves;
}


// Swap Function Async
async function swap(grid, index1, index2) {
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
async function printSolution(solution) {
    for (let i = 0; i < solution.length; i++) {
        // console.log(printGrid(solution[i]));
        let newSol = convertToStringArray(solution[i]);
        // wait for 1 second
        await new Promise(resolve => setTimeout(resolve, 500));
        drawGrid(newSol);
    }
    puzzleCompleted();
}

// Convert Int Array to String Array
function convertToStringArray(intArray) {
    let stringArray = [];
    for (let i = 0; i < intArray.length; i++) {
        stringArray.push(intArray[i].toString());
    }
    return stringArray;
}


// Run Program
// Measure the time it takes to solve the puzzle

// let solution = aStarSearch(grid, goalGrid);
// printSolution(solution);
