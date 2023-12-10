function sortArray(array) {
    array.sort((number1, number2) => {
        return number2 - number1;
    });
}

function getSubArrays(array, count) {
    return {
        first: array.slice(0, count),
        last: array.slice(-count)
    };
}

function getEvenNumbersSum(array) {
    return array.reduce((currentSum, currentNumber) => {
        if (currentNumber % 2 === 0) {
            return currentSum + currentNumber;
        }

        return currentSum;
    }, 0);
}

function createOrderedArray() {
    const array = Array(100);

    for (let i=1;i<=100;i++){
        array[i-1] = i;
    }

    return array;
}

function getEvenNumbersSquaresArray (array){
    return array
        .filter(number => number % 2 === 0)
        .map(number => number * number);
}

(function () {
    const array = [7, 12, 3, 5, 4, 29, 22, 89, 45, 44];
    console.log(`Исходный массив [${array}]`);

    sortArray(array)
    console.log(`Отсортированный по убыванию массив [${array}]`);

    const subArrayItemsCount = 5;
    const subArrays = getSubArrays(array,subArrayItemsCount);
    console.log(`Подмассив первых ${subArrayItemsCount} элементов [${subArrays.first}]`);
    console.log(`Подмассив последних ${subArrayItemsCount} элементов [${subArrays.last}]`);

    console.log(`Сумма четных элементов массива равна ${getEvenNumbersSum(array)}`);

    const orderedArray = createOrderedArray();
    console.log(`Заполненный массив от 1 до 100 [${orderedArray}]`);

    console.log(`Массив квадратов четных чисел [${getEvenNumbersSquaresArray(orderedArray)}]`);
})();