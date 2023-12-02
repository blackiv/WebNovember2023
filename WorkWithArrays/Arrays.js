(function () {
    let array = [7, 12, 3, 5, 4, 29, 22, 89, 45, 44];
    console.log(`Исходный массив [${array}]`);

    array.sort((item1, item2) => {
        return item1 - item2;
    });
    console.log(`Отсортированный массив [${array}]`);

    let n = 5;
    console.log(`Подмассив первых ${n} элементов [${array.slice(0, n)}]`);
    console.log(`Подмассив последних ${n} элементов [${array.slice(-n)}]`);

    let evenElementsSum = array.reduce((currentSum, item) => {
        if (item % 2 === 0) {
            currentSum += item;
        }

        return currentSum;
    }, 0);
    console.log(`Сумма четных элементов массива равна ${evenElementsSum}`);
})();

(function () {
    let array = Array(100)
        .fill(0)
        .map((item, index) => index + 1);
    console.log(`Заполненный массив от 1 до 100 [${array}]`);

    array = array
        .filter(value => value % 2 === 1)
        .map(item => item * item);
    console.log(`Массив квадратов нечетных чисел [${array}]`);
})();