import React, { useCallback, useState } from "react";
import Header from "../Header/Header";
import ResultsContainer from "../results/ResultsContainer";
import SearchBox from "../SearchBox/SearchBox";
import './App.css';

const name = require('@rstacruz/startup-name-generator');


const App = () => {
    const [headerText] = useState("Name It");
    const [headerExpanded, setHeaderExpanded] = useState(true);
    const [suggestedNames, setSuggestedNames] = useState([]);

    const handleInputChange = (inputText) => {
        console.log(inputText);
        setHeaderExpanded(!inputText);
        setTimeout(() => {
            setSuggestedNames(inputText ? name(inputText) : []);
        }, 2000);
    }
    const debounce = (func) => {
        let timer = null;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        }
    }
    const optimizedFn = useCallback(debounce(handleInputChange), []);
    return (
        <div>
            <Header
                headTitle={headerText}
                headerExpanded={headerExpanded}
            />
            <SearchBox onInputChange={optimizedFn} />
            <ResultsContainer suggestedNames={suggestedNames} />
        </div>
    )
}

/** class App extends React.Component{
    state = {
        headerText: "Name It!",
        headerExpanded: true,
        suggestedNames: []

    };
    handleInputChange = (inputText) => {
        this.setState({ headerExpanded: !inputText, suggestedNames: inputText ? name(inputText) : [] });
    }
    render() {
        return (
            <div>
                <Header
                    headTitle={this.state.headerText}
                    headerExpanded={this.state.headerExpanded}
                />
                <SearchBox onInputChange={this.handleInputChange} />
                <ResultsContainer suggestedNames={this.state.suggestedNames} />
            </div>
        )
    }
}
*/
export default App;