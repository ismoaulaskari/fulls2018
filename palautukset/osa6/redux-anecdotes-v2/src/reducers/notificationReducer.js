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

export const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    text: notification
  }
}

export const notificationHiding = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer
