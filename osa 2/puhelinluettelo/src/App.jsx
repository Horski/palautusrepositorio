import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
    {message}
    </div>
  )
  
  
  
}

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

// Luodaan erillinen nappikomponentti, jonka vastuu on poistaa henkilö
const DeletePerson = ({ id, name, setPersons, persons, setErrorMessage, setMessageType }) => {
  const handleClick = () => {
    // Kysytään käyttäjältä varmistus halutaanko oikeasti poistaa
    if (confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          // Poiston jälkeen filteröidään henkilölista seuraavasti: kaikki muut paitsi kyseinen id -henkilöt näytetään
          setPersons(persons.filter(person => person.id !== id))
          // Muokataan notification näyttämään onnistunut poisto
          setMessageType('pass')
          setErrorMessage(`Removed ${name}`)

          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
        // Jos tapahtuu virhe, niin näytetään error ikkuna käyttäjälle
        .catch(error => {
          setMessageType('error')
          setErrorMessage(`Information of ${name} has already been removed from server`)
          console.error('Error happened:', error)
        })
    }
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

const Persons = ({ personsToShow, setPersons, persons, setErrorMessage, setMessageType }) => {
  return (
    personsToShow.map(person =>
      <div key={person.id}>
        {person.name} {person.number} 
        <DeletePerson
         id={person.id} 
         name={person.name} 
         setPersons={setPersons} 
         persons={persons} 
         setErrorMessage={setErrorMessage}
         setMessageType={setMessageType} 
         />
      </div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [messageType, setMessageType] = useState()

  // Haetaan palvelimelta henkilöt axios kutsulla
  useEffect(() => {
    personService
      .getAll()
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
        number: newNumber,
        id: String(persons.length + 1),
      }
      
      // Lisätään palvelimelle juuri luotu henkilö
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          // Muokataan notification näyttämään onnistunut lisäys
          setMessageType('pass')
          setErrorMessage(`Added ${person.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
        .catch(error => {
          setMessageType('error')
          console.error('Failed to add the person:', error)
         })
      
      // Jos taas nimi löytyy, kutsutaan alert-metodia ja ilmoitetaan, että se löytyy jo listalta
    } else {
       if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Etsitään käyttäjä listalta
        const existingPerson = persons.find((person) => person.name === newName)

        // Luodaan uusi olio, jossa on muuten samat tiedot kuin existingPerson-oliossa, mutta numero on päivitetty
        const updatedPerson = {...existingPerson, number: newNumber}
        
        personService
       .update(updatedPerson.id, updatedPerson)
       .then(response => {
        // Päivitetään persons-lista, jossa korvataan vanha henkilö uudella
        const newPersons = persons.map((person) => {
          return person.id !== updatedPerson.id ? person : response.data
        })

        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
        // Muokataan notification näyttämään onnistunut lisäys
        setMessageType('pass')
        setErrorMessage(`Updated the number of ${updatedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)  
       })
       .catch(error => {
        setMessageType('error')
        setErrorMessage(`Information of ${updatedPerson.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)  
       })
       }
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

      <Notification message={errorMessage} type={messageType}/>

      <Filter showFilter={showFilter} handleFilterChange={handleFilterChange}/>
      
      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      {/* Välitetään Persons-moduulille tarvittavat propsit, DeletePerson tarvitsee persons-listan ja setPersons-tilakäsittelijän */}
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage} setMessageType={setMessageType}/>
    </div>
  )

}

export default App