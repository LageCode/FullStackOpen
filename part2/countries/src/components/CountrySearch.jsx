import React, { useEffect, useState } from 'react'

import { findCountryByName } from '../services/country'

const CountryDetails = ({ name, capital, area, languages, image }) => {
	return (
		<div className='search-result'>
			<h2>{name}</h2>
			<p><b>Capital</b> {capital}</p>
			<p><b>Area</b> {area}</p>
			{
				<div className='country-details'>
					<p><b>Languages:</b></p>
					<ul>
						{
							languages.map((lan, i) => <li key={i}>{lan}</li>)
						}
					</ul>
				</div>
			}
			<img src={image.png} alt={image.alt} />
		</div>
	)
}

const CountryListItem = ({ country, setList }) => <li>{country.name.common} <button onClick={() => { setList([country]) }}>show</button></li>

const CountryList = ({ list, setList }) => {
	return (
		<ul>
			{
				list.map((cou, i) => <CountryListItem key={i} country={cou} setList={() => setList(cou)} />)
			}
		</ul>
	)
}

const CountrySearch = () => {
	const [name, setName] = useState("")
	const [searchResult, setSearchResult] = useState(null)

	useEffect(() => {
		if (name) {
			findCountryByName(name).then(response => { setSearchResult(response) })
		}
	}, [name])

	const country = searchResult && searchResult.length === 1 && searchResult[0]
	const countryDetails = country && {
		name: country.name.common,
		capital: country.capital,
		area: country.area,
		languages: Object.values(country.languages),
		image: {
			png: country.flags.png,
			alt: country.flags.alt
		}
	}

	const triggerCountry = (country) => {
		setSearchResult([country])
		setName(country.name.common)
	}

	return (
		<div className='country-search'>
			<label>Find Countries</label><br />
			<input value={name} onChange={event => setName(event.target.value)} />
			{
				country ? (
					<CountryDetails
						name={countryDetails.name}
						capital={countryDetails.capital}
						area={countryDetails.area}
						languages={countryDetails.languages}
						image={countryDetails.image} />
				) : searchResult && searchResult.length <= 10 ? (
					<CountryList list={searchResult} setList={triggerCountry} />
				) : <p>Too many matches, specify another filter</p>
			}
		</div>
	)
}

export default CountrySearch