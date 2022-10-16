/* ------------------ Html Tiles Functions ------------------ */
function getAdjacentElementsHtml(gridArray) {
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

function isAdjacent(tileId) {
    gridArray = getCurrentGrid();
    var adjacentElements = getAdjacentElementsHtml(gridArray);

    if (adjacentElements.includes(tileId)) {
        return true;
    }

    return false;
}

function shiftTile() {
    var tileId = this.id;
    var adjacent = isAdjacent(tileId);

    if (adjacent) {
        var gridArray = getCurrentGrid();
        // console.log(gridArray);

        var emptyTileIndex = gridArray.indexOf('0');
        var tileIndex = gridArray.indexOf(`${tileId}`);

        // console.log(`Empty Tile Index: ${emptyTileIndex}`);
        // console.log(`Tile Index: ${tileIndex}`);

        gridArray[emptyTileIndex] = gridArray[tileIndex];
        gridArray[tileIndex] = '0';

        // console.log(gridArray);

        drawGrid(gridArray);

        // Update move count
        manual_moves++;

        if (isSolved()) {
            updateStatsBox([`Total Moves: ${manual_moves}`]);
            puzzleCompleted();
            disableEvents();
        }

        return console.log(`Tile ${tileId} shifted`);
    }

    return console.log(`Could not shift tile ${tileId}`);
}

// add event listeners to all tiles on click
function addTileEventListeners() {
    var tiles = document.getElementsByClassName('grid-item');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', shiftTile, true);
    }
}

// disable input events on all tiles on click
function disableEvents() {
    var tiles = document.getElementsByClassName('grid-item');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener('click', shiftTile, true);
    }
}
