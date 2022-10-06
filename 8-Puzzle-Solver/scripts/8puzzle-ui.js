function getAdjacentElements() {
    var adjacentElements = {};
    var gridArray = getCurrentGrid();
    var emptyTileIndex = gridArray.indexOf('0');

    // Top element
    if (emptyTileIndex - 3 >= 0) {
        adjacentElements.top = gridArray[emptyTileIndex - 3];
    }
    // Bottom element
    if (emptyTileIndex + 3 <= 8) {
        adjacentElements.bottom = gridArray[emptyTileIndex + 3];
    }
    // Left element
    if (emptyTileIndex - 1 >= 0 && emptyTileIndex % 3 != 0) {
        adjacentElements.left = gridArray[emptyTileIndex - 1];
    }
    // Right element
    if (emptyTileIndex + 1 <= 8 && emptyTileIndex % 3 != 2) {
        adjacentElements.right = gridArray[emptyTileIndex + 1];
    }

    return adjacentElements;
}

function isAdjacent(tileId) {
    var adjacentElements = getAdjacentElements();

    for (var key in adjacentElements) {
        if (adjacentElements.hasOwnProperty(key)) {
            if (adjacentElements[key] == tileId) {
                return true;
            }
        }
    }
    
    return false;
}

function shiftTile(tileId) {
    var adjacent = isAdjacent(tileId);
    console.log(adjacent);

    if (isAdjacent(tileId)) {
        var grid = document.getElementById('grid');
        var tile = document.getElementById(tileId);
        var emptyTile = document.getElementById('0');

        grid.insertBefore(tile, emptyTile);
    }
}

