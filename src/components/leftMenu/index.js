import {elements} from "../data/elements";
import styles from './leftMenu.module.css'
import React from "react";
import colors from "../data/colors";
import Group from "./group";
import { Button} from "@design-system-rt/rtk-ui-kit";

export default function LeftMenu(props) {
    var {onDragOver, onDragLeave, onDragStart, onDragEnd, editArea, areaElements, state} = props

    var groups=[]
    for (var i in elements){
        groups.push(i)
    }


    return (
        <div draggable={true} className={styles.parent} style={{backgroundColor:"#3D4555",height:window.innerHeight-64}}>
            {groups.map((e,idGroup) => {

                return (
                    <div
                        className={styles.element}
                        draggable={false}

                    >
                        <Group name={e}
                               idGroup={idGroup}
                               editArea={editArea}
                               areaElements={areaElements}
                               state={state}
                               onDragStarte={props.onDragStart}
                               onDragEnde={props.onDragEnd}

                        />

                    </div>
                )
            })}
        </div>
    )
}