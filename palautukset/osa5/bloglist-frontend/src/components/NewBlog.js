import React from 'react'
const NewBlog = ({ createHandler, state, fieldHandler }) => (
  <form onSubmit={createHandler}>
    <div>
      title
<input
        type="text"
        name="title"
        value={state.title}
        onChange={fieldHandler}
      />
    </div>
    <div>
      author
<input
        type="text"
        name="author"
        value={state.author}
        onChange={fieldHandler}
      />
    </div>
    <div>
      url
<input
        type="text"
        name="url"
        value={state.url}
        onChange={fieldHandler}
      />
    </div>
    <button type="submit">create</button>
  </form>
)
export default NewBlog