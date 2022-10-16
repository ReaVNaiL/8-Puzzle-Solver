/* ------------------ Leaf Nodes Class ------------------ */
class Leaf {
    constructor(state, depth, parent) {
        this.state = state;
        this.depth = depth;
        this.cost = heuristicCost(this.state);
        this.total_cost = this.depth + this.cost;
        this.parent = parent;
    }
}

/* ------------------ Decision Tree For A* ------------------ */
class DecisionTree {
    constructor(state) {
        this.root = new Leaf(state, 0, null);
        this.depth = 0;
        this.explored = [];
        this.toExplore = [this.root];
        this.maxCost = 0;
        this.createdLeaves = 0;
        this.moves = 0;
    }

    // Destructor
    destroy() {
        this.root = null;
        this.depth = null;
        this.explored = null;
        this.toExplore = null;
        this.maxCost = null;
        this.exploredStates = null;
        this.moves = null;
    }

    // Find the leaf with the lowest cost and remove it from the toExplore array
    async findBestLeaf() {
        let currentLeaf = this.toExplore[0];
        let leafIndex = 0;

        this.toExplore.forEach((leaf, index) => {
            if (leaf.total_cost < currentLeaf.total_cost) {
                currentLeaf = leaf;
                leafIndex = index;
            }
        });

        this.toExplore.splice(leafIndex, 1);
        this.explored.push(currentLeaf);

        return currentLeaf;
    }

    // Get the adjacent elements of the empty tile
    getAdjacentElements(gridArray) {
        var adjacentElements = [];
        var emptyTileIndex = gridArray.indexOf(0);

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

    // Generate the states of the next depth
    generateNextDepthStates(leaf) {
        const possibleStates = [];
        const state = leaf.state;

        const emptyTileIndex = state.indexOf(0);
        const adjacentElements = this.getAdjacentElements(state);

        for (let i = 0; i < adjacentElements.length; i++) {
            const adjacentElementIndex = state.indexOf(adjacentElements[i]);
            const newState = state.slice();

            newState[emptyTileIndex] = adjacentElements[i];
            newState[adjacentElementIndex] = 0;

            possibleStates.push(new Leaf(newState, leaf.depth + 1, leaf));
            this.createdLeaves++;
        }

        return possibleStates;
    }

    // A* Algorithm
    async aStarSearch(animate) {
        let timeRunning = new Date();
        let timeStart = new Date();

        while (this.toExplore.length > 0) {
            let currentLeaf = await this.findBestLeaf();

            /*==== UI Visualization ===*/
            // every 50 ms of time passed, update the UI 
            if (animate && new Date() - timeRunning > 25) {
                // Update the UI
                drawGrid(currentLeaf.state);
                await displayAdjacentElements(1);
                timeRunning = new Date();
            }

            // Check if the current leaf is the goal state
            if (isSolved(currentLeaf.state)) {
                // Reverse the solution found
                let solution = reverseSolutionPath(currentLeaf);
                drawGrid(currentLeaf.state);

                /*==== UI Stats Box Visualization ===*/
                let stats = [
                    `Time: ${new Date() - timeStart} ms`,
                    `States Explored: ${this.explored.length}`,
                    `Leaves Created: ${this.createdLeaves}`,
                    `Optimal Moves: ${this.moves}`,
                    `Maximum Cost: ${this.maxCost}`,
                ];
                updateStatsBox(stats);
                return solution;
            }

            let leaves = this.generateNextDepthStates(currentLeaf);

            // Add the new leaves to the toExplore array
            for (let leaf of leaves) {
                let isExplored = false;
                this.explored.forEach((exploredLeaf) => {
                    if (leaf.state.toString() === exploredLeaf.state.toString()) {
                        isExplored = true;
                    }
                });
                if (isExplored) continue;

                let notExplored = true;
                this.toExplore.forEach((toExploreLeaf) => {
                    if (leaf.state.toString() === toExploreLeaf.state.toString()) {
                        notExplored = false;
                    }
                });
                if (notExplored) this.toExplore.push(leaf);

                logCurrentLeaf(leaf);

                if (leaf.depth > this.moves) this.moves = leaf.depth;
                if (leaf.total_cost > this.maxCost) this.maxCost = leaf.total_cost;
            }
        }
    }

    // Print the explored states based on the depth
    printTree() {
        let depth = 0;

        // Sort the explored states based on the depth
        this.explored.sort((a, b) => {
            return a.depth - b.depth;
        });

        console.log(`---------------------- Root ----------------------`);
        for (let leaf of this.explored) {
            // Draw a line between the states of the different depth
            if (leaf.depth > depth) {
                console.log(`--------------------- Level ${depth + 1} ---------------------`);
                depth++;
            }
            console.log(leaf.state);
        }
    }
}
