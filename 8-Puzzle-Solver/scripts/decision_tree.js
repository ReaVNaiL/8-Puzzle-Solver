class Leaf {
    constructor(state, depth) {
        this.state = state;
        this.depth = depth;
        this.cost = heuristicCost(state);
        this.total = this.depth + this.cost;
        this.leaves = [];
    }
}

class DecisionTree {
    constructor(state) {
        this.root = new Leaf(state, 0);
        this.depth = 0;
    }

    addLeaf(state, depth) {
        const leaf = new Leaf(state, depth);

        const parent = this.findParent(leaf);

        if (parent != null) {
            parent.leaves.push(leaf);
        }
    }

    findParent(leaf) {
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (node.leaves.length > 0) {
                for (let i = 0; i < node.leaves.length; i++) {
                    if (node.leaves[i].total > leaf.total) {
                        return node.leaves[i];
                    }
                }
            } else {
                return node;
            }
        }
    }
    
    findBestLeaf() {
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (node.leaves.length > 0) {
                for (let i = 0; i < node.leaves.length; i++) {
                    queue.push(node.leaves[i]);
                }
            } else {
                return node;
            }
        }
    }

    expandLeaf(leaf) {
        const possibleStates = this.getPossibleStates(leaf.state);

        for (let i = 0; i < possibleStates.length; i++) {
            this.addLeaf(possibleStates[i], leaf.depth + 1);
        }
    }

    getPossibleStates(state) {
        const possibleStates = [];

        const emptyTileIndex = state.indexOf('0');
        const adjacentElements = getAdjacentElements(state);

        for (let i = 0; i < adjacentElements.length; i++) {
            const tileIndex = state.indexOf(`${adjacentElements[i]}`);

            const newState = [...state];

            newState[emptyTileIndex] = newState[tileIndex];
            newState[tileIndex] = '0';

            possibleStates.push(newState);
        }

        return possibleStates;
    }

    getNextState() {
        const leaf = this.findBestLeaf();

        this.expandLeaf(leaf);

        return leaf.state;
    }

    getDepth() {
        return this.depth;
    }
}

function getAdjacentElements(gridArray) {
    var adjacentElements = [];

    var emptyTileIndex = gridArray.indexOf('0');

    // Top element
    if (emptyTileIndex - 3 >= 0) adjacentElements.push(gridArray[emptyTileIndex - 3]);
    
    // Bottom element
    if (emptyTileIndex + 3 <= 8) adjacentElements.push(gridArray[emptyTileIndex + 3]);
    
    // Left element
    if (emptyTileIndex - 1 >= 0 && emptyTileIndex % 3 != 0) adjacentElements.push(gridArray[emptyTileIndex - 1]);
    
    // Right element
    if (emptyTileIndex + 1 <= 8 && emptyTileIndex % 3 != 2) adjacentElements.push(gridArray[emptyTileIndex + 1]);

    return adjacentElements;
}

function isSolutionPossible(gridArray) {
    var inversions = 0;

    for (let i = 0; i < gridArray.length; i++) {
        for (let j = i + 1; j < gridArray.length; j++) {
            if (gridArray[i] != '0' && gridArray[j] != '0' && gridArray[i] > gridArray[j]) {
                inversions++;
            }
        }
    }

    if (inversions % 2 == 0) {
        return true;
    }

    return false;
}

function aStarSearch(gridArray) {
    const tree = new DecisionTree(gridArray);

    let openList = [gridArray];
    let closedList = [];

    while (openList.length > 0) {
        const state = tree.getNextState();

        if (isSolved(state)) {
            return state;
        }

        openList = openList.filter(item => item !== state);
        closedList.push(state);

        const possibleStates = tree.getPossibleStates(state);

        for (let i = 0; i < possibleStates.length; i++) {
            if (!closedList.includes(possibleStates[i])) {
                openList.push(possibleStates[i]);
            }
        }
    }
}

goalState = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

// (function main() {
//     let initialGrid = getCurrentGrid();
//     heuristicCost(initialGrid);
//     aStarSearch();
// })();
