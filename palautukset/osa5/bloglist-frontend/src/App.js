import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Session from './components/Session'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      error: null,
      username: '',
      password: '',
      blogs: [],
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    this.useToken()
  }

  useToken() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  create = async (event) => {
    event.preventDefault()
    try {
      this.useToken()
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.setState({ blogs: this.state.blogs.concat(blog) })

    } catch (exception) {
      this.setState({
        error: 'blogin luonti pieleen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({ user: null })
    } catch (exception) {
      this.setState({
        error: 'Logout epäonnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    if (this.state.user === null) {
      return <Login loginHandler={this.login} state={this.state} fieldHandler={this.handleFieldChange} />
    }

    return (
      <div>
        <Session username={this.state.user.name} logoutHandler={this.logout} />
        <h2>create new</h2>
        <NewBlog createHandler={this.create} state={this.state} fieldHandler={this.handleFieldChange} />
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
