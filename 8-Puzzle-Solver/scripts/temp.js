class Leaf {
    constructor(state, depth, parent) {
        this.state = state;
        this.depth = depth;
        this.cost = heuristicCost(this.state);
        this.total_cost = this.depth + this.cost;
        this.parent = parent;
    }
}

// A* Search Algorithm
async function aStarSearch(grid) {
    let toExplore = [];
    let explored = [];

    let root = new Leaf(grid, 0, null);
    toExplore.push(root);

    // Stats Helper
    let maxCost = (exploredStates = moves = 0);

    while (toExplore.length > 0) {

        /*==== UI Visualization ===*/
        // if (toExplore.length % 20 == 0) {
            // await new Promise((resolve) => setTimeout(resolve, 1));
            // displayAdjacentElements(1);
        // }

        let currentLeaf = toExplore[0];
        let leafIndex = 0;

        for (let i = 0; i < toExplore.length; i++) {
            if (toExplore[i].total_cost < currentLeaf.total_cost) {
                currentLeaf = toExplore[i];
                leafIndex = i;
            }
        }

        toExplore.splice(leafIndex, 1);
        explored.push(currentLeaf);

        if (isSolved(currentLeaf.state)) {
            // Reverse the solution found
            let solution = reverseSolutionPath(currentLeaf);
            drawGrid(currentLeaf.state);

            /*==== UI Stats Box Visualization ===*/
            let stats = [`States Explored: ${exploredStates}`, `Optimal Moves: ${moves}`, `Maximum Cost: ${maxCost}`];
            updateStatsBox(stats);
            return solution;
        }

        let leaves = await generateStateLeaves(currentLeaf);

        for (let leaf of leaves) {
            let isExplored = false;
            explored.forEach((exploredLeaf) => {
                if (leaf.state.toString() === exploredLeaf.state.toString()) {
                    isExplored = true;
                }
            });

            if (isExplored) continue;

            // logCurrentLeaf(leaf);

            let notExplored = true;

            toExplore.forEach((toExploreLeaf) => {
                if (leaf.state.toString() === toExploreLeaf.state.toString()) {
                    notExplored = false;
                }
            });

            if (notExplored) toExplore.push(leaf);

            /*=== UI and Stats Updates ===*/
            // drawGrid(convertToStringArray(leaf.state));
            // if (leaf.depth > moves) moves = leaf.depth;
            // if (leaf.total_cost > maxCost) maxCost = leaf.total_cost;
        }
    }
    return 'No solution found';
}


// Swap Function Async
async function swap(grid, index1, index2) {
    let newGrid = grid.slice();
    let temp = newGrid[index1];
    newGrid[index1] = newGrid[index2];
    newGrid[index2] = temp;
    return newGrid;
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
