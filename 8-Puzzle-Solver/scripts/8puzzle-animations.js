// Display Adjacent Elements
function displayAdjacentElements() {
    var adjacentElements = getAdjacentElements();

    // add ajacent classes to the tiles
    for (var key in adjacentElements) {
        if (adjacentElements.hasOwnProperty(key)) {
            var tile = document.getElementById(adjacentElements[key]);
            tile.classList.add("adjacent");
        }
    }
    // wait 650 ms and remove the classes
    setTimeout(function () {
        for (var key in adjacentElements) {
            if (adjacentElements.hasOwnProperty(key)) {
                var tile = document.getElementById(adjacentElements[key]);
                tile.classList.remove("adjacent");
            }
        }
    }, 650);
}