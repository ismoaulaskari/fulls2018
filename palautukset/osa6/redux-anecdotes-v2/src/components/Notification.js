import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    let notification = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps, {})(Notification)

export default ConnectedNotification

