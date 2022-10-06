function shiftTile(tileId) {
    var tile = document.getElementById(tileId);
    var emptyTile = document.getElementById('0');

    return {
        tile: tile,
        emptyTile: emptyTile,
    };
}

function getAdjacentElements() {
    var gridArray = getCurrentGrid();

    var emptyTileIndex = gridArray.indexOf('0');
    console.log(emptyTileIndex);

    var adjacentElements = {};

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

function displayAdjacentElements() {
    var adjacentElements = getAdjacentElements();

    // add ajacent classes to the tiles
    for (var key in adjacentElements) {
        if (adjacentElements.hasOwnProperty(key)) {
            var tile = document.getElementById(adjacentElements[key]);
            tile.classList.add("adjacent");
        }
    }
    // wait 1 second and remove the classes
    setTimeout(function () {
        for (var key in adjacentElements) {
            if (adjacentElements.hasOwnProperty(key)) {
                var tile = document.getElementById(adjacentElements[key]);
                tile.classList.remove("adjacent");
            }
        }
    }, 500);
}
