const initialState = ''

const filterReducer = (store = initialState, action) => {
  if (action.type === 'SET_FILTER') {
    const filter = action.filter
    if (filter) {
      return filter
    }
  }

  return store
}

export const filterSetting = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
}

export default filterReducer