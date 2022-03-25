/*
 * Dataset
 */

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

/*
 * Build table
 */

function createTable() {
    let table = '';

    for (let i = 0; i < 10; i++) {
        let cells = '';

        for (let j = 0; j < 10; j++) {
            cells += createTableData(i, j);
        }

        table += createTableRow(cells);
    }

    return table;
}

function createTableData(y, x) {
    return '<td>' + dataset[y][x] + '</td>';
}

function createTableRow(cells) {
    return '<tr>' + cells + '</tr>';
}

function generate() {
    document.getElementById('tb').innerHTML = createTable();
}
