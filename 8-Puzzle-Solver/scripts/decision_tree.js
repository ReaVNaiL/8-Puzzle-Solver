class DecisionTree {
    constructor(state) {
        this.root = new Leaf(state, 0, null);
        this.depth = 0;
        this.explored = [];
        this.toExplore = [
            this.root
        ];
        this.maxCost = 0;
        this.exploredStates = 0;
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

    expandLeaf(leaf) {
        const possibleStates = this.getPossibleStates(leaf.state);

        for (let i = 0; i < possibleStates.length; i++) {
            this.addLeaf(possibleStates[i], leaf.depth + 1);
        }
    }

    findBestLeaf() {
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

    getPossibleNewStates(leaf) {
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
            this.exploredStates++;
        }

        return possibleStates;
    }

    getDepth() {
        return this.depth;
    }

    aStarSearch() {
        while (this.toExplore.length > 0) {
            let currentLeaf = this.findBestLeaf();
            
            // Check if the current leaf is the goal state
            if (isSolved(currentLeaf.state)) {
                // Reverse the solution found
                let solution = reverseSolutionPath(currentLeaf);
                drawGrid(currentLeaf.state);

                /*==== UI Stats Box Visualization ===*/
                let stats = [`States Explored: ${this.exploredStates}`, `Optimal Moves: ${this.moves}`, `Maximum Cost: ${this.maxCost}`];
                updateStatsBox(stats);
                return solution;
            }

            let leaves = this.getPossibleNewStates(currentLeaf);

            for (let leaf of leaves) {
                let isExplored = false;
                this.explored.forEach((exploredLeaf) => {
                    if (leaf.state.toString() === exploredLeaf.state.toString()) {
                        isExplored = true;
                    }
                });
    
                if (isExplored) continue;
    
                // logCurrentLeaf(leaf);
    
                let notExplored = true;
    
                this.toExplore.forEach((toExploreLeaf) => {
                    if (leaf.state.toString() === toExploreLeaf.state.toString()) {
                        notExplored = false;
                    }
                });
    
                if (notExplored) this.toExplore.push(leaf);

                if (leaf.depth > this.moves) this.moves = leaf.depth;
                if (leaf.total_cost > this.maxCost) this.maxCost = leaf.total_cost;
            }

        }
    }
}


goalState = ['1', '2', '3', '4', '5', '6', '7', '8', '0'];

