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

    aStar() {
        let queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (isSolved(node.state)) {
                return node;
            } else {
                createLeaves(node.state, node.depth + 1);

                for (let i = 0; i < node.leaves.length; i++) {
                    queue.push(node.leaves[i]);
                }
            }
        }

        return null;
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

    printTree() {
        const queue = [this.root];

        let tree = {};
        let subtree = {};

        // Add the whole tree to a dictionary in this format
        tree[this.root.state] = subtree;

        while (queue.length > 0) {
            const node = queue.shift();

            if (node.leaves.length > 0) {
                for (let i = 0; i < node.leaves.length; i++) {
                    subtree[node.leaves[i].state] = node.leaves[i];
                    queue.push(node.leaves[i]);
                }
            }
        }

        console.log(tree);
    }
}

function createLeaves(state, depth) {
    let adjacentElements = getAdjacentElements(state);
    let leaves = [];

    console.log(adjacentElements);

    for (let i = 0; i < adjacentElements.length; i++) {
        let newState = generateState(state, adjacentElements[i]);
        let leaf = new Leaf(newState, depth)
        leaves.push();
        console.log("State", leaf.state, "Total Cost", leaf.total);
    }

    return leaves;
}


function generateState(state, tileId) {
    let newState = state.slice();

    let emptyTileIndex = newState.indexOf('0');
    let tileIndex = newState.indexOf(`${tileId}`);

    newState[emptyTileIndex] = newState[tileIndex];
    newState[tileIndex] = '0';

    return newState;
}

(function main() {
    
    // let initialGrid = getCurrentGrid();
    // heuristicCost(initialGrid);
    // let tree = new DecisionTree(initialGrid);
    // tree.aStar();
    // tree.printTree();
})();
