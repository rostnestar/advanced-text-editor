import React from "react";
import "./Button.css";

export default function Button(props) {

    const _doOnClick = (e) => {
        document.execCommand(props.command, false, props.args);
    };

    return (
        <button className="format-action" type="button" onClick={_doOnClick}>
            {React.createElement(props.tag, {}, props.title)}
        </button>
    );
}