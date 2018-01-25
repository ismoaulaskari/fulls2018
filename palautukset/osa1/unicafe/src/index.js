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
        const keskiarvo = () => {
            let aania = this.state.huono + this.state.neutraali + this.state.hyva
            return (this.state.huono * -1 + this.state.neutraali * 0 + this.state.hyva * 1) / aania
        }
        const positiivisia = () => {
            let aania = this.state.huono + this.state.neutraali + this.state.hyva
            return (this.state.hyva / aania)
        }        
        return (
            <div>
                <h1>{intro}</h1>
                <div>
                    <button onClick={this.klikHuono}>huono</button>
                    <button onClick={this.klikNeutraali}>neutraali</button>
                    <button onClick={this.klikHyva}>hyva</button>
                    <br />
                    <h3>{tulos}</h3>
                    <br />Huono {this.state.huono}
                    <br />Neutraali {this.state.neutraali}
                    <br />hyva {this.state.hyva}
                    <br/>
                    <div>
                    <h3>Keskiarvo</h3>
                    {keskiarvo()}
                    </div>
                    <div>
                    <h3>Positiivisia</h3>
                    {positiivisia()}%
                    </div>                    
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));