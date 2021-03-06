import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {},
      voittaja: ''
    }
  }

  shuffle = (l) => {
    return () => {
      this.setState({
        selected: Math.floor(l * Math.random())
      })
    }
  }

  vote = (l) => {
    const kopio = { ...this.state.votes }
    if (kopio[l] === undefined) {
      kopio[l] = 0
    }
    kopio[l] += 1
    return () => {
      this.setState({
        votes: kopio
      })
    }
  }


  render() {
    return (
      <div>
        <button onClick={this.shuffle(this.props.anecdotes.length)}>sekoita</button>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <p><i>{this.state.votes[this.state.selected] ? this.state.votes[this.state.selected] : 0} ääntä</i></p>
        <button onClick={this.vote(this.state.selected)}>äänestä tätä</button>
        <Paras stats={this.state} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Paras = ({ stats }) => {
  let maxAanet = 0;
  let teksti = '';
  let vkeys = Object.keys(stats.votes)
  
  if (vkeys.length > 0) {
    vkeys.map(key => {
      if(stats.votes[key] > maxAanet) {
        maxAanet = stats.votes[key]
        teksti = anecdotes[key]
      }
      return null
    })
  }

  let voittaja = 'ei valittu'
  if (maxAanet > 0) {
    voittaja = teksti + ', ' + maxAanet + ' ääntä'
  }
  return (
    <div>
      <b>Eniten ääniä saanut:</b>
      <p><i>{voittaja}</i></p>
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
