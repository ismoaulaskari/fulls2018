const getTokenFrom = (request) => {
  console.log(request)
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const extract = (request, response, next) => {
  const token = getTokenFrom(request)
  request.token = token

  next()
}

module.exports = { extract }
