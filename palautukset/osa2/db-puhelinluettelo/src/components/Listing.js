import React from 'react'

const Listing = ({ items, deleteHandler }) => {
    const del = (id) => deleteHandler(id)

    return (
        <ul>
            {items.map(i => <li key={i.id}>{i.id} {i.name} {i.number} <button onClick={del(i.id)}>poista</button></li>)}
        </ul>
    )
}
export default Listing