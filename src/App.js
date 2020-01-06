import React, {useReducer} from "react";
import "./App.css";
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";
import SynonymsZone from "./components/synonyms-zone/SynonymsZone";
import {Context, reducer, initialState} from "./components/context";

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <header>
                <span>Advanced Text Editor</span>
            </header>
            <main>
                <Context.Provider value={{state, dispatch}}>
                    <ControlPanel/>
                    <div className="working-area">
                        <Context.Consumer>
                            {value => <FileZone synonym={value.state.synonym}/>}
                        </Context.Consumer>
                        <div><h4>Synonyms:</h4></div>
                        <Context.Consumer>
                            {value => <SynonymsZone word={value.state.word}/>}
                        </Context.Consumer>
                    </div>
                </Context.Provider>
            </main>
        </div>
    );
}
