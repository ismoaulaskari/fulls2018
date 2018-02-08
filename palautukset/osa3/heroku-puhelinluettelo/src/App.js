import React from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Listing from './components/Listing';
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      personsToShow: [],
      success: null
    }
    this.state.personsToShow = this.state.persons
  }

  showSuccess(message) {
    this.setState({ success: message })
    setTimeout(() => {
      this.setState({ success: null })
    }, 3000)
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
        this.applyFilter(this.state.filter)
      })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })

  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    const filter = event.target.value
    this.setState({ filter: filter })
    this.applyFilter(filter)
  }

  applyFilter(filter) {
    if (filter.length < 1) {
      this.setState({ personsToShow: this.state.persons })
    }
    else {
      const personsToShow = this.state.persons.filter((p) => {
        return (p.name.search(new RegExp(filter, 'i')) > -1)
      })
      this.setState({ personsToShow: personsToShow })
    }
  }

  confirmed(text, id) {
    return window.confirm(text + this.state.persons.find(p => p.id === id).name)
  }

  deleteContact = (id) => {
    return () => {
      if (this.confirmed("poistetaanko ", id)) {
        personService.remove(id)
          .then(response => {
            console.log(response)
            personService.getAll()
              .then(response => {
                this.setState({
                  persons: response.data,
                  personsToShow: response.data
                })
                this.showSuccess("poisto onnistui")
              })
          }).catch(error => {
            alert('Virhe poistaessa')
          })
      }
    }
  }

  addContact = (event) => {
    event.preventDefault()
    const newName = this.state.newName
    const found = this.state.persons.filter(n => (n.name === newName))
    if (found.length === 1) {
      const id = found[0].id
      if (this.confirmed("On jo luettelossa, muutetaanko ", id)) {
        const changedPerson = { id: id, name: this.state.newName, number: this.state.newNumber }
        personService
          .update(id, changedPerson)
          .then(response => {
            const persons = this.state.persons.filter(n => n.id !== changedPerson.id)
            this.runSetPersons(persons.concat(changedPerson))
            this.showSuccess("päivitys onnistui")
          })
          .catch(error => {
            if (error.message === 'Request failed with status code 404') {
              this.runCreate({ name: changedPerson.name, number: changedPerson.number })
            }
            else {
              alert('Virhe muuttaessa ' + error.message)
            }
          })
      }
    }
    else {
      const newObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      this.runCreate(newObject)
    }
  }

  runCreate(newObject) {
    personService
      .create(newObject)
      .then(response => {
        this.runSetPersons(this.state.persons.concat(response.data))
        this.showSuccess("lisäys onnistui")
      }).catch(error => {
        alert('Virhe lisätessä')
      })
  }

  runSetPersons(persons) {
    this.setState({
      persons: persons,
      newName: '',
      newNumber: '',
      personsToShow: persons
    })
  }

  render() {
    return (
      <div>
        <Filter filter={this.state.filter} handler={this.handleFilterChange} />
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.success} />
        <Form add={this.addContact} state={this.state} nameChange={this.handleNameChange} numberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
        <Listing items={this.state.personsToShow} deleteHandler={this.deleteContact} />
      </div>
    )
  }
}

export default App

