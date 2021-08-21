import styles from './floatingMenu.module.css'
import React, {useEffect, useState} from "react";
import {dataConst} from '../data/props'
import $ from 'jquery'
import {
    Button,
    InputAmount,
    InputText,
    RadioButton,
    RadioGroup, Select,
    ThemeProvider,
    Typography
} from "@design-system-rt/rtk-ui-kit";
import {elements} from "../data/elements";
import Input from "@design-system-rt/rtk-ui-kit/components/Input/Input";
import ArrayText from "./arrayText";
import {propsSwitch, stylesSwitch} from "./switch";

export default function Index(props) {
    const {areaElements, editArea} = props


    if (areaElements[props.elemId] == undefined)
        return null

    var element = areaElements[props.elemId].props.initName


    var keys = []
    var data = dataConst()
    for (let key in data[element].props) {
        keys.push(key)
    }
    var keysStyle = []
    for (let key in data[element].style) {
        keysStyle.push(key)
    }

    return (
        <ThemeProvider themeName={"dark"}>
            <div className={styles.parent} style={{height: window.innerHeight - 64}}>
                <div

                    hide={(!props.show).toString()} className={styles.children}>

                    <div style={{display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "5px"}}
                         onClick={() => {
                             var buff = props.positions
                             for (var i in buff){
                                if(i.toString()=== props.elemId.toString()){
                                    buff[i]={x:-20,y:-20,x1:-20,y1:-20}
                                }
                             }
                             props.editPositions(buff)
                             props.deleteElement()
                         }}>
                        <div className={styles.button}>Удалить элемент</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{
                            width: "280px",
                            height: "2px",
                            backgroundColor: "gray",
                            borderRadius: "10px",
                            marginTop: "5px"

                        }}></div>
                    </div>
                    <div style={{backgroundColor: "#3D4555"
                    }}>
                        {keys.map((e, i) => {
                            return(propsSwitch(e,element,data,areaElements,props.elemId,i,editArea,props.editStateForUpdate))
                        })}
                    </div>
                    <div style={{height: "10px",backgroundColor: "#3D4555"}}/>
                    <div style={{backgroundColor: "#3D4555"}}>
                    {keysStyle.map((e, i) => {
                        return(stylesSwitch(e,element,data,areaElements,props.elemId,i,editArea,props.editStateForUpdate))
                    })}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}