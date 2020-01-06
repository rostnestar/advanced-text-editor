import React from "react";
import "./ControlPanel.css";
import "./formatting-button/Button";
import Button from "./formatting-button/Button";

export default function ControlPanel() {
    return (
        <div id="control-panel">
            <div id="format-actions">
                <Button className="format-action" title="B" tag="b" command="bold"/>
                <Button className="format-action" title="I" tag="i" command="italic"/>
                <Button className="format-action" title="U" tag="u" command="underline"/>
            </div>
        </div>
    );
}
