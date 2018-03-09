import React from 'react'
import { connect } from 'react-redux'
import { voteAdding } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.voteAdding(anecdote)
                this.props.notify(`A vote for ${anecdote.content}`, 4)
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

const anecdotesToShow = (anecdotes, filter) => {
  if (!filter.filter) {
    return anecdotes
  }

  return anecdotes.filter((p) => {
    return (p.content.search(new RegExp(filter.filter, 'i')) > -1)
  })
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAdding, notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
