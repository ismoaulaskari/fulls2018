import React from 'react'
import { connect } from 'react-redux'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInitialization } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.anecdoteInitialization()
  }

  render() {
    return (
      <div>
        <Filter />
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteInitialization
}

const ConnectedApp = connect(
  null, mapDispatchToProps)(App)
export default ConnectedApp
