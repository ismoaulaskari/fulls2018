import React from 'react'
import { connect } from 'react-redux'
import { voteAdding } from '../reducers/anecdoteReducer'
import { notificationHiding, notificationSetting } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.props
      if (!filter.filter) {
        return anecdotes
      }

      return anecdotes.filter((p) => {
        return (p.content.search(new RegExp(filter.filter, 'i')) > -1)
      })
    }

    //const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.voteAdding(anecdote)
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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAdding, notificationSetting, notificationHiding
}

const ConnectedAnecdoteList = connect(
  mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
