import axios from 'axios'
import dotenv from 'dotenv'

const url = "https://api.weatherbit.io/v2.0/current"

export const getWeatherData = (lat, lon) => axios.get(`${url}?key=${import.meta.env.VITE_API_KEY}&lat=${lat}&lon=${lon}`)
    .then(response => response.data.data[0])

export const getIcon = (iconName) => `https://cdn.weatherbit.io/static/img/icons/${iconName}.png`