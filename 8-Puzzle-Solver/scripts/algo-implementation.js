/* 
Notes for A* algorithm:
1- The A* algorithm is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.

2- F = G + H
   Where:   
        F = Total cost of the node 
        G = The depth of the tree from the start node to the current node
        H = Heuristic cost of the node to the goal node (estimated cost) or (Manhattan distance), which is the sum of the distances of the tiles from their goal positions. 
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
// The grid is represented as a 1D array
grid = [5, 4, 1, 0, 2, 8, 3, 6, 7];

// Rules:
// 1- The grid is represented as a 1D array
// 2- You can move the empty tile (0) to any adjacent tile
// 3- The adjacent tiles are the tiles that are horizontally or vertically adjacent to the empty tile
// 4- The empty tile can't be moved diagonally

function distanceFromGoal(currTileIndex, goalIndex) {
    // The distance between the tile and its goal position
    // The goal position is the index of the tile in the goal state
    // The goal state is [1, 2, 3, 4, 5, 6, 7, 8, 0]    
    console.log("tile: " + currTileIndex + " goal: " + goalIndex);
    return Math.abs(goalIndex - currTileIndex);
}

function heuristicCost(state) {
    // The heuristic cost of the state
    // The heuristic cost is the sum of the distances of the tiles from their goal positions
    // The goal state is [1, 2, 3, 4, 5, 6, 7, 8, 0]
    let goalGrid = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let cost = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] != 0) {
            // The distance between the tile and its goal position 
            let tileCost = distanceFromGoal(i, goalGrid.indexOf(state[i]));
            console.log("\tDistance from goal of tile " + state[i] + " is " + tileCost);
            cost += tileCost;
        }
    }
    return cost;
}

// Pass the initial state to the heuristicCost function
console.log(heuristicCost(grid));

