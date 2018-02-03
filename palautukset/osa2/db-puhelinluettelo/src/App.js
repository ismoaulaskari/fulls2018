import React from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Listing from './components/Listing';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      personsToShow: []
    }
    this.state.personsToShow = this.state.persons
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
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

  addContact = (event) => {
    event.preventDefault()
    const newName = this.state.newName
    const newNumber = this.state.newNumber
    const found = this.state.persons.findIndex(n => (n.name === newName || n.number === newNumber))
    if (found > -1) {
      alert("On jo luettelossa!")
      return null
    }
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: '',
          personsToShow: this.state.personsToShow.concat(response.data)
        })
      }).catch(error => {
        alert('Virhe lisätessä')
      })
  }

  render() {
    return (
      <div>
        <Filter filter={this.state.filter} handler={this.handleFilterChange} />
        <h2>Puhelinluettelo</h2>
        <Form add={this.addContact} state={this.state} nameChange={this.handleNameChange} numberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
        <Listing items={this.state.personsToShow} />
      </div>
    )
  }
}

export default App

