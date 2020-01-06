import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import "./FileZone.css";
import {Context} from "../context";

export default function FileZone(props) {

    const [selected, setSelected] = useState("");

    const {state, dispatch} = useContext(Context);

    const textarea = useRef(null);
    const setTextarea = useCallback(node => {textarea.current = node}, []);

    useEffect(() => {
        if (state.synonym) {
            let regexp = new RegExp(`\\b(${selected})\\b`);
            textarea.current.innerHTML =
                textarea.current.innerHTML.toString().replace(regexp, state.synonym);

            dispatch({type: "SELECT_WORD", data: ""});
            dispatch({type: "SELECT_SYNONYM", data: ""});
        }
    });

    const _onSelectWord = () => {
        const selected = window.getSelection().toString();
        if (selected && selected.split(" ").length === 1) {
            setSelected(selected);
            dispatch({type: "SELECT_WORD", data: selected})
        }
    };

    return (
        <div id="file" ref={textarea} contentEditable={true} onSelect={_onSelectWord}/>
    );
}
