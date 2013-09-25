// Пустая клетка
var B = false;
// Клетка с фигурой
var Q = true;

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
var rcToPos = function(r,c,n){
  return r*n+c;
};

// Тесты для функции rcToPos
(function(){
  console.log("Тест1:", n4solBrd[rcToPos(0,1,4)]==Q);
  console.log("Тест2:", n4solBrd[rcToPos(3,3,4)]==B);
})();


// Создает пустую доску n*n элементов
// @param {Natural} n Размерность доски
// @return {arrayof: boolean} Доска
var createEmptyBoard = function(n){
  var b = [];
  for(var i=0;i<n*n;i++){ b.push(B); }
  return b;
};

// Тесты для функции createEmptyBoard
(function(){
  console.log("Тест3:", createEmptyBoard(4).length==16);
})();

// Решает проблемы n-ферзей
// @param {arrayof: boolean} b Доска
// @return {arrayof: boolean | false}:
//          Если задача имеет решение тогда доску
//          Если решения нет тогда false

var solve = function(b){return false}; // заглушка

(function(){
  console.log("Тест4:", solve(createEmptyBoard(1))==[Q]);
  console.log("Тест5:", solve(createEmptyBoard(2))==false);
  console.log("Тест6:", solve(createEmptyBoard(4))==n4solBrd);
})();



