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
goalState = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

// (function main() {
//     let initialGrid = getCurrentGrid();
//     heuristicCost(initialGrid);
//     aStarSearch();
// })();
