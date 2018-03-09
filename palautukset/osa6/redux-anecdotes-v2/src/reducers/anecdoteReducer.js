import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (store = initialState, action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.data.id)
    const voted = action.data
    return [...old, voted]
  }
  if (action.type === 'CREATE') {
    console.log(action)
    return [...store, {
      content: action.data.content,
      id: action.data.id, votes:
        action.data.votes
    }]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voteAdding = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export default anecdoteReducer