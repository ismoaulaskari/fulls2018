import React from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      itemsToShow: []
    }
    this.state.itemsToShow = this.state.countries
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
        this.applyFilter(this.state.filter)
      })
  }

  handleFilterChange = (event) => {
    const filter = event.target.value
    this.setState({ filter: filter })
    this.applyFilter(filter)
  }

  applyFilter(filter) {    
    if (filter.length < 1) {
      this.setState({ itemsToShow: [] })
    }
    else {
      const itemsToShow = this.state.countries.filter((p) => {
        return (p.name.search(new RegExp(filter, 'i')) > -1)
      })
      this.setState({ itemsToShow: itemsToShow })
    }
  }

  render() {
    const applyFilter = (f) => this.applyFilter(f)
    return (
      <div>
        <Filter filter={this.state.filter} handler={this.handleFilterChange} />
        <Countries items={this.state.itemsToShow} filterHandler={(f) => applyFilter(f)} />
      </div>
    )
  }
}

export default App

