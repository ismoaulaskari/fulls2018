import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Session from './components/Session'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      success: null,
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

  hideStatus = (status) => {
    setTimeout(() => {
      this.setState({ [status]: null })
    }, 5000)
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

      this.setState({
        blogs: this.state.blogs.concat(blog),
        title: '',
        author: '',
        url: '',
        success: 'uusi blogi luotu'
      })
      this.hideStatus('success')

    } catch (exception) {
      this.setState({
        error: 'blogin luonti pieleen',
      })
      this.hideStatus('error')
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
      this.setState({ username: '', password: '', user, success: "login ok" })
      this.hideStatus('success')
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      this.hideStatus('error')
    }
  }

  logout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({ user: null, success: 'kirjauduit ulos' })
      this.hideStatus('success')
    } catch (exception) {
      this.setState({
        error: 'Logout epäonnistui',
      })
      this.hideStatus('error')
    }
  }

  render() {
    if (this.state.user === null) {
      return <div>
        <Notification status="success" message={this.state.success} />
        <Notification status="error" message={this.state.error} />
        <Togglable buttonLabel="login" initial={false} cancelLabel="cancel">
          <Login loginHandler={this.login} state={this.state} fieldHandler={this.handleFieldChange} />
        </Togglable>
      </div>
    }

    return (
      <div>
        <Session username={this.state.user.name} logoutHandler={this.logout} />
        <Notification status="success" message={this.state.success} />
        <Notification status="error" message={this.state.error} />
        <h2>create new</h2>
        <NewBlog createHandler={this.create} state={this.state} fieldHandler={this.handleFieldChange} />
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <div key={blog.id}>
            <Togglable key={blog.id} buttonLabel={`${blog.author} ${blog.title}`} initial={false} cancelLabel={`${blog.author} ${blog.title}`}>
              <Blog key={blog.id} blog={blog} all={true} />
            </Togglable>
          </div>
        )}
      </div>
    )
  }
}

export default App
