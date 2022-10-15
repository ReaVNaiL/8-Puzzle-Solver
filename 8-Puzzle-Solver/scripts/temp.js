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

class Leaf {
    constructor(state, depth, parent) {
        this.state = state;
        this.depth = depth;
        this.cost = heuristicCost(state);
        this.total = this.depth + this.cost;
        this.parent = parent;
    }
}

// A* Search Algorithm
async function aStarSearch(grid) {
    let openList = [];
    let closedList = [];
    let startNode = new Node(grid, 0, 0, null);
    openList.push(startNode);

    // Helper
    let maxCost = exploredStates = moves = 0;

    while (openList.length > 0) {
        // Only await 1ms to allow the UI to update every 20 iterations
        if (openList.length % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1));
            displayAdjacentElements(1);
        }
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
        
        if (isSolved(currentNode.grid)) {
            drawGrid(currentNode.grid);
            let path = [];
            let current = currentNode;
            while (current != null) {
                path.push(current.grid);
                current = current.parent;
            }
            let stats = ["States Explored:  " + exploredStates, "Optimal Moves:  " + moves, "Maximum Cost:  " + maxCost];
            updateStatsBox(stats);
            console.log(stats);
            return path.reverse();
        }
        let children = [];
        let possibleMoves = await getPossibleMoves(currentNode.grid);
        // Wait for 1 second
        for (let i = 0; i < possibleMoves.length; i++) {
            let newGrid = await swap(
                currentNode.grid,
                possibleMoves[i][0],
                possibleMoves[i][1]
            );
            let newNode = new Node(newGrid, currentNode.g + 1, 0, currentNode);
            children.push(newNode);
            exploredStates++;
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

                child.h = await heuristicCost(child.grid);
                // child.h = await heuristic(child.grid, goalGrid);
                child.f = child.g + child.h;
                console.log("State: ", child.grid, "\nTotal Cost: ", child.f, "Depth: ", child.g, "Distance: ", child.h, "Deepest Leaf: ", moves);

                /* This is addons. */
                let newSol = convertToStringArray(child.grid);
                drawGrid(newSol);
                
                if (child.g > moves) {
                    moves = child.g;
                }

                if (child.f > maxCost) {
                    maxCost = child.f;
                }

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
            gridString += "[ ";
        }
        gridString += grid[i] + " ";
        if (i % 3 === 2) {
            gridString += "]\n";
        }
    }
    return gridString;
}

// Print Solution
async function printSolution(solution) {
    console.log("Solution: \n");
    drawGrid(solution[0]);
    for (let i = 0; i < solution.length; i++) {
        console.log("Step ", i, ": \n" + printGrid(solution[i]));

        await displaySolution(solution, i);
    }
    puzzleCompleted();
    disableEvents();
}