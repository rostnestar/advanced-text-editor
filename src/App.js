import React from "react";
import "./App.css";
import ControlPanel from "./components/control-panel/ControlPanel";
import FileZone from "./components/file-zone/FileZone";
import SynonymsZone from "./components/synonyms-zone/SynonymsZone";
import ContextProvider from "./components/context/ContextProvider";

export default function App(props) {
    return (
        <div className="App">
            <header>
                <span>Advanced Text Editor</span>
            </header>
            <main>
                <ContextProvider>
                    <ControlPanel/>
                    <div className="working-area">
                        <FileZone/>
                        <div><h4>Synonyms:</h4></div>
                        <SynonymsZone/>
                    </div>
                </ContextProvider>
            </main>
        </div>
    );
}
