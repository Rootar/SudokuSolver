var fs = require('fs')
var logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})


// var arr = new Array(9);

// for(i = 0; i < 9; i++){
// arr[i] = new Array(9);
// }
// for(x = 0; x < 9; x++){
// for(y = 0; y < 9; y++){
// val = document.getElementsByClassName("sudoku")[0].rows[y].cells[x].lastChild.defaultValue
// arr[y][x] = val;
// }
// }
// copy(arr)

var unsolvedSudoku = [
    [
      "",
      "5",
      "9",
      "",
      "6",
      "8",
      "",
      "",
      "3"
    ],
    [
      "1",
      "6",
      "",
      "2",
      "4",
      "3",
      "",
      "",
      ""
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "2",
      "",
      "",
      "",
      "",
      "5",
      "3",
      "",
      "6"
    ],
    [
      "",
      "",
      "",
      "",
      "2",
      "",
      "",
      "",
      ""
    ],
    [
      "9",
      "",
      "8",
      "4",
      "",
      "",
      "",
      "",
      "7"
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    [
      "",
      "",
      "",
      "5",
      "8",
      "4",
      "",
      "3",
      "2"
    ],
    [
      "6",
      "",
      "",
      "9",
      "7",
      "",
      "8",
      "5",
      ""
    ]
  ]

// print9x9Array(unsolvedSudoku)

for(powtorzenia = 0; powtorzenia < 20; powtorzenia++){
    var rows = new Array(9); //////////////// ROWS
    populate9ArrayTo9x9(rows);
    for(y = 0; y < 9; y++){
        for(x = 0; x < 9; x++){
            rows[y][x] = unsolvedSudoku[y][x];
        }
    }

    var cols = new Array(9); /////////////// COLS
    populate9ArrayTo9x9(cols)
    for(y = 0; y < 9; y++){
        for(x = 0; x < 9; x++){
            cols[y][x] = unsolvedSudoku[x][y];
        }
    }

    var squares = new Array(9); /////////////// SQUARES
    for(i = 0; i < 9; i++){
        squares[i] = new Array()
    }
    for(y = 0; y < 9; y++){
        for(x = 0; x < 9; x++){
            if(x < 3 && y < 3){
                squares[0].push(unsolvedSudoku[y][x])
            }else if(x < 6 && y < 3){
                squares[1].push(unsolvedSudoku[y][x])
            }else if(x < 9 && y < 3){
                squares[2].push(unsolvedSudoku[y][x])
            }else if(x < 3 && y < 6){
                squares[3].push(unsolvedSudoku[y][x])
            }else if(x < 6 && y < 6){
                squares[4].push(unsolvedSudoku[y][x])
            }else if(x < 9 && y < 6){
                squares[5].push(unsolvedSudoku[y][x])
            }else if(x < 3 && y < 9){
                squares[6].push(unsolvedSudoku[y][x])
            }else if(x < 6 && y < 9){
                squares[7].push(unsolvedSudoku[y][x])
            }else if(x < 9 && y < 9){
                squares[8].push(unsolvedSudoku[y][x])
            }
        }
    }

    ///////////////////////////////////////// stworzenie tablic z możliwymi miejscami
    var numArr = new Array(9);
    for(i = 0; i < 9; i++){
        numArr[i] = new Array(9);
        for(j = 0; j < 9; j++){
            numArr[i][j] = new Array(9);
        }
    }

    ///////////////////////////////////////// ustawienie tablic z możliwymi miejscami
    for(i = 0; i < 9; i++){
        for(y = 0; y < 9; y++){
            for(x = 0; x < 9; x++){
                var val = i + 1;
                if(!canBeHere(val.toString(), y, x) || unsolvedSudoku[y][x] != ""){
                    numArr[i][y][x] = "x"
                }else{
                    numArr[i][y][x] = ""
                }
            }
        }
    }

    for(vals = 0; vals < 9; vals++){
        for(yy = 0; yy < 9; yy++){
            for(xx = 0; xx < 9; xx++){
                var value = vals + 1;
                var xxx = xx + 1;
                var yyy = yy + 1;
                if(IsOneSpaceInRow(numArr[vals], yy) && numArr[vals][yy][xx] == ""){
                    unsolvedSudoku[yy][xx] = value.toString();
                    console.log("Wpisano " + value.toString() + " w wiersz " + yyy.toString() + ", kolumnę " + xxx.toString())
                    logger.write('document.getElementById("p' + (yy*9+xx+1) + '").value = ' + value.toString() + '\n')
                }else
                if(IsOneSpaceInCol(numArr[vals], xx) && numArr[vals][yy][xx] == ""){
                    unsolvedSudoku[yy][xx] = value.toString();
                    console.log("Wpisano " + value.toString() + " w wiersz " + yyy.toString() + ", kolumnę " + xxx.toString())
                    logger.write('document.getElementById("p' + (yy*9+xx+1) + '").value = ' + value.toString() + '\n')
                }else
                if(IsOneSpaceInSquare(numArr[vals], yy, xx) && numArr[vals][yy][xx] == ""){
                    unsolvedSudoku[yy][xx] = value.toString();
                    console.log("Wpisano " + value.toString() + " w wiersz " + yyy.toString() + ", kolumnę " + xxx.toString())
                    logger.write('document.getElementById("p' + (yy*9+xx+1) + '").value = ' + value.toString() + '\n')
                }
            }
        }
    }
    // console.log("==============================")
    // debugger;
}

logger.end()
// debugger;
// console.log("canbe " + canBeHere("9", 1, 1))
// console.log("**************")
// console.log(canBeInSquare("1", 2, 2)) //false
// console.log(canBeInSquare("2", 2, 2)) //true
// console.log(canBeInSquare("4", 5, 5)) //false
// console.log(canBeInSquare("3", 5, 5)) //false
// console.log(canBeInSquare("1", 5, 5)) //true
// console.log(canBeInSquare("8", 8, 4)) //false
// console.log(canBeInSquare("7", 8, 4)) //true

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function populate9ArrayTo9x9(array){
    for(i = 0; i < 9; i++){
        array[i] = new Array(9)
    }
}

function canBeHere(val, row, col){
    // console.log(canBeInRow(val, row))
    // console.log(canBeInCol(val, col))
    // console.log(canBeInSquare(val, row, col))

    return canBeInRow(val, row) && canBeInCol(val, col) && canBeInSquare(val, row, col)
}

function canBeInRow(val, row){
    return !rows[row].includes(val)
}

function canBeInCol(val, col){
    return !cols[col].includes(val)
}

function canBeInSquare(val, row, col){
    var x = col;
    var y = row;

    if(x < 3 && y < 3){
        return !squares[0].includes(val)
    }else if(x < 6 && y < 3){
        return !squares[1].includes(val)
    }else if(x < 9 && y < 3){
        return !squares[2].includes(val)
    }else if(x < 3 && y < 6){
        return !squares[3].includes(val)
    }else if(x < 6 && y < 6){
        return !squares[4].includes(val)
    }else if(x < 9 && y < 6){
        return !squares[5].includes(val)
    }else if(x < 3 && y < 9){
        return !squares[6].includes(val)
    }else if(x < 6 && y < 9){
        return !squares[7].includes(val)
    }else if(x < 9 && y < 9){
        return !squares[8].includes(val)
    }
}

function IsOneSpaceInRow(array, row){
    var quantity = 0;
    // var column = 0;
    for(i = 0; i < 9; i++){
        if(array[row][i] == ""){
            quantity++;
            // column = i;
        }
    }
    
    if(quantity == 1){
        return true;
    }
    return false;
}

function IsOneSpaceInCol(array, col){
    var quantity = 0;
    // var roww = 0;
    for(i = 0; i < 9; i++){
        if(array[i][col] == ""){
            quantity++;
            // roww = i;
        }
    }
    
    if(quantity == 1){
        return true;
    }
    return false;
}

function IsOneSpaceInSquare(array, row, col){
    var Ssquares = new Array(9); /////////////// SQUARES
    // var roww = 0;
    // var column = 0;
    for(i = 0; i < 9; i++){
        Ssquares[i] = new Array()
    }
    for(y = 0; y < 9; y++){
        for(x = 0; x < 9; x++){
            if(x < 3 && y < 3){
                Ssquares[0].push(array[y][x])
            }else if(x < 6 && y < 3){
                Ssquares[1].push(array[y][x])
            }else if(x < 9 && y < 3){
                Ssquares[2].push(array[y][x])
            }else if(x < 3 && y < 6){
                Ssquares[3].push(array[y][x])
            }else if(x < 6 && y < 6){
                Ssquares[4].push(array[y][x])
            }else if(x < 9 && y < 6){
                Ssquares[5].push(array[y][x])
            }else if(x < 3 && y < 9){
                Ssquares[6].push(array[y][x])
            }else if(x < 6 && y < 9){
                Ssquares[7].push(array[y][x])
            }else if(x < 9 && y < 9){
                Ssquares[8].push(array[y][x])
            }
        }
    }

    var x = col;
    var y = row;
    var square;

    if(x < 3 && y < 3){
        square = 0
    }else if(x < 6 && y < 3){
        square = 1
    }else if(x < 9 && y < 3){
        square = 2
    }else if(x < 3 && y < 6){
        square = 3
    }else if(x < 6 && y < 6){
        square = 4
    }else if(x < 9 && y < 6){
        square = 5
    }else if(x < 3 && y < 9){
        square = 6
    }else if(x < 6 && y < 9){
        square = 7
    }else if(x < 9 && y < 9){
        square = 8
    }

    var quantity = 0;
    for(i = 0; i < 9; i++){
        if(Ssquares[square][i] == ""){
            quantity++;
        }
    }
    
    if(quantity == 1){
        return true;
    }
    return false;
}

// function print9x9Array(array){
//     for(y = 0; y < 9; y++){
//         var s = "";
//         for(x = 0; x < 9; x++){
//             var a = array[y][x]
//             s.concat(a)
//             // process.stdout.write(unsolvedSudoku[y][x].toString());
//         }
//         console.log(s)
//     }
// }