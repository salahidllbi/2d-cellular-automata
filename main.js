/*
 * Initialize cycle
 */

var generation = 0;

var dataset = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0,0],
    [0,0,0,1,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0],
    [0,2,1,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];

var lastGeneration = [];

/*
 * Build table
 */

function createTable(generation) {
    let table = '';

    for (let i = 0; i < generation.length; i++) {
        let cells = '';

        for (let j = 0; j < generation[i].length; j++) {
            cells += createTableData(i, j, generation);
        }

        table += createTableRow(cells);
    }

    return table;
}

function createTableData(y, x, generation) {
    return '<td>' + generation[y][x] + '</td>';
}

function createTableRow(cells) {
    return '<tr>' + cells + '</tr>';
}

/*
 * Trigger cycle 
 */

function generate() {
    document.getElementById('tb').innerHTML = createTable(dataset);

    generation++;

    lastGeneration = dataset;
}

/*
 * Generational logic
 */

function getNeighbors(i, j) {
    let neighbors = [];

    if (j - 1 >= 0 && lastGeneration[i][j - 1] != 0) {
        neighbors.push(lastGeneration[i][j - 1]);
    }

    if (j - 1 >= 0 && i - 1 >= 0 && lastGeneration[i - 1][j - 1] != 0) {
        neighbors.push(lastGeneration[i - 1][j - 1]);
    }

    if (i - 1 >= 0 && lastGeneration[i - 1][j] != 0) {
        neighbors.push(lastGeneration[i - 1][j]);
    }

    if (i - 1 >= 0 && j + 1 <= (lastGeneration[i - 1].length - 1) && lastGeneration[i - 1][j + 1] != 0) {
        neighbors.push(lastGeneration[i - 1][j + 1]);
    }

    if (j + 1 <= (lastGeneration[i].length - 1) && lastGeneration[i][j + 1] != 0) {
        neighbors.push(lastGeneration[i][j + 1]);
    }

    if (i + 1 <= (lastGeneration.length - 1) && j + 1 <= (lastGeneration[i + 1].length - 1) && lastGeneration[i + 1][j + 1] != 0) {
        neighbors.push(lastGeneration[i + 1][j + 1]);
    }

    if (i + 1 <= (lastGeneration.length - 1) && lastGeneration[i + 1][j] != 0) {
        neighbors.push(lastGeneration[i + 1][j]);
    }

    if (i + 1 <= (lastGeneration.length - 1) && j - 1 >= 0 && lastGeneration[i + 1][j - 1] != 0) {
        neighbors.push(lastGeneration[i + 1][j - 1]);
    }

    return neighbors;
}

function getStatus(i, j) {
    let cell = lastGeneration[i][j];

    let neighbors = getNeighbors(i, j);

    let adults = 0;

    neighbors.forEach(function(neighbor) {
        if (neighbor == 2) adults++;
    });

    if (cell == 0 && adults == 2) return 'aged';
    if (cell == 1 && (neighbors.length > 1 && neighbors.length < 5)) return 'aged';
    if (cell == 2 && (neighbors.length == 1 || neighbors.length == 2)) return 'aged';
    
    return 'empty';
}

function nextGeneration() {
    let newGeneration = [];

    for (let i = 0; i < lastGeneration.length; i++) {
        newGeneration[i] = [];

        for (let j = 0; j < lastGeneration[i].length; j++) {
            newGeneration[i][j] = (getStatus(i, j) == 'aged') ? lastGeneration[i][j] + 1 : 0;
        }
    }

    lastGeneration = newGeneration;

    document.getElementById('tb').innerHTML = createTable(newGeneration);
    generation++;
}