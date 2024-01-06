(function () {
    function sortArray(array) {
        array.sort((number1, number2) => number2 - number1);
    }

    function getFirstElementsSubArray(array, count) {
        return array.slice(0, count);
    }

    function getLastElementsSubArray(array, count) {
        return array.slice(-count);
    }

    function getEvenNumbersSum(numbersArray) {
        return numbersArray.reduce((sum, number) => {
            if (number % 2 === 0) {
                return sum + number;
            }

            return sum;
        }, 0);
    }

    function createOrderedNumbersArray() {
        const array = Array(100);

        for (let i = 1; i <= 100; i++) {
            array[i - 1] = i;
        }

        return array;
    }

    function getEvenNumbersSquares(numbersArray) {
        return numbersArray
            .filter(number => number % 2 === 0)
            .map(number => number * number);
    }

    const array = [7, 12, 3, 5, 4, 29, 22, 89, 45, 44];
    console.log(`Исходный массив [${array}]`);

    sortArray(array)
    console.log(`Отсортированный по убыванию массив [${array}]`);

    const subArrayItemsCount = 5;
    console.log(`Подмассив первых ${subArrayItemsCount} элементов [${getFirstElementsSubArray(array, subArrayItemsCount)}]`);
    console.log(`Подмассив последних ${subArrayItemsCount} элементов [${getLastElementsSubArray(array, subArrayItemsCount)}]`);

    console.log(`Сумма четных элементов массива равна ${getEvenNumbersSum(array)}`);

    const orderedArray = createOrderedNumbersArray();
    console.log(`Заполненный массив от 1 до 100 [${orderedArray}]`);

    console.log(`Массив квадратов четных чисел [${getEvenNumbersSquares(orderedArray)}]`);
})();