class Leaf {
    constructor(state, depth, parent) {
        this.state = state;
        this.depth = depth;
        this.cost = heuristicCost(this.state);
        this.total = this.depth + this.cost;
        this.parent = parent;
    }
}

// A* Search Algorithm
async function aStarSearch(grid) {
    let openList = [];
    let closedList = [];
    let startNode = new Leaf(grid, 0, null);
    openList.push(startNode);

    // Stats Helper
    let maxCost = (exploredStates = moves = 0);

    while (openList.length > 0) {

        // Only await 1ms to allow the UI to update every 20 iterations
        if (openList.length % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 1));
            displayAdjacentElements(1);
        }

        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].total < currentNode.total) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (isSolved(currentNode.state)) {
            drawGrid(currentNode.state);
            let path = [];
            let current = currentNode;
            while (current != null) {
                path.push(current.state);
                current = current.parent;
            }
            let stats = ['States Explored:  ' + exploredStates, 'Optimal Moves:  ' + moves, 'Maximum Cost:  ' + maxCost];
            updateStatsBox(stats);
            console.log(stats);
            return path.reverse();
        }

        let leaves = [];
        let possibleMoves = await getPossibleMoves(currentNode.state);

        for (let i = 0; i < possibleMoves.length; i++) {
            let newGrid = await swap(currentNode.state, possibleMoves[i][0], possibleMoves[i][1]);
            let newNode = new Leaf(newGrid, currentNode.depth + 1, currentNode);
            leaves.push(newNode);
            exploredStates++;
        }

        if (leaves.length > 0) {
            for (let i = 0; i < leaves.length; i++) {
                let child = leaves[i];
                let inClosed = false;
                for (let j = 0; j < closedList.length; j++) {
                    if (child.state.toString() === closedList[j].state.toString()) {
                        inClosed = true;
                        break;
                    }
                }
                if (inClosed) {
                    continue;
                }

                console.log(
                    'State: ', child.state,
                    '\nTotal Cost: ', child.total,
                    'Depth: ', child.depth,
                    'Distance: ', child.cost,
                    'Deepest Leaf: ', moves,
                );

                /*=== UI and Stats Updates ===*/
                drawGrid(convertToStringArray(child.state));
                if (child.depth > moves) moves = child.depth;
                if (child.total > maxCost) maxCost = child.total;

                let inOpen = false;
                for (let j = 0; j < openList.length; j++) {
                    if (child.state.toString() === openList[j].state.toString()) {
                        inOpen = true;
                        break;
                    }
                }
                if (!inOpen) {
                    openList.push(child);
                }
            }
        }
    }
    return 'No solution found';
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
    let gridString = '';
    for (let i = 0; i < grid.length; i++) {
        if (i % 3 === 0) {
            gridString += '[ ';
        }
        gridString += grid[i] + ' ';
        if (i % 3 === 2) {
            gridString += ']\n';
        }
    }
    return gridString;
}

// Print Solution
async function printSolution(solution) {
    console.log('Solution: \n');
    drawGrid(solution[0]);
    for (let i = 0; i < solution.length; i++) {
        console.log('Step ', i, ': \n' + printGrid(solution[i]));

        await displaySolution(solution, i);
    }
    puzzleCompleted();
    disableEvents();
}
