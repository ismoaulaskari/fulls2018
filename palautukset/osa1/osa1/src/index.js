import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.data[1].teksti} tehtavia={props.data[1].num} />
            <Osa osa={props.data[2].teksti} tehtavia={props.data[2].num} />
            <Osa osa={props.data[3].teksti} tehtavia={props.data[3].num} />
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.count} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const data = {}
    data[1] = {
        'teksti': 'Reactin perusteet',
        'num': 10
    }
    data[2] = {
        'teksti': 'Tiedonvälitys propseilla',
        'num': 7
    }
    data[3] = {
        'teksti': 'Komponenttien tila',
        'num': 14
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto data={data} />
            <Yhteensa count={data[1].num + data[2].num + data[3].num} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
