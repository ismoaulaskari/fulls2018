import React from 'react'
const Login = ({ loginHandler, state, fieldHandler }) => (
  <div>
    <h2>Kirjaudu</h2>

    <form onSubmit={loginHandler}>
      <div>
        käyttäjätunnus
    <input
          type="text"
          name="username"
          value={state.username}
          onChange={fieldHandler}
        />
      </div>
      <div>
        salasana
    <input
          type="password"
          name="password"
          value={state.password}
          onChange={fieldHandler}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
)

export default Login