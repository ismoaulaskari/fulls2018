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
      /*  { name: 'Arto Hellas', number: '050-123123423' },
        { name: 'MacBain', number: '09-12983274' },
        { name: 'Spede Pasasnen', number: '120391828947' },
        { name: 'Kurkku Purkki', number: '9999999999' },
        { name: 'Pete Best', number: '66-323233232' },
        { name: 'Kugel Schreiber', number: '057-575757575' }
      ],*/
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
    const persons = this.state.persons.concat(nameObject)

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
        <Form add={this.addContact} state={this.state} nameChange={this.handleNameChange} numberChange={this.handleNumberChange} />
        <h2>Numerot</h2>
        <Listing items={this.state.personsToShow} />
      </div>
    )
  }
}

export default App

