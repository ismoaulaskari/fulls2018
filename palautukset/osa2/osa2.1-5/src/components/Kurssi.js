import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
//import Yhteensa from './Yhteensa'

const Kurssi = ( {kurssi} ) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto data={kurssi.osat} />
            
        </div>
    )
    //<Yhteensa counts={kurssi.osat} />
}

export default Kurssi