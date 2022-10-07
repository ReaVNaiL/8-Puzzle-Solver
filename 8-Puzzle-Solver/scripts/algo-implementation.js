/* 
Notes for A* algorithm:
1- The A* algorithm is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency.

2- F = G + H
   Where:   
        F = Total cost of the node 
        G = Cost of the node from the start node to the current node
        H = Heuristic cost of the node to the goal node (estimated cost) or (Manhattan distance)

3- It needs a heuristic function which could be the Manhattan distance or the Euclidean distance.
        The Manhattan distance is the sum of the absolute differences of their Cartesian coordinates.
        Example: Manhattan distance between (x1, y1) and (x2, y2) = |x1 - x2| + |y1 - y2|

4- To traverse the graph, we need to use a priority queue (min-heap) to get the node with the lowest F value.

5- The algorithm is as follows:
    1- Create an open list and a closed list.
    2- Add the start node to the open list.
    3- Loop until you find the end:
        a- Get the current node.
        b- Look for the neighbors of the current node.
        c- For each neighbor, calculate the G, H, and F values.
        d- If it is not in the open list, add it to the open list. Otherwise, check if it is better to update the G and F values.
        e- If it is in the closed list, check if it is better to update the G and F values.
        f- Mark the current node as closed and remove it from the open list.
    4- Save the path.
    5- Return the path.
*/  

// Sample initial state:
//    5 4 1
//    0 2 8
//    3 6 7
// Sample goal state:
//    1 2 3
//    4 5 6
//    7 8 0

// The grid is represented as a 1D array
grid = [5, 4, 1, 0, 2, 8, 3, 6, 7];

// Rules:
// 1- The grid is represented as a 1D array
// 2- You can move the empty tile (0) to any adjacent tile
// 3- The adjacent tiles are the tiles that are horizontally or vertically adjacent to the empty tile
// 4- The empty tile can't be moved diagonally

function heuristic(node) {
    // Manhattan distance
    let h = 0;
    for (let i = 0; i < node.length; i++) {
        if (node[i] != 0) {
            h += Math.abs(Math.floor(i / 3) - Math.floor((node[i] - 1) / 3)) + Math.abs((i % 3) - ((node[i] - 1) % 3));
        }
    }
    return h;
}

