import React from 'react'
import { connect } from 'react-redux'
import { voteAdding } from '../reducers/anecdoteReducer'
import { notificationHiding, notificationSetting } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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
                anecdote.votes++
                const updatedAnecdote = anecdoteService.updateExisting(anecdote)
                this.props.voteAdding(updatedAnecdote)
                this.props.notificationSetting(`A vote for ${anecdote.content}`)
                setTimeout(() => {
                  this.props.notificationHiding()
                }, 5000)
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
  voteAdding, notificationSetting, notificationHiding
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
