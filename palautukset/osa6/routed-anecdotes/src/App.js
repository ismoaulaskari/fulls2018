import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'


const findAnecdoteById = (anecdotes, id) => {
  return anecdotes.find(a => a.id === id)
}

const Anecdote = ({anecdote}) => {
  return (
  <p>{anecdote.author}: <i>{anecdote.content}</i>
  <br/>{anecdote.info}, {anecdote.votes} votes</p>
  )
}

const Menu = ({ anecdotes, addNew, notify, style }) => (
  <Router>
    <div>
      <div>
        <NavLink activeStyle={style} to="/anecdotes">anecdotes</NavLink>&nbsp;
      <NavLink activeStyle={style} to="/create_new">create new</NavLink>&nbsp;
      <NavLink activeStyle={style} to="/about">about</NavLink>&nbsp;
    </div>
      <div>
        <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create_new" render={({history}) => <CreateNew addNew={addNew} history={history} notify={notify}/>} />
        <Route path="/about" render={() => <About />} />
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
          <Anecdote anecdote={findAnecdoteById(anecdotes, match.params.id)}/> } />
      </div>
    </div>
  </Router>
    )
    
const AnecdoteList = ({anecdotes}) => (
  <div>
      <h2>Anecdotes</h2>
      <ListGroup>
        {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
      </ListGroup>
    </div>
    )
    
    const About = () => (
  <Grid>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
    <Row>
    <Col  sm={4} md={2}>


      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col>
      <img src="wall3.jpg" alt="famous"/>
      </Col>
      </Row>
    </Grid>
    )
    
    const Footer = () => (
  <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
  
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
    )
    
class CreateNew extends React.Component {
      constructor() {
    super()
    this.state = {
      content: '',
    author: '',
    info: ''
  }
}

  handleChange = (e) => {
      //console.log(e.target.name, e.target.value)
    this.setState({[e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
      e.preventDefault()
    this.props.addNew({
      content: this.state.content,
    author: this.state.author,
    info: this.state.info,
    votes: 0
  })
  this.props.notify(this.state.content)
  this.props.history.push('/anecdotes')
}

  render() {
    return (
      <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={this.handleSubmit}>
        <div>
          content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
        </div>
        <div>
          author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
        </div>
        <div>
          url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
        </div>
        <button>create</button>
      </form>
    </div>
    )

  }
}

class App extends React.Component {
      constructor() {
    super()

    this.state = {
      anecdotes: [
        {
      content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
        {
      content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
],
notification: ''
}
}

  addNew = (anecdote) => {
      anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
    votes: anecdote.votes + 1
  }

  const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({anecdotes})
  }

  notify = (content) => {
    this.setState({ notification: `Added new: ${content}` })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10 * 1000)
  }

  render() {
    /*const otherStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16,
      border: 4,
      outlineStyle: 'inset',
      outlineColor: 'green',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#fff',
      margin: 4,
      padding: 4
    }*/

    const notifyStyle = {
      marginRight:10,
      marginLeft:10,
      marginTop:10,
      paddingTop:10,
      paddingBottom:20,
      backgroundColor:'#68a0cf',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    }

    const activeStyle={
      fontWeight: 'bold',
      color: 'red'
     }

    const notification = () => {
      return (
      (this.state.notification) ?
        <div style={notifyStyle}>{this.state.notification}</div> :
        <p>{this.state.notification}</p>
      )
  
    }

    return (
      <div className="container">
      <h1>Software anecdotes</h1>
      {notification()}
      <Menu style={activeStyle} anecdotes={this.state.anecdotes} notify={this.notify}addNew={this.addNew} />      
      <Footer />
    </div>
    );
  }
}

export default App;