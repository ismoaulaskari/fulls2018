import React from 'react'
//import { inittingData } from '../reducers/anecdoteReducer'
import { filterSetting } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value
    //this.props.store.dispatch(inittingData())
    //console.log(this.props.store.getState().anecdotes)
    this.props.store.dispatch(filterSetting({
      filter,
      data: this.props.store.getState().anecdotes
    }))
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

export default Filter