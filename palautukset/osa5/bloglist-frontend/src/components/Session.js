import React from 'react'
const Session = ({ username, logoutHandler }) => (
  <p>{username} logged in    <a onClick={logoutHandler}>logout</a></p>
)

export default Session