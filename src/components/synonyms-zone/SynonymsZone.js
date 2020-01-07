import React, { useContext, useEffect, useState } from "react";
import "./SynonymsZone.css";
import { Context, connectToContext } from "../context/context";

const SynonymsZone = React.memo( ({ word, setSynonym }) => {
    const [words, setWords] = useState([]);
    const [fail, setFail] = useState("");
    const UNABLE_TO_RETRIEVE_SYNONYMS_FOR_WORD_MSG =
        "Synonyms for selected word could not be found :(\n" +
        "Please select another word.\n" +
        "Also, please make sure you do not have whitespaces in your selection.\n";
    const FAILED_REQUEST_MSG =
        "Unable to retrieve synonym for selected word at this time :(\n" +
        "Please try again later.";

    const _resetState = () => {
        setFail("");
        setWords([]);
    };

    useEffect(()=> {
        async function load(word) {
            await _getSynonyms(word);
        }

        _resetState();
        if (word) load(word);
    }, [word]);

    const _getSynonyms = async (word) => {
        await fetch(`https://api.datamuse.com/words?max=10&ml=${word}`,
            {headers: {'Accept': "application/json", "Content-Type": "application/json"}})
            .then(resp => resp.json())
            .then(words => {
                if (Array.isArray(words) && words.length) setWords(words.map(w => w.word));
                else setFail(UNABLE_TO_RETRIEVE_SYNONYMS_FOR_WORD_MSG);
            })
            .catch(e => {
                console.log(e);
                setFail(FAILED_REQUEST_MSG);
            });
    };

    return (
        <div id="synonyms">
            { fail && <p>{fail}</p> }
            { (!fail && words.length === 0) && <p>Please select the word for search for synonyms.</p> }
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
