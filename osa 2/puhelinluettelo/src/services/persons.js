// Importataan käytetty axios-kirjasto ja määritellään JSONServerin sijainti muuttujaan
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Metodi, jolla haetaan kaikki henkilöt palvelimelta
const getAll = () => {
    return axios.get(baseUrl)
}

// Metodi, jolla luodaan uusi henkilö palvelimelle
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

// Metodi, jolla poistetaan henkilö palvelimelta
const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
} 

// Metodi, jolla korvataan käyttäjän numero tietokannasa
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, remove, update }