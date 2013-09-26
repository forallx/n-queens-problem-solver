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
  function solveChilds(lob){

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
// !!!
function nextBoards(b){ return []; } // Заглушка

