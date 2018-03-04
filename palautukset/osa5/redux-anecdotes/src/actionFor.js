const actionFor = {
  voteAdding(id) {
    return {
      type: 'ADD_VOTE',
      data: id
    }
  },
  anecdoteAdding(text) {
    return {
      type: 'ADD_NEW',
      data: text
    }
  }
}
export default actionFor