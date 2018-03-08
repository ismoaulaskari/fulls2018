import React from 'react'
import { connect } from 'react-redux'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import { anecdoteInitialization } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount = async () => {
    try {
      const anecdotes = await anecdoteService.getAll()
      this.props.anecdoteInitialization(anecdotes)
    }
    catch (error) {
      console.log(error)
    }
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
