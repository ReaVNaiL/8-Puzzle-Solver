# 8-Puzzle-Solver
Using A* Algorithm to find the shortest solution to the 8 Puzzle.

<p align="left">
  <a href="https://www.8puzzleai.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Live_Demo-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  </a>
</p>

![ezgif com-gif-maker(2)](https://user-images.githubusercontent.com/59776018/196309049-25dda85b-7f42-41bf-aab3-0782cc0f3a78.gif)

---
## Problem Statement
-- Given a 3x3 board with 8 tiles (1 to 8) and one empty space. The objective is to place the numbers on tiles to match final configuration using the empty space. We can slide four adjacent (left, right, above and below) tiles into the empty space.

## Problem Mapping
The problem can be mapped into a search problem as follows:
* State space: All possible configurations of the given board
* Initial state: The given board with one tile missing
* Goal state: The final configuration of the board
* Successor function: All possible moves that can be made from a given state
* Path cost: Number of moves so far to reach the current state

## Algorithm
For this problem, we will use A* algorithm to find the shortest path from the initial state to the goal state. There's better algorithm like IDA* but it's not implemented in this project. 
The algorithm is as follows:
* Create a decision tree with the initial state as the root node
* Expand the node with the lowest f(n) value
* Repeat until the goal state is reached or the tree is exhausted

## Heuristic Function
The heuristic function is used to calculate the cost of a given state. The cost is calculated by finding the distance of each tile from its goal position. The distance is calculated based on
their row and column position, only taking into account the number of moves required to reach the goal position. 

# How to run
* Clone the repository
* Open index.html in your browser and the app will run.

>> Notes: 
>> * The app is not optimized for mobile devices yet. But it will work on mobile devices.
>> * If a solution is not found, the app will show a message saying "No solution found". However, the app will still run in the background, if it's taking too long to find a solution, I suggest you refresh the page.
>> * If needed a custom board can be created by changing the initial state in the code, or using the drawGrid() function in the console, which takes an Int Array as input.

## Screenshots
![Screen Shot 2022-10-16 at 18 08 45](https://user-images.githubusercontent.com/59776018/196060926-3dc260e4-31d8-47ba-b25a-7c6021982a4f.png)
![heuristic_A_Screen Shot 2022-10-14 at 20 51 42](https://user-images.githubusercontent.com/59776018/196060929-13b658f8-57f7-4ed5-b0bb-54676a06028a.png)
![heuristic_C_Screen Shot 2022-10-16 at 17 57 39](https://user-images.githubusercontent.com/59776018/196060932-ffa954e4-7388-4e4b-8967-7c4bc43f4012.png)

