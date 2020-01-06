import React, { useContext, useEffect, useState } from "react";
import "./SynonymsZone.css";
import {Context} from "../context";

export default function SynonymsZone(props) {
    const [words, setWords] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => { if (props.word) _getSynonyms(props.word) });

    const {appState, dispatch} = useContext(Context);

    const _getSynonyms = (word) => {
        return fetch(`https://api.datamuse.com/words?max=10&ml=${word}`,
            {headers: {'Accept': "application/json", "Content-Type": "application/json"}})
            .then(resp => resp.json())
            .then(words => setWords(words.map(w => w.word)))
            .catch(e => {
                console.log(e);
                setError(e.toString());
            });
    };

    const _selectSynonym = (synonym) => {
        dispatch({type: "SELECT_SYNONYM", data: synonym})
    };

    return (
        <div id="synonyms">
            {   error
                ? (<p>Unable to retrieve synonyms for selected word. Please try again later.
                    (Check the console logs for more details).</p>)
                : (words.map((synonym, index) =>
                    <button id="synonym" key={index} onClick={() => _selectSynonym(synonym)}>{synonym}</button>))
            }
        </div>
    );
}
