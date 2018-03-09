const initialState = 'reduce here notification...'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.text
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const notify = (message) => {
  return async (dispatch) => {
    dispatch(
      notificationSetting(message)
    )
    setTimeout(() => {
      dispatch(notificationHiding())
    }, 5000)

  }
}

const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    text: notification
  }
}

const notificationHiding = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer
