import React, {useReducer} from "react";
import {Context, reducer, initialState} from "./context";

export default function ContextProvider(props) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const context = {
        word: state.word,
        synonym: state.synonym,
        setWord: word => dispatch({ type: "SELECT_WORD", data: word }),
        setSynonym: synonym => dispatch({ type: "SELECT_SYNONYM", data: synonym }),
        resetContext: () => dispatch({ type: "RESET_CONTEXT" })
    };

    return (
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    );
}