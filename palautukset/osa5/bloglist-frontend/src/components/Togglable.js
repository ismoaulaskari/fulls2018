import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: props.initial
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div id="clickable" style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div id="fullInfo" style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>{this.props.cancelLabel}</button>
        </div>
      </div>
    )
  }
}

export default Togglable
