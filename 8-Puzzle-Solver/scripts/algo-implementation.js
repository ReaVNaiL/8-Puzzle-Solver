/* 
Notes for A* algorithm:
1- The A* algorithm is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.

2- F = G + H
   Where:   
        F = Total cost of the node 
        G = The depth of the tree from the start node to the current node
        H = Heuristic cost of the node to the goal node (estimated cost), which is the sum of the distances of the tiles from their goal positions. 
        i.e: [1, 2, 3, 4, 5, 6, 7, 8, 0] is the goal state, so the heuristic cost of the node [1, 2, 3, 4, 5, 6, 7, 0, 8] is 1, because the tile 8 is 1 step away from its goal position.

3- It needs a heuristic function. It can be anyting, but it must be admissible, meaning that it never overestimates the actual cost to get to the goal.

4- We're going to use a Decision Tree to implement the A* algorithm. Where the root node is the initial state, and the leaf nodes are the goal states. The algorithm will traverse the tree and find the path with the lowest cost (F = G + H).

5- The algorithm is as follows:
    1- Create a root node with the initial state.
    2- Calculate the heuristic cost of the root node plus the depth of the tree from the root node to the current node (F = G + H).
    3- Save the nodes in a priority queue, where the priority is the F value.
    4- Add the new nodes to the tree.
    5- Repeat steps 2-4 until the goal state is found.
    
   ? // Sample initial state:
   ? //    5 4 1
   ? //    0 2 8
   ? //    3 6 7
   ? // Sample goal state:
   ? //    1 2 3
   ? //    4 5 6
   ? //    7 8 0
    
*/  


// Rules:
// 1- The grid is represented as a 1D array
//      grid = [5, 4, 1, 0, 2, 8, 3, 6, 7];
// 2- You can move the empty tile (0) to any adjacent tile
// 3- The adjacent tiles are the tiles that are horizontally or vertically adjacent to the empty tile
// 4- The empty tile can't be moved diagonally

/* ------------------ Algorithm Helper Functions ------------------ */
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
function heuristicCost(state) {
    let solutionGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let cost = 0;

    for (let i = 0; i < state.length; i++) {
        let tile = state[i];
        if (state[i] != 0) {
            let distance = distanceFromGoal(i, solutionGrid.indexOf(tile));
            cost += distance;
        }
    }
    
    // console.log("State", state, "Cost: ", cost);
    return cost;
}

// Detect Number of Inversions
function isSolutionPossible(gridArray) {
    var inversions = 0;

    for (let i = 0; i < gridArray.length; i++) {
        for (let j = i + 1; j < gridArray.length; j++) {
            if (gridArray[i] != '0' && gridArray[j] != '0' && gridArray[i] > gridArray[j]) {
                inversions++;
            }
        }
    }

    // If the number of inversions is even, the solution is possible
    if (inversions % 2 == 0) { return true; }
    return false;
}

function logCurrentLeaf(leaf) {
    console.log("Leaf: ", leaf.state, "\nDepth: ", leaf.depth, "Cost: ", leaf.cost);
}

// Reverse Solution Path
function reverseSolutionPath(solutionPath) {
    let reversedPath = [];
    let current = solutionPath;

    while (current != null) {
        reversedPath.push(current.state);
        current = current.parent;
    }

    return reversedPath.reverse();
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
