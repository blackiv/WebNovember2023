(function () {
    function findCountryWithMaxCitiesCount() {
        const maxCitiesCount = countries.reduce((maxCities, item) => Math.max(maxCities, item.cities.length), 0);
        return countries
            .filter(country => country.cities.length === maxCitiesCount)
            .map(country => country.name);
    }

    function getPopulationByCountries(){
        const populationByCountries = {};

        countries.forEach(country => {
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
                    population: 12},
                {
                    name: "Санкт-Петербург",
                    population: 7},
                {
                    name: "Новосибирск",
                    population: 2.5}
            ]
        },
        {
            name: "Казахстан",
            cities: [
                {
                    name: "Астана",
                    population: 1},
                {
                    name: "Алма-аты",
                    population: 1.8}
            ]
        },
        {
            name: "Китай",
            cities: [
                {
                    name: "Пекин",
                    population: 21.8},
                {
                    name: "Макао",
                    population: 0.63}
            ]
        }
    ];

    console.log(`Страны с максимальным количеством городов [${findCountryWithMaxCitiesCount()}]`);

    console.log("Информация по странам");
    const populationByCountries = getPopulationByCountries()

    for (let country in populationByCountries) {
        console.log(`Население страны ${country} составляет ${populationByCountries[country]}`);
    }
})();