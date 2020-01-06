import React, { useContext, useEffect, useState } from "react";
import "./SynonymsZone.css";
import { Context, connectToContext } from "../context/context";

const SynonymsZone = React.memo( ({ word, setSynonym }) => {
    const [words, setWords] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=> {
        async function load(word) {
            await _getSynonyms(word);
        }
        if (word) load(word); else setWords([]);
    }, [word]);

    const _getSynonyms = async (word) => {
        await fetch(`https://api.datamuse.com/words?max=10&ml=${word}`,
            {headers: {'Accept': "application/json", "Content-Type": "application/json"}})
            .then(resp => resp.json())
            .then(words => setWords(words.map(w => w.word)))
            .catch(e => {
                console.log(e);
                setError(e.toString());
            });
    };

    return (
        <div id="synonyms">
            { error && <p>Unable to retrieve synonyms for selected word. Please try again later.
                (Please check failure details in console logs).</p>}
            { (words.length === 0) && <p>Please select the word for search for synonyms.</p>}
            { words && words.map((synonym, index) =>
                <button id="synonym" key={index} onClick={() => setSynonym(synonym)}>{synonym}</button>) }
        </div>
    );
});

const Select = () => {
    const { word, setSynonym } = useContext(Context);

    return {
        word: word,
        setSynonym: setSynonym
    }
};

export default connectToContext(SynonymsZone, Select)
