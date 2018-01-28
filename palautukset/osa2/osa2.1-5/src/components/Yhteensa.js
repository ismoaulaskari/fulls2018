import React from 'react'
//https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects
const Yhteensa = ( {counts} ) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.tehtavia;
    let total = counts.reduce(reducer, 0)
  
    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

export default Yhteensa