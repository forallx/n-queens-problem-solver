/** @author Евгений Кузнецов */

/** B представляет пустую клетку
  * @type {CellState}
  */
var B = false;

/** Q представляет пустую клетку
  * @type {CellState}
  */
var Q = true;

/** Пустая доска с размерностью n=4
  * @type {Board}
  */
var n4emptBrd = [B, B, B, B,
                 B, B, B, B,
                 B, B, B, B,
                 B, B, B, B];
/** Решение для доски с размерностью 4
  * @type {Board}
  */
var n4solBrd = [B, Q, B, B,
                B, B, B, Q,
                Q, B, B, B,
                B, B, Q, B];

/** Создает пустую доску n*n элементов
  * @param  {Natural} n Размерность доски
  * @return {Board}
  */
function createEmptyBoard(n){
  var b = [];
  for(var i=0;i<n*n;i++){ b.push(B); }
  return b;
};

// Тесты для функции createEmptyBoard
(function(){
  console.log("Тест1:", createEmptyBoard(4).length==16);
})();

/** Решает проблему n-ферзей
  * @param  {Board} b Доска
  * @return {Board | false} Если задача имеет решение - доску, иначе false
  */
// function solve(b){return false}; // заглушка
function solve(b){
   // Ищет решение для данной доски
   // @param {Board} b
   // @return {Board | false}
  function solveBrd(b){
    if(isSolved(b)){
      return b;
    }else{
      return solveChilds(nextBoards(b));
    }
  };

  // Ищет решения для списка потомков
  // @param {array.<Board>} lob
  // @return {Board | false}
  function solveChilds(lob){
    if(lob.length==0){
      return false; // базовый случай
    }else{
      // рекурсивный случай
      var first = lob[0];
      var rest  = lob.slice(1,lob.length);
      var tryBrd = solveBrd(first);
      if(tryBrd!=false){
        return tryBrd;
      }else{
        return solveChilds(rest);
      }
    }
  };

  return solveBrd(b);
};

(function(){
  console.log("Тест2:", solve(createEmptyBoard(1)).toString()==[Q].toString());
  console.log("Тест3:", solve(createEmptyBoard(2))==false);
  console.log("Тест4:", solve(createEmptyBoard(4)).toString()==n4solBrd.toString());
})();

/** Является ли данная доска решением?
  * @param  {Board} b
  * @return {Boolean}
  */
//function isSolved(b){ return false; } // Заглушка
function isSolved(b){
  return isValid(b) && getFiguresPos(0, b).length==getBoardSize(b);
}

(function(){
  console.log("Тест23:", isSolved(n4emptBrd)==false);
  console.log("Тест24:", isSolved(n4solBrd)==true);
})();

/** Создает массив потомков данной доски
  * Все несостоятельные доски вырезаются
  * @param  {Board} b
  * @return {array.<Board>}
  */
// function nextBoards(b){ return []; } // Заглушка
function nextBoards(b){
  return keepOnlyValid(fillBlanks(b));
}

// Тесты для nextBoards
(function(){
  console.log("Тест5:", nextBoards(createEmptyBoard(1)).toString()==keepOnlyValid(fillBlanks(createEmptyBoard(1))).toString());
})();

/** Создает массив досок в которых в каждой пустой клетке
    исходной доски стоит фигурка
  * @param  {Board} b Исходная доска
  * @return {array.<Board>}
  */
// function fillBlanks(b){ return []; } // заглушка
function fillBlanks(b){
  // @param {Board}   brd Итерируемая доска
  // @param {Natural} pos Позиция
  function iter(brd, pos){
    if(brd.length==0){
      return []; // базовый случай
    }else{
      var first = brd[0];
      var rest  = brd.slice(1,brd.length);
      if(first!=Q){
        return [fillSquare(b, pos, Q)].concat(iter(rest, pos+1));
      }else{
        return iter(rest, pos+1);
      }
    }
  }

  var clone = b.slice(0, b.length); // Клонируем доску
  return iter(clone, 0);
}

// Тесты для fillBlanks
(function(){
  console.log(
    "Тест6:",
    (function(){
      var x = fillBlanks(createEmptyBoard(1));
      return x.length==1 && x[0][0]==Q;
    })());
  console.log("Тест7:", fillBlanks([Q]).length==0);
  console.log(
    "Тест8:",
    (function(){
      var x = fillBlanks(createEmptyBoard(2));
      return x.length==4 &&
        x[0].toString()==[Q,B,B,B].toString() &&
        x[1].toString()==[B,Q,B,B].toString() &&
        x[2].toString()==[B,B,Q,B].toString() &&
        x[3].toString()==[B,B,B,Q].toString()
    })());
})();

/** Ставит на доску в данную позицию данное значение (ферзь или пустая)
  * @param {Board}   b Доска
  * @param {Natural} p Позиция
  * @param {Q | B}   v Ферзь или пустая?
  */
// Тесты для fillSquare
(function(){
  console.log("Тест9:", fillSquare([B],0,Q).toString()==[Q].toString());
})()

function fillSquare(b,p,v){
  var clone = b.slice(0, b.length);
  clone[p]=v;
  return clone;
}

/** Фильтрует массив досок оставляя только те доски
    в которых ни одна фигурка не атакует другую
  * @param  {array.<Board>} lob
  * @return {array.<Board>}
  */
//function keepOnlyValid(lob){ return []; } // заглушка
function keepOnlyValid(lob){
  return lob.filter(function(b){ return isValid(b); });
}

(function(){
  console.log("Тест10:", keepOnlyValid([[B]]).toString()==[[B]].toString());
  console.log("Тест11:", keepOnlyValid([[Q]]).toString()==[[Q]].toString());
  console.log("Тест12:", function(){
    var lob = [
      [Q,Q,B,B],
      [B,Q,Q,B],
      [B,Q,B,Q]
    ];
    return keepOnlyValid(lob).length==0;
  }());
})();

/** Проверяет валидна ли доска
  * @param {Board} b Доска
  * @return {Boolean} true - доска валидна, иначе false
  */
//function isValid(b){ return false; }
function isValid(b){
  // TODO: вот эту штуку надо развернуть так, чтобы были формулы для подсчета атак а рекурсия отдельно
  // Атакует по горизонтали?
  // @param {Integer} thisPos   Позиция этой фигурки
  // @param {Integer} othersPos Позиция остальных фигурок
  // @return {Boolean}
  function isAttackByHorizontal(thisPos, othersPos){
    if(othersPos.length==0){
      return true;
    }else{
      var othersFirst = othersPos[0];
      var othersRest  = othersPos.slice(1, othersPos.length);
      return !(posToRow(thisPos, b)==posToRow(othersFirst, b)) &&
        isAttackByHorizontal(thisPos, othersRest);
    }
  }

  // Атакует по вертикали?
  // @param {Integer} thisPos   Позиция этой фигурки
  // @param {Integer} othersPos Позиция остальных фигурок
  // @return {Boolean}
  function isAttackByVertical(thisPos, othersPos){
    if(othersPos.length==0){
      return true;
    }else{
      var othersFirst = othersPos[0];
      var othersRest  = othersPos.slice(1, othersPos.length);
      return !(posToCol(thisPos, b)==posToCol(othersFirst, b)) &&
        isAttackByVertical(thisPos, othersRest);
    }
  }

  // Атакует по диагонали?
  // @param {Integer} thisPos   Позиция этой фигурки
  // @param {Integer} othersPos Позиция остальных фигурок
  // @return {Boolean}
  function isAttackByDiagonal(thisPos, othersPos){
    if(othersPos.length==0){
      return true;
    }else{
      var othersFirst = othersPos[0];
      var othersRest  = othersPos.slice(1, othersPos.length);
      var rowDiff     = posToRow(thisPos, b) - posToRow(othersFirst, b);
      var colDiff     = posToCol(thisPos, b) - posToCol(othersFirst, b);
      return !(Math.abs(rowDiff/colDiff)==1) &&
        isAttackByDiagonal(thisPos, othersRest);
    }
  }

  // Проверяет не атакуют ли фигурки друг друга
  // @param  {array.<Integer>} Массив позиций фигурок на доске
  // @return {Boolean} true если фигурки не атакуют друг-друга
  function checkFigures(positions){
    if(positions.length==0){
      return true; // базовый случай
    }else{
      var first = positions[0];
      var rest  = positions.slice(1, positions.length);
      return isAttackByHorizontal(first, rest) &&
        isAttackByVertical(first, rest) &&
        isAttackByDiagonal(first, rest) &&
        checkFigures(rest);
    }
  }

  return checkFigures(getFiguresPos(0, b));
}

(function(){
  // Не валидна если фигурки на одной горизонтали
  console.log("Тест13:", isValid([Q,Q,
                                  B,B])==false);
  // Не валидна если фигурки на одной вертикали
  console.log("Тест14:", isValid([Q,B,
                                  Q,B])==false);
  // Не валидна если фигурки на одной диагонали
  console.log("Тест15:", isValid([Q,B,
                                  B,Q])==false);
  console.log("Тест16:", isValid([B,Q,
                                  Q,B])==false);
  // Валидные доски
  console.log("Тест17:", isValid([Q])==true);
  console.log("Тест18:", isValid(n4emptBrd)==true);
  console.log("Тест19:", isValid(n4solBrd)==true);
})();

/** Возвращает массив со всеми позициями фигурок на доске
  * @param  {Integer} curPos Текущая позиция
  * @param  {Board}  board  Доска
  * @return {array.<Integer>}
  */
// TODO: вынес эту функцию из скоба isValid для того чтобы проверять количество фигурок на доске
function getFiguresPos(curPos, board){
  if(board.length==0){
    return [];
  }else{
    var first = board[0];
    var rest  = board.slice(1, board.length);
    if(first==Q){
      return [curPos].concat(getFiguresPos(curPos+1, rest));
    }else{
      return getFiguresPos(curPos+1, rest);
    }
  }
}


/** Считает размерность доски исходя из количества элементов
  * @param  {Board}   Доска
  * @return {Natural} Размерность доски
  */
(function(){
  console.log("Тест20:", getBoardSize(n4emptBrd)==4);
})();

function getBoardSize(board){
  return Math.sqrt(board.length);
}

/** Переводит позицию фигурки в строку
  * @param  {Integer} Позиция доски
  * @param  {Board}   Доска
  * @return {Integer} Строка на которой стоит фигурка. Zero-base
  */
function posToRow(pos, board){
  // Тут важно округлить в меньшую сторону
  return Math.floor(pos/getBoardSize(board));
}

(function(){
  console.log("Тест21:", posToRow(1, n4emptBrd)==0);
})();

/** Переводит позицию фигурки в столбец
  * @param  {Integer} Позиция доски
  * @param  {Board}   Доска
  * @return {Integer} Колонка на которой стоит фигурка. Zero-base
  */
function posToCol(pos, board){
  return pos%getBoardSize(board);
}

(function(){
  console.log("Тест22:", posToCol(5, n4emptBrd)==1);
})();

/** Тест производительности.
  * Передайте начальный размер доски и конечный размер доски, тест посчитает сколько занимает поиск решения для каждой доски в этом интервале
  * @param {Natural} startSizeOfBoard Начальный размер доски
  * @param {Natural} endSizeOfBoard   Конечный размер доски
  * @return {true} Тест закончился
  */
function benchmark(startSizeOfBoard, maxSizeOfBoard){
  if(startSizeOfBoard>maxSizeOfBoard){
    return true;
  }else{
    console.log("Считаем для доски с размерностью:", startSizeOfBoard);
    var startTime = Date.now();
    var solution  = solve(createEmptyBoard(startSizeOfBoard));
    var endTime   = Date.now();
    console.log("Решение:", solution.toString());
    console.log("Затраченное время:", endTime - startTime, "миллисекунд");
    return benchmark(startSizeOfBoard+1, maxSizeOfBoard);
  }
}
