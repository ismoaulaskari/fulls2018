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
                    <button onClick={this.klikHuono}>huono</button>
                    <button onClick={this.klikNeutraali}>neutraali</button>
                    <button onClick={this.klikHyva}>hyva</button>
                    <br/>       
                    <h3>{tulos}</h3>             
                    <br/>Huono {this.state.huono}
                    <br/>Neutraali {this.state.neutraali}
                    <br/>hyva {this.state.hyva}
                    
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));