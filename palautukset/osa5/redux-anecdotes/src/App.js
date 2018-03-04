import React from 'react';
import PropTypes from 'prop-types'
import actionFor from './actionFor'


class App extends React.Component {
  
  addVote = (anecdote) => () => {
    this.context.store.dispatch(
      actionFor.voteAdding(anecdote)
    )
  }

  render() {
    const anecdotes = this.context.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}
App.contextTypes = {
  store: PropTypes.object
}
export default App