import React from 'react';

const initialState = {
    word: "",
    synonym: ""
};

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "SELECT_WORD":
            return Object.assign({}, state, { word: action.data });
        case "SELECT_SYNONYM":
            return Object.assign({}, state, { synonym: action.data });
        case "RESET_CONTEXT":
        default:
            return initialState;
    }
};

const connectToContext = (WrappedComponent, select) => {
    return (props) => {
        const selectors = select();
        return <WrappedComponent {...selectors} {...props}/>
    }
};

export { Context, initialState, reducer, connectToContext }