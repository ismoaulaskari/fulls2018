import React from 'react'

const Countries = ({ items }) => {
    const list = [...items]
    if (list.length > 10) {
        return (
            <p>Too many found, please change filter</p>
        )
    }

    if (list.length == 1) {
        const country = list[0]
        return (
            <div>
                <h3>{country.name}</h3>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <p><img width="20%" src={country.flag} /></p>
            </div>
        )
    }

    return (
        <ul>
            {list.map(i => <li key={i.name}>{i.name} {i.number}</li>)}
        </ul>
    )
}
export default Countries