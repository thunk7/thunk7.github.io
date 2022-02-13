'use strict';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
            console.log('Service worker registered');
            console.log(registration);
        })
        .catch((err) => {
            console.log('Sercvice worker registration failed');
            console.error(err);
        });
}

let title = prompt('Hi There! How do you want your table named?');
if (title != null) {
    document.getElementById('title').innerHTML = title;
}

var tableContent = document.getElementById('uomTrack').innerHTML;
localStorage.setItem('tableContent', tableContent);

if (localStorage.getItem('tableContent') !== null) {
    var tableContent = localStorage.getItem('tableContent');
    document.getElementById('uomTrack').innerHTML = tableContent;
}

const table = document.getElementById('uomTrack');

const reloadButton = document.querySelector('.reload');

function reload() {
    reload = location.reload();
}
reloadButton.addEventListener('click', reload, false);

function addRow() {
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
}

function cloneRow(n) {
    let tr = n.parentNode.parentNode.cloneNode(true);
    table.appendChild(tr);
}

function deleteRow(n) {
    let tr = n.parentNode.parentNode.rowIndex;
    table.deleteRow(tr);
}

function sortTable(n) {
    var rows, sorting, i, x, y, doSort, dir, sortcount = 0;
    sorting = true;
    dir = 'asc';
    while (sorting) {
        sorting = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            doSort = false;
            x = rows[i].getElementsByTagName('td')[n];
            y = rows[i + 1].getElementsByTagName('td')[n];
            if (dir == 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    doSort = true;
                    break;
                }
            } else if (dir == 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    doSort = true;
                    break;
                }
            }
        }
        if (doSort) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            sorting = true;
            sortcount++;
        } else {
            if (sortcount == 0 && dir == 'asc') {
                dir = 'desc';
                sorting = true;
            }
        }
    }
}

function getMinMaxAverage() {
    var minVal, minIndex, maxVal, maxIndex, sumVal = 0;
    for (var i = 1; i < table.rows.length; i++) {
        if (i === 1) {
            minVal = table.rows[i].cells[3].innerHTML;
            minIndex = table.rows[i].rowIndex;
        } else if (minVal > table.rows[i].cells[3].innerHTML) {
            minVal = table.rows[i].cells[3].innerHTML;
            minIndex = table.rows[i].rowIndex;
        }
    }
    for (var i = 1; i < table.rows.length; i++) {
        if (i === 1) {
            maxVal = table.rows[i].cells[3].innerHTML;
            maxIndex = table.rows[i].rowIndex;
        } else if (maxVal < table.rows[i].cells[3].innerHTML) {
            maxVal = table.rows[i].cells[3].innerHTML;
            maxIndex = table.rows[i].rowIndex;
        }
    }
    for (var i = 1; i < table.rows.length; i++) {
        sumVal = sumVal + parseFloat(table.rows[i].cells[3].innerHTML);
    }
    let avg = sumVal / (table.rows.length - 1);
    document.getElementById("minV").innerHTML = 'Best Race Time: ' + minVal + ' - ';
    document.getElementById("maxV").innerHTML = 'Worst Race Time: ' + maxVal + ' - ';
    document.getElementById("avgV").innerHTML = 'Average Race Time: ' + parseFloat(avg).toFixed(2);
}
