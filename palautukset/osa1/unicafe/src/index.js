import React from 'react';
import ReactDOM from 'react-dom';
const intro = "Arvostele Unicafe"
const tulos = "Tulokset:"

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1
        })
    }

    render() {
        return (
            <div>
                <h1>{intro}</h1>
                <div>
                    <Button handleClick={this.klikHuono} text="huono" />
                    <Button handleClick={this.klikNeutraali} text="neutraali" />
                    <Button handleClick={this.klikHyva} text="hyva" />
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
        let aania = getState.huono + getState.neutraali + getState.hyva
        return (getState.huono * -1 + getState.neutraali * 0 + getState.hyva * 1) / aania
    }
    const positiivisia = () => {
        let aania = getState.huono + getState.neutraali + getState.hyva
        return (getState.hyva / aania) * 100
    }
    return (
        <div>
            <h3>{tulos}</h3>
            <Statistic text="huono" value={getState.huono} />
            <Statistic text="neutraali" value={getState.neutraali} />
            <Statistic text="hyva" value={getState.hyva} />
            <div>
                <Statistic text="Keskiarvo" value={keskiarvo()} />
            </div>
            <div>
                <Statistic text="Positiivisia" value={positiivisia()} />%
            </div>
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


ReactDOM.render(<App />, document.getElementById('root'));