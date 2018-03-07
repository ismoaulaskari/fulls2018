
const initialState = { filter: '', data: [] }

const filterReducer = (store = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    const filter = action.filter
    if (filter) {
      const data = action.data
      const filteredList = data.filter((p) => {
        return (p.content.search(new RegExp(filter, 'i')) > -1)
      })
      return { filter, data: filteredList }
    }
  }

  return store
}

export const filterSetting = (filtering) => {
  return {
    type: 'SET_FILTER',
    data: filtering.data,
    filter: filtering.filter
  }
}

export default filterReducer