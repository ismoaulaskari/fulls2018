const actionFor = {
  voteAdding(anecdote) {
    return {
      type: 'ADD_VOTE',
      data: anecdote
    }
  }
}
export default actionFor