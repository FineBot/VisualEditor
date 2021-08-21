import styles from './leftMenu.module.css'
import React, {useState} from "react";
import {elements} from "../data/elements";
import {ThemeProvider, Typography} from "@design-system-rt/rtk-ui-kit";

export default function Group(props) {
    var {onDragStarte, onDragEnde, editArea, areaElements, state} = props




    var objects = []
    for (var i in elements[props.name]) {
        objects.push(i)
    }
    return (
        <div style={{backgroundColor: "#3D4555"}}>


            <div className={styles.group}>
               <ThemeProvider themeName={"dark"}>
                   <Typography variant={"h3"} className={styles.groupText}>
                       {props.name}
                   </Typography>
               </ThemeProvider>

            </div>
            <div>
                {objects.map((obj,idObj) => {
                    var e = elements[props.name][obj]

                    return (

                        <div>
                            <div
                                id={`elem${idObj}in${props.idGroup}`}
                                style={{
                                    display:"none",
                                position: "absolute",
                                left: "330px",
                                zIndex: 999999,
                                backgroundColor: "#3D4555",
                                padding: "8px",
                                borderRadius: "8px"
                            }}>
                                <ThemeProvider themeName={'dark'}>
                                    {React.createElement(e.element, e.initProps)}
                                </ThemeProvider>
                            </div>
                            <Typography style={{
                                paddingBottom: "10px",
                                paddingLeft: "60px",
                                color: "#D3D4DB",
                                cursor: "pointer"
                            }}
                                        onMouseEnter={()=>{
                                            document.getElementById(`elem${idObj}in${props.idGroup}`).style.display="block"
                                        }}
                                        onMouseLeave={()=>{
                                            document.getElementById(`elem${idObj}in${props.idGroup}`).style.display="none"

                                        }}
                                        draggable={true}
                                        onDragStart={(k) => onDragStarte(k, e)}
                                        onDragEnd={(k) => onDragEnde(k, e, editArea, areaElements, state)}

                            >
                                {obj}
                            </Typography>
                        </div>
                    )
                })}
            </div>
           
        </div>
    )
}