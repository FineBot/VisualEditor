import {InputText, Select, TabsClassicItem, Typography} from "@design-system-rt/rtk-ui-kit";
import React, {useState} from "react";
import {icons} from '../data/props'

export default function ArrayTextForTabs(props) {
    const {areaElements, e, params, element, editArea, data, elemId} = props
    let value = JSON.parse(JSON.stringify(areaElements[elemId].props['optionProps']))

    const [content, setContent] = useState(value)


    let values = icons
    let options = []
    for (var i in values) {
        if (params.generate)
            options.push({value: <div style={{display:'flex',alignItems:"center"}}>{params['values'][i]} <div style={{paddingLeft:"10px"}}>{i}</div></div>, key: i})
        else
            options.push({value: values[i], key: values[i]})
    }


    return (
        <div style={{paddingTop: "10px"}}>

            <Typography style={{
                fontSize: "12px",
                paddingLeft: "25px"
            }}>{params['title']}</Typography>
            {content.map((x, i) => {

                return (
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "10px", alignItems: "center"}}>
                        <div style={{width:"240px",marginBottom:"5px"}}>
                            <InputText label={`Текст`} value={x.label} style={{width: "240px"}}
                                       onChange={(text) => {
                                           var buff = content
                                           buff[i].label = text.target.value
                                           setContent(buff)
                                           let buff1 = areaElements
                                           var b = Object.assign({}, buff1[props.elemId].props)
                                           b[e][i] = <TabsClassicItem style={{width:"100%"}} label={text.target.value} index={i} />
                                           buff1[props.elemId] = React.createElement(data[element].element, b)
                                           editArea(buff1.map(e => {
                                               return e
                                           }))
                                           setTimeout(() => props.editStateForUpdate())
                                       }}/>
                            <Select value={""} style={{paddingTop: "10px"}} options={options}
                                    label={"Иконка"}
                                    style={{width:"240px",marginTop:"5px"}}
                                    onChange={(text) => {

                                        var buff = content
                                        buff[i].icon = text
                                        setContent(buff)
                                        let buff1 = areaElements

                                        var b = Object.assign({}, buff1[props.elemId].props)
                                        b[e][i] = <TabsClassicItem style={{width:"100%"}} label={buff[i].label} index={i} icon={buff[i].icon}/>
                                        buff1[props.elemId] = React.createElement(data[element].element, b)
                                        editArea(buff1.map(e => {
                                            return e
                                        }))
                                        setTimeout(() => props.editStateForUpdate())
                                    }}
                            />

                        </div>

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
                                 b[e].splice(i,1)
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
                         buff.push({label: "", icon: null})
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