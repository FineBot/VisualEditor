import {elements} from "../data/elements";
import styles from './leftMenu.module.css'
import React from "react";
import colors from "../data/colors";
import {Button} from "@design-system-rt/rtk-ui-kit";

export default function LeftMenu(props) {
    var {onDragOver, onDragLeave, onDragStart, onDragEnd, editArea, areaElements, state} = props

    return (
        <div draggable={true} className={styles.parent} style={{backgroundColor:colors(props.theme).mainColor}}>

            {elements.map(e => {

                return (
                    <div
                        className={styles.element}
                        draggable={true}
                        onDragStart={(k) => onDragStart(k, e)}
                        onDragEnd={(k) => onDragEnd(k, e, editArea, areaElements, state)}
                    >
                        {React.createElement(e.element, e.initProps)}
                    </div>
                )
            })}
        </div>
    )
}