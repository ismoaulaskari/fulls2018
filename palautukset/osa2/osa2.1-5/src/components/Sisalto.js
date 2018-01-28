import React from 'react'
import Osa from './Osa'

const Sisalto = (props) => {
    let id = 1;
    return (
        <div>
            {props.data.map(r => <Osa key={'sis' + id++} osa={r.nimi} tehtavia={r.tehtavia} />)}
        </div>
    )
}

export default Sisalto