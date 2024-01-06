(function () {
    function getCountriesWithMaxCitiesCount(countriesArray) {
        const maxCitiesCount = countriesArray.reduce((maxCitiesCount, country) => Math.max(maxCitiesCount, country.cities.length), 0);
        return countries
            .filter(country => country.cities.length === maxCitiesCount);
    }

    function getPopulationByCountries(countriesArray) {
        const populationByCountries = {};

        countriesArray.forEach(country => {
            populationByCountries[country.name] = country.cities.reduce((population, city) => population + city.population, 0);
        });

        return populationByCountries;
    }

    const countries = [
        {
            name: "Россия",
            cities: [
                {
                    name: "Москва",
                    population: 12
                },
                {
                    name: "Санкт-Петербург",
                    population: 7
                },
                {
                    name: "Новосибирск",
                    population: 2.5
                }
            ]
        },
        {
            name: "Казахстан",
            cities: [
                {
                    name: "Астана",
                    population: 1
                },
                {
                    name: "Алма-аты",
                    population: 1.8
                }
            ]
        },
        {
            name: "Китай",
            cities: [
                {
                    name: "Пекин",
                    population: 21.8
                },
                {
                    name: "Макао",
                    population: 0.63
                }
            ]
        }
    ];

    const countriesWithMaxCitiesCount = getCountriesWithMaxCitiesCount(countries);
    console.log(`Страны с максимальным количеством городов [${countriesWithMaxCitiesCount.map(country => country.name)}]`);

    console.log("Информация по странам");
    const populationByCountries = getPopulationByCountries(countries)

    for (const countryName in populationByCountries) {
        console.log(`Население страны ${countryName} составляет ${populationByCountries[countryName]}`);
    }
})();