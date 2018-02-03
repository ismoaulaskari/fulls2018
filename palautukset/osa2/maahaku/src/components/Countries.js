import React from 'react'

const Countries = ({ items, filterHandler }) => {    
    const setFilter = (text) => {                    
            filterHandler(text)           
            return null
    }

    const list = [...items]
    if (list.length > 10) {
        return (
            <p>Too many found, please change filter</p>
        )
    }

    if (list.length === 1) {
        const country = list[0]
        return (
            <div>
                <h3>{country.name}</h3>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <p><img width="20%" src={country.flag} alt="flag" /></p>
            </div>
        )
    }

    return (
        <ul>
            {list.map(i => <a key={i.name} onClick={() => setFilter(i.name)}><li key={i.name}>{i.name} {i.number}</li></a>)}
        </ul>
    )
}
export default Countries