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
            {props.data.map(r => <Osa osa={r.nimi} tehtavia={r.tehtavia} />)}
        </div>
    )
}

const Yhteensa = (props) => {
    let sum = 0
    sum += props.counts[0].tehtavia
    sum += props.counts[1].tehtavia
    sum += props.counts[2].tehtavia
    return (
        <div>
            <p>yhteensä {sum} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto data={osat} />
            <Yhteensa counts={osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
