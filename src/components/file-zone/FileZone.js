import React, { useContext, useEffect, useRef, useCallback } from "react";
import "./FileZone.css";
import { Context, connectToContext } from "../context/context";

const FileZone = React.memo( ({ synonym, setWord, resetContext }) => {

    const textarea = useRef(null);
    const setTextareaRef = useCallback(node => {textarea.current = node}, []);

    useEffect(() => {
        const selection = window.getSelection();
        if (synonym && selection.toString()) {
            _replaceSelectedWordWithSynonym(selection, synonym);

            resetContext();
        }
    }, [synonym]);

    const _replaceSelectedWordWithSynonym = (selection, synonym) => {
        let replacement = _capitalize(selection.toString(), synonym);
        let range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacement));
    };

    const _capitalize = (selection, synonym) => {
        return selection.charAt(0) === selection.charAt(0).toUpperCase()
            ? synonym.charAt(0).toUpperCase() + synonym.slice(1)
            : synonym
    };

    const _onSelectWord = () => {
        const selectedWord = window.getSelection().toString();
        if (selectedWord && selectedWord.split(" ").length === 1) {
            setWord(selectedWord);
        }
    };

    return (
        <div id="file" ref={textarea} contentEditable={true} onSelect={_onSelectWord}/>
    );
});

const Select = () => {
    const { synonym, setWord, resetContext } = useContext(Context);

    return {
        synonym: synonym,
        setWord: setWord,
        resetContext: resetContext
    }
};

export default connectToContext(FileZone, Select)
