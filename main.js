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

function createTable(generationData) {
    let tableData = '';
    
    tableData += setGenerationHeader(generationData);

    for (let y = 0; y < generationData.length; y++) {
        let cells = '';

        for (let x = 0; x < generationData[y].length; x++) {
            cells += createTableData(y, x, generationData);
        }

        tableData += createTableRow(cells);
    }

    return tableData;
}

function setGenerationHeader(generationData) {
    let header = '<th colspan="' + generationData[0].length + '">';

    header += 'Generation: ' + (generation + 1);

    return header + '</th>';
}

function createTableData(y, x, generationData) {
    return '<td>' + generationData[y][x] + '</td>';
}

function createTableRow(cells) {
    return '<tr>' + cells + '</tr>';
}

/*
 * Generational logic
 */

function getNeighbors(y, x) {
    let neighbors = [];

    if (x - 1 >= 0 && lastGeneration[y][x - 1] != 0) {
        neighbors.push(lastGeneration[y][x - 1]);
    }

    if (x - 1 >= 0 && y - 1 >= 0 && lastGeneration[y - 1][x - 1] != 0) {
        neighbors.push(lastGeneration[y - 1][x - 1]);
    }

    if (y - 1 >= 0 && lastGeneration[y - 1][x] != 0) {
        neighbors.push(lastGeneration[y - 1][x]);
    }

    if (y - 1 >= 0 && x + 1 <= (lastGeneration[y - 1].length - 1) && lastGeneration[y - 1][x + 1] != 0) {
        neighbors.push(lastGeneration[y - 1][x + 1]);
    }

    if (x + 1 <= (lastGeneration[y].length - 1) && lastGeneration[y][x + 1] != 0) {
        neighbors.push(lastGeneration[y][x + 1]);
    }

    if (y + 1 <= (lastGeneration.length - 1) && x + 1 <= (lastGeneration[y + 1].length - 1) && lastGeneration[y + 1][x + 1] != 0) {
        neighbors.push(lastGeneration[y + 1][x + 1]);
    }

    if (y + 1 <= (lastGeneration.length - 1) && lastGeneration[y + 1][x] != 0) {
        neighbors.push(lastGeneration[y + 1][x]);
    }

    if (y + 1 <= (lastGeneration.length - 1) && x - 1 >= 0 && lastGeneration[y + 1][x - 1] != 0) {
        neighbors.push(lastGeneration[y + 1][x - 1]);
    }

    return neighbors;
}

function getStatus(y, x) {
    let cell = lastGeneration[y][x];

    let neighbors = getNeighbors(y, x);

    let adults = 0;

    neighbors.forEach(function(neighbor) {
        if (neighbor == 2) adults++;
    });

    if (cell == 0 && adults == 2) return 'aged';
    if (cell == 1 && (neighbors.length > 1 && neighbors.length < 5)) return 'aged';
    if (cell == 2 && (neighbors.length == 1 || neighbors.length == 2)) return 'aged';
    
    return 'empty';
}

/*
 * Trigger generational cycle 
 */

function nextGeneration() {
    let newGeneration = [];

    if (generation == 0) {
        newGeneration = dataset;
        lastGeneration = dataset;
    }

    if (generation > 0) {
        for (let y = 0; y < lastGeneration.length; y++) {
            newGeneration[y] = [];
    
            for (let x = 0; x < lastGeneration[y].length; x++) {
                newGeneration[y][x] = (getStatus(y, x) == 'aged') ? lastGeneration[y][x] + 1 : 0;
            }
        }

        lastGeneration = newGeneration;
    }

    document.getElementById('tb').innerHTML = createTable(newGeneration);

    generation++;
}