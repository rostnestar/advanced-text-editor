import React from 'react';

const Context = React.createContext();

const initialState = {
    word: "",
    synonym: ""
};

function reducer(state, action) {
    switch (action.type) {
        case "SELECT_WORD":
            return Object.assign({}, state, { word: action.data });
        case "SELECT_SYNONYM":
            return Object.assign({}, state, { synonym: action.data });
        default:
            return initialState;
    }
}

export { Context, reducer, initialState }