import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationHiding } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    this.props.notificationSetting(`a new anecdote: ${content}`)
    setTimeout(() => {
      this.props.notificationHiding()
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.notification
  }
}

const mapDispatchToProps = {
  anecdoteCreation, notificationSetting, notificationHiding
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm