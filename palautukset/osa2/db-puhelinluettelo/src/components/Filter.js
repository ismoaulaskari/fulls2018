import React from 'react';

const Filter = ({filter,handler}) => {
    return (
        <div >Hae: <input value={filter}
            onChange={handler} />
        </div>
    )
}

export default Filter