##Скрипт для решения проблемы n-ферзей

Версия 1.

Проблема n-ферзей и процесс создания этой программы [описаны в этом посте](http://forallx.ru/posts/n-queens-problem).

Для запуска вызовите функцию [solve](https://rawgithub.com/forallx/n-queens-problem-solver/master/doc/global.html#solve)
и передайте ей в качетсве параметра пустую доску нужной размерности:
`solve(createEmptyBoard(4));`

Для того чтобы убедится в работоспособоности программа содержит несколько тестов. Для того чтобы
их запустить просто выполните программу:
`node n_queens_solver.js`

Так же есть функция теста производительности [benchmark](https://rawgithub.com/forallx/n-queens-problem-solver/master/doc/global.html#benchmark).
Запустите ее со следующими параметрами:
`benchmark(1,10);`

Мои результаты в оригинальном [посте](http://forallx.ru/posts/n-queens-problem).

[Документация](https://rawgithub.com/ch-ms/n-queens-problem-solver/master/doc/global.html)

---
Евгений Кузнецов, [forallx.ru](http://forallx.ru)
