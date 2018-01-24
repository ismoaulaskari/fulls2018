import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <p>{props.osa} {props.tehtavia}</p>
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
    data['osa1'] = 'Reactin perusteet'
    data['osa2'] = 'Tiedonvälitys propseilla'
    data['osa3'] = 'Komponenttien tila'
    data[1] = 10
    data[2] = 7
    data[3] = 14

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa={data['osa1']} tehtavia={data[1]} />
            <Sisalto osa={data['osa2']} tehtavia={data[2]} />
            <Sisalto osa={data['osa3']} tehtavia={data[3]} />
            <Yhteensa count={data[1] + data[2] + data[3]} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
