import axios from 'axios';

const url = "https://studies.cs.helsinki.fi/restcountries/"

const Endpoints = {
    ALL: 'all',
    NAME: 'name'
}

const cache = {
    data: [],
    lastUpdate: null
}

const genUrl = (endpoint, name) => `${url}api/${endpoint}${name ? "/" + name : ""}`

const getAll = () => cache.lastUpdate && Date.now() - cache.lastUpdate < 86400000
    ? Promise.resolve(cache.data) : axios.get(genUrl(Endpoints.ALL))
        .then(response => {
            console.log(`Fetched ${response.data.length} results:`)
            console.log(response.data)

            return response.data
        })

export const findCountryByName = (name) => getAll()
    .then(countryList => {
        console.log(`Calling findCountryByName("${name}")`)

        const result = countryList.length > 0
            ? countryList.filter(c => c.name.common.toLocaleLowerCase().includes(name.toLocaleLowerCase())) : null

        console.log(`Filtered following countries:`)
        console.log(result)
        return result;
    })
