import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.notify(`a new anecdote: ${content}`, 4)
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
  anecdoteCreation, notify
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
