import React from 'react'
import { voteAdding } from '../reducers/anecdoteReducer'
import { hideInFive, notificationSetting } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(voteAdding(anecdote))
                this.props.store.dispatch(notificationSetting(`A vote for ${anecdote.content}`))
                hideInFive(this.props.store)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
