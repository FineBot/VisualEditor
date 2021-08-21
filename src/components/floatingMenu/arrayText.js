import {InputText, Typography} from "@design-system-rt/rtk-ui-kit";
import React, {useState} from "react";


export default function ArrayText(props) {
    const {areaElements, e, params, element, editArea, data} = props
    let k = JSON.parse(JSON.stringify(areaElements[props.elemId].props[e]))
    const [content, setContent] = useState(k)

    return (
        <div style={{paddingTop: "10px"}}>

            <Typography style={{
                fontSize: "12px",
                paddingLeft: "25px"
            }}>{params['title']}</Typography>
            {content.map((x, i) => {

                return (
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "10px", alignItems: "center"}}>
                        <InputText label={`Параметр ${i + 1}`} value={x.value} style={{width: "240px"}}
                                   onChange={(text) => {
                                       var buff = content
                                       buff[i] = {value: text.target.value, key: i}
                                       setContent(content)

                                       buff = areaElements
                                       var b = Object.assign({}, buff[props.elemId].props)
                                       b[e] = content
                                       buff[props.elemId] = React.createElement(data[element].element, b)
                                       editArea(buff.map(e => {
                                           return e
                                       }))
                                       setTimeout(() => props.editStateForUpdate())
                                   }}/>
                        <div style={{
                            fontSize: "20px",
                            color: "black",
                            backgroundColor: "#D3D4DB",
                            borderRadius: "15px",
                            height: "20px",
                            width: "20px",
                            marginLeft: "10px",
                            cursor: "pointer"
                        }}
                             onClick={() => {
                                 var buff = content
                                 buff.splice(i, 1)
                                 setContent(buff)

                                 buff = areaElements
                                 var b = Object.assign({}, buff[props.elemId].props)
                                 b[e] = content
                                 buff[props.elemId] = React.createElement(data[element].element, b)
                                 editArea(buff.map(e => {
                                     return e
                                 }))

                                 setTimeout(() => props.editStateForUpdate())
                             }}

                        >
                            <div style={{marginTop: "-9px", marginLeft: "4.5px", fontSize: "25px"}}>
                                -
                            </div>
                        </div>

                    </div>
                )
            })}
            <div style={{width: "320px", display: "flex", justifyContent: "center", marginTop: "10px"}}>
                <div style={{
                    fontSize: "20px",
                    color: "black",
                    backgroundColor: "#D3D4DB",
                    borderRadius: "15px",
                    height: "20px",
                    width: "20px",
                    marginLeft: "10px",
                    cursor: "pointer"
                }}
                     onClick={() => {
                         var buff = content
                         buff.push({value: "", key: ""})
                         setContent(buff)
                         setTimeout(() => props.editStateForUpdate())
                     }}

                >
                    <div style={{marginTop: "-6.25px", marginLeft: "3px"}}>
                        +
                    </div>
                </div>
            </div>
        </div>
    )
}