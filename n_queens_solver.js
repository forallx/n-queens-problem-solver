// Пустая клетка
var B = false;
// Клетка с фигурой
var Q = true;

// Тип данных: Board
// Пустая доска с размерностью n=4
var n4emptBrd = [B, B, B, B,
                 B, B, B, B,
                 B, B, B, B,
                 B, B, B, B];
// Решение для доски с размерностью 4
var n4solBrd = [B, Q, B, B,
                B, B, B, Q,
                Q, B, B, B,
                B, B, Q, B];

// Конвертирует позицию вида ряд:столбец
// в индекс плоского массива
// Все индексы начинаются с нуля.
// @param  {Integer[0...]} r Ряд
// @param  {Integer[0...]} c Столбец
// @param  {Natural}       n Размерность доски
// @return {Natural} Позиция
function rcToPos(r,c,n){
  return r*n+c;
};

// Тесты для функции rcToPos
(function(){
  console.log("Тест1:", n4solBrd[rcToPos(0,1,4)]==Q);
  console.log("Тест2:", n4solBrd[rcToPos(3,3,4)]==B);
})();


// Создает пустую доску n*n элементов
// @param {Natural} n Размерность доски
// @return {Board}
function createEmptyBoard(n){
  var b = [];
  for(var i=0;i<n*n;i++){ b.push(B); }
  return b;
};

// Тесты для функции createEmptyBoard
(function(){
  console.log("Тест3:", createEmptyBoard(4).length==16);
})();

// Решает проблемы n-ферзей
// @param {Board} b Доска
// @return {Board | false}:
//          Если задача имеет решение тогда доску
//          Если решения нет тогда false

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
  // @param {arrayof: Board} lob
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
  console.log("Тест4:", solve(createEmptyBoard(1))==[Q]);
  console.log("Тест5:", solve(createEmptyBoard(2))==false);
  console.log("Тест6:", solve(createEmptyBoard(4))==n4solBrd);
})();

// Является ли данная доска решением?
// @param  {Board} b
// @return {Boolean}
// !!!
function isSolved(b){ return false; } // Заглушка

// Создает массив потомков данной доски
// Все несостоятельные доски вырезаются
// @param  {Board} b
// @return {arrayof: Board}
// function nextBoards(b){ return []; } // Заглушка
function nextBoards(b){
  return keepOnlyValid(fillBlanks(b));
}

// Тесты для nextBoards
(function(){
  console.log("Тест7:", nextBoards(createEmptyBoard(1)).toString()==keepOnlyValid(fillBlanks(createEmptyBoard(1))).toString());
})();

// Создает массив досок в которых в каждой пустой клетке
// исходной доски стоит фигурка
// @param  {Board} b Исходная доска
// @return {arrayof: Board}

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
    "Тест8:",
    (function(){
      var x = fillBlanks(createEmptyBoard(1));
      return x.length==1 && x[0][0]==Q;
    })());
  console.log("тест9:", fillBlanks([Q]).length==0);
  console.log(
    "тест10:",
    (function(){
      var x = fillBlanks(createEmptyBoard(2));
      return x.length==4 &&
        x[0].toString()==[Q,B,B,B].toString() &&
        x[1].toString()==[B,Q,B,B].toString() &&
        x[2].toString()==[B,B,Q,B].toString() &&
        x[3].toString()==[B,B,B,Q].toString()
    })());
})();

// Ставит на доску в данную позицию данное значение (ферзь или пустая)
// @param {Board}   b Доска
// @param {Natural} p Позиция
// @param {Q | B}   v Ферзь или пустая?

// Тесты для fillSquare
(function(){
  console.log("Тест10:", fillSquare([B],0,Q).toString()==[Q].toString());
})

function fillSquare(b,p,v){
  var clone = b.slice(0, b.length);
  clone[p]=v;
  return clone;
}

// Фильтрует массив досок оставляя только те доски
// в которых ни одна фигурка не атакует другую
// @param  {arrayof: Board}
// @return {arrayof: Board}
// !!!
function keepOnlyValid(b){ return []; } // заглушка

