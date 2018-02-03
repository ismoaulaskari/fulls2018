import React from 'react'

const Listing = ({ items }) => {
    return (
        <ul>
            {items.map(i => <li key={i.name}>{i.name} {i.number}</li>)}
        </ul>
    )
}
export default Listing