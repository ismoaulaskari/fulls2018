import React from 'react'
import { connect } from 'react-redux'
import { filterSetting } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value
    this.props.filterSetting({ filter })
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  filterSetting
}

const ConnectedFilter = connect(
  mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter