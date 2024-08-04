import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ showFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input
      value={showFilter}
      onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    personsToShow.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')

  // Haetaan palvelimelta henkilöt axios kutsulla
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  // Annetaan toisena parametrina tyhjä taulukko, jolloin efekti toteutetaan vain kerran
  }, [])

  const addPerson = (event) => {
    // Estetään sivun uudelleenlataaminen
    event.preventDefault()

    // Luodaan metodi, jolla tarkastetaan löytyykö listalta jo nimeä
    const isPersonAlready = () => {
      // Metodi array.some testaa läpäiseekö mikään listan persons alkio: newName === person.name
      return persons.some(person => newName === person.name)
    }

    // Jos nimeä ei löydy, niin luomme person-olion ja lisäämme sen persons listaan
    if (!isPersonAlready()) {
      const person = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
      // Jos taas nimi löytyy, kutsutaan alert-metodia ja ilmoitetaan, että se löytyy jo listalta
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }  
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowFilter(event.target.value)
  }

  const personsToShow = showFilter
    ? persons.filter(person => person.name.toLowerCase().startsWith(showFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter showFilter={showFilter} handleFilterChange={handleFilterChange}/>
      
      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App