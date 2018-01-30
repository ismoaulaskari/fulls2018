import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  addName = (event) => {    
    const newName = this.state.newName
    event.preventDefault()        
    const found = this.state.persons.findIndex(n => n.name === newName)    
    if(found > -1) {      
      this.setState({ newName: newName })
      alert("On jo luettelossa!")
      return null;
    }
    const nameObject = {
      name: this.state.newName,
    }

    const persons = this.state.persons.concat(nameObject)

    this.setState({
      persons: persons,
      newName: ''
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName}
              onChange={this.handleNameChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App

