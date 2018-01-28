import React from 'react'
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ( {kurssi} ) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto data={kurssi.osat} />
            <Yhteensa counts={kurssi.osat} />
        </div>
    )
}

export default Kurssi