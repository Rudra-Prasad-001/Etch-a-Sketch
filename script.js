const makeGrid = document.querySelector('#makeGrid');
const resetGrid = document.querySelector('#resetGrid');
const container = document.querySelector("#container");
const color = [
    'red', 'green', 'blue', 'black', 'yellow', 'purple', 'aqua', 'grey', 'orange', 'pink',
    'lime', 'cyan', 'magenta', 'brown', 'maroon', 'navy', 'olive', 'teal', 'coral', 'gold',
    'salmon', 'khaki', 'indigo', 'violet', 'chartreuse', 'crimson', 'turquoise', 'orchid', 'plum', 'sienna'
];

function calculateCellSize(gridSize) {
    return (container.clientWidth - 2 * gridSize) / gridSize;
}

function showDefaultGrid() {
    const gridSize = 16;
    const cellSize = calculateCellSize(gridSize);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let div = document.createElement("div");
            container.appendChild(div);
            div.classList.add("uncolored");
            div.style.width = `${cellSize}px`;
            div.style.height = `${cellSize}px`;
        }
    }
}

function makeNewGrid() {
    let gridSize = prompt("Enter Grid Size 1-64 !");
    gridSize = Math.floor(Number(gridSize));

    if (isNaN(gridSize) || gridSize > 64 || gridSize < 1) {
        alert('Please enter a valid grid size between 1 and 64!');
        return;
    } else {
        container.innerHTML = "";
        const cellSize = calculateCellSize(gridSize);

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let div = document.createElement("div");
                container.appendChild(div);
                div.classList.add("uncolored");
                div.style.width = `${cellSize}px`;
                div.style.height = `${cellSize}px`;
            }
        }
    }
}

function resetGridToDefault() {
    container.innerHTML = "";
    showDefaultGrid();
}

function addColor(e) {
    let target = e.target;
    if (target.classList.contains("uncolored")) {
        target.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
    }
}

showDefaultGrid();

container.addEventListener("mouseover", addColor);
makeGrid.addEventListener("click", makeNewGrid);
resetGrid.addEventListener("click", resetGridToDefault);

// Support for touch devices
container.addEventListener("touchstart", function(e) {
    addColor(e);
    e.preventDefault();  // Prevent default behavior to avoid any unintended scrolling or zooming
});

container.addEventListener("touchmove", function(e) {
    let touch = e.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.classList.contains('uncolored')) {
        target.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
    }
    e.preventDefault();  // Prevent default behavior to avoid any unintended scrolling or zooming
});

// Recalculate grid size on window resize
window.addEventListener('resize', function() {
    let gridSize = Math.floor(Math.sqrt(container.children.length));
    const cellSize = calculateCellSize(gridSize);

    Array.from(container.children).forEach(div => {
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
    });
});

