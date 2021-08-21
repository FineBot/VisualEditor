import styles from './floatingMenu.module.css'
import React, {useEffect, useState} from "react";
import dataFunc from '../data/props'
import {Button} from "@design-system-rt/rtk-ui-kit";
import {elements} from "../data/elements";

export default function Index(props){
    const {areaElements,editArea} = props

    var element=areaElements[props.elemId].props.initName
    var keys=[]
    var data=dataFunc()
    for (let key in data[element]){
        keys.push(key)
    }

    return(
        <div className={styles.parent} style={{height:window.innerHeight-50}}>
            <div
                hide={(!props.show).toString()} className={styles.children}>
                {keys.map((e,i)=>{

                    return (
                        <div style={{padding:"5px"}}>
                            <b style={{fontSize:"20px"}}>{e}</b>
                            <div style={{paddingLeft:"15px"}}>{data[element][e].map((i)=>{
                                return(<div><p><input name="dzen" type="radio" value={i} title={i} onClick={()=>{
                                    var buff = areaElements
                                    var b=Object.assign({},buff[props.elemId].props)
                                    b[e]=i
                                    buff[props.elemId]=React.createElement(elements[buff[props.elemId].props.propsNumber].element, b)
                                    editArea(buff.map(e => {
                                        return e
                                    }))
                                }}/>{i}</p></div>)
                            })}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}