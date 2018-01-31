import React from 'react';

const Form = ({add,state,nameChange,numberChange}) => {
  return (
    <form onSubmit={add}>
      <div>
        nimi: <input value={state.newName}
          onChange={nameChange} />
      </div>
      <div>
        numero: <input value={state.newNumber}
          onChange={numberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}
export default Form