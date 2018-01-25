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

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            summa: this.state.summa + 1
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            summa: this.state.summa + 1
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            summa: this.state.summa + 1
        })
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
        <p>{text} {value}</p>
    )
}

const Statistics = ({ getState }) => {
    const keskiarvo = () => {
        //let aania = getState.huono + getState.neutraali + getState.hyva
        let aania = getState.summa
        return (getState.huono * -1 + getState.neutraali * 0 + getState.hyva * 1) / aania
    }
    const positiivisia = () => {
        let aania = getState.summa
        //let aania = getState.huono + getState.neutraali + getState.hyva
        return (getState.hyva / aania) * 100
    }
    if (getState.summa === 0)
        return (
            <div>
                <h3>{tulos}</h3>
                <Statistic text="huono" value={getState.huono} />
                <Statistic text="neutraali" value={getState.neutraali} />
                <Statistic text="hyva" value={getState.hyva} />
                <h3>{stats}</h3>
                <div>
                    <p>ei yhtään palautetta annettu</p>
                </div>
            </div>
        )
    else
        return (
            <div>
                <h3>{tulos}</h3>
                <Statistic text="huono" value={getState.huono} />
                <Statistic text="neutraali" value={getState.neutraali} />
                <Statistic text="hyva" value={getState.hyva} />
                <h3>{stats}</h3>
                <div>
                    <Statistic text="Keskiarvo" value={keskiarvo()} />
                </div>
                <div>
                    <Statistic text="Positiivisia" value={positiivisia()} />%
                </div>
            </div>
        )
}

const Button = ({ handleClick, teksti }) => (
    <button onClick={handleClick}>
        {teksti}
    </button>
)


ReactDOM.render(<App />, document.getElementById('root'));