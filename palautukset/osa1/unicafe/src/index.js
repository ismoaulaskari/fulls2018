import React from 'react';
import ReactDOM from 'react-dom';
const intro = "Arvostele Unicafe"
const tulos = "Tulokset"
const stats = "Statistiikka"

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            summa: 0
        }
    }

    klik = (kohde) => {
        return () => {
            this.setState({
                [kohde]: this.state[kohde] + 1,
                summa: this.state.summa + 1
            })
        }
    }

    render() {
        return (
            <div>
                <h1>{intro}</h1>
                <div>
                    <Button handleClick={this.klik("huono")} teksti="huono" />
                    <Button handleClick={this.klik("neutraali")} teksti="neutraali" />
                    <Button handleClick={this.klik("hyva")} teksti="hyva" />
                    <Statistics getState={this.state} />
                </div>
            </div>
        )
    }
}

const Statistic = ({ text, value }) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}

const Statistics = ({ getState }) => {
    const keskiarvo = () => {
        let aania = getState.summa
        return (getState.huono * -1 + getState.neutraali * 0 + getState.hyva * 1) / aania
    }
    const positiivisia = () => {
        let aania = getState.summa
        return (getState.hyva / aania) * 100 + "%"
    }

    if (getState.summa === 0)
        return (
            <div>
                <h3>{tulos}</h3>
                <table>
                    <tbody>
                        <Statistic text="huono" value={getState.huono} />
                        <Statistic text="neutraali" value={getState.neutraali} />
                        <Statistic text="hyva" value={getState.hyva} />
                    </tbody>
                </table>
                <h3>{stats}</h3>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    else
        return (
            <div>
                <h3>{tulos}</h3>
                <table>
                    <tbody>
                        <Statistic text="huono" value={getState.huono} />
                        <Statistic text="neutraali" value={getState.neutraali} />
                        <Statistic text="hyva" value={getState.hyva} />
                        <tr><td><h3>{stats}</h3></td></tr>
                        <Statistic text="Keskiarvo" value={keskiarvo()} />
                        <Statistic text="Positiivisia" value={positiivisia()} />
                    </tbody>
                </table>
            </div>
        )
}

const Button = ({ handleClick, teksti }) => (
    <button onClick={handleClick}>
        {teksti}
    </button>
)


ReactDOM.render(<App />, document.getElementById('root'));