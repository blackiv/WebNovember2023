(function () {
    const countryArray = [
        {
            name: "Россия",
            cityList: [{name: "Москва", population: 12},
                {name: "Санкт-Петербург", population: 7},
                {name: "Новосибирск", population: 2.5}]
        },
        {
            name: "Казахстан",
            cityList: [{name: "Астана", population: 1},
                {name: "Алма-аты", population: 1.8}]
        },
        {
            name: "Китай",
            cityList: [{name: "Пекин", population: 21.8},
                {name: "Макао", population: 0.63}]
        }
    ];

    const maxCitiesCount = countryArray.reduce((maxCities, item) => Math.max(maxCities, item.cityList.length), 0);
    console.log(`Максимальное количество городов ${maxCitiesCount}`);

    const maxCitiesCountries = countryArray
        .filter(country => country.cityList.length === maxCitiesCount)
        .map(country => country.name);
    console.log(`Страны с максимальным количеством городов [${maxCitiesCountries}]`);

    const countriesInformation = countryArray.reduce((information, country) => {
        information[country.name] = country.cityList.reduce((population, city) => population + city.population, 0);
        return information;
    }, {});
    console.log(`Информация по странам`);

    for (let country in countriesInformation) {
        console.log(`Население страны ${country} составляет ${countriesInformation[country]}`);
    }
})();