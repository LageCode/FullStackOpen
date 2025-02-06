import React, { useEffect, useState } from 'react'

import { findCountryByName } from '../services/country'
import { getWeatherData, getIcon } from '../services/weather'

const CountryWeatherDetails = ({ lat, lng }) => {
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		getWeatherData(lat, lng).then(response => {
			setWeather(
				{
					temp: response.temp,
					windSpeed: response.wind_spd,
					icon: getIcon(response.weather.icon)
				}
			)
		})
	}, [])

	if (!weather) {
		return null
	}

	return (
		<div className='weather-details'>
			<p>temperature: {weather.temp}°c</p>
			<p>wind speed: {weather.windSpeed}m/s</p>
			<img src={weather.icon} />
		</div>
	)
}

const CountryDetails = ({ name, capital, area, languages, image: { png, alt }, position: { lat, lng } }) => {
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
			<img src={png} alt={alt} />
			<CountryWeatherDetails lat={lat} lng={lng} />
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
		},
		position: {
			lat: country.latlng[0],
			lng: country.latlng[1]
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
						image={countryDetails.image}
						position={countryDetails.position} />
				) : searchResult && searchResult.length <= 10 ? (
					<CountryList list={searchResult} setList={triggerCountry} />
				) : <p>Too many matches, specify another filter</p>
			}
		</div>
	)
}

export default CountrySearch