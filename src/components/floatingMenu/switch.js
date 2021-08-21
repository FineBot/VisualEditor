import {
    AddLarge,
    InputAmount,
    InputText, LinkNative, MenuKebab,
    RadioButton,
    RadioGroup,
    Select,
    Typography
} from "@design-system-rt/rtk-ui-kit";
import React from "react";
import ArrayText from "./arrayText";
import ArrayTextForTabs from "./arrayTextForTabs";

function lcFirst(str) {
    if (!str) return str;

    return str[0].toLowerCase() + str.slice(1);
}

export function propsSwitch(e, element, data, areaElements, elemId, i, editArea, editStateForUpdate) {
    let params = data[element]['props'][e]
    switch (params['type']) {

        case 'tabsConstructor':

            return (
                <ArrayTextForTabs element={element} data={data} editArea={editArea}
                           editStateForUpdate={editStateForUpdate} params={params}
                           areaElements={areaElements} e={e} elemId={elemId}/>
            )
            break;

        case 'select':


            var value = areaElements[elemId].props[e]
            if (value != undefined)
                if (value.type != undefined) {
                    value = lcFirst(value.type.displayName)
                }

            let values = params['values']
            let options = []
            for (i in values) {
                if (params.generate)
                    options.push({value: <div style={{display:'flex',alignItems:"center"}}>{params['values'][i]} <div style={{paddingLeft:"10px"}}>{i}</div></div>, key: i})
                else
                    options.push({value: values[i], key: values[i]})
            }


            if (value === undefined) {
                switch (e) {
                    case 'color':
                        value = "primary2"
                        break;
                    case 'size':
                        value = "medium"
                        break;
                    case 'icon':
                        value = 'menukebab'
                        break;
                    case 'shape':
                        value = "rounded"
                        break;
                    default:
                        value = ""
                        break
                }
            }
            if(params.generate)
                value=JSON.stringify(value)

            return (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Select value={(value)} style={{paddingTop: "10px"}} options={options}
                            label={params['title']}
                            onChange={(text) => {
                                let buff = areaElements
                                let b = Object.assign({}, buff[elemId].props)

                                if (params.generate) {
                                    b[e] = params['values'][lcFirst(text.toString().replaceAll(" ", ""))]
                                } else {
                                    b[e] = text.toString().replaceAll(" ", "")
                                }

                                buff[elemId] = React.createElement(data[element].element, b)
                                editArea(buff.map(e => {
                                    return e
                                }))
                            }}
                    />
                </div>
            )
            break;

        case 'amount':
            return (
                <div style={{paddingTop: "10px", display: "flex", justifyContent: "center"}}>
                    <InputAmount value={areaElements[elemId].props[e]}
                                 label={params['title']} onChange={(text) => {
                        var buff = areaElements
                        var b = Object.assign({}, buff[elemId].props)
                        b[e] = text.target.value.toString().replaceAll(" ", "")
                        buff[elemId] = React.createElement(data[element].element, b)
                        editArea(buff.map(e => {
                            return e
                        }))
                    }}/>
                </div>
            )
            break;
        case 'text':
            return (
                <div style={{paddingTop: "10px", display: "flex", justifyContent: "center"}}>
                    <InputText value={areaElements[elemId].props[e]}
                               label={params['title']} onChange={(text) => {
                        var buff = areaElements
                        var b = Object.assign({}, buff[elemId].props)
                        b[e] = text.target.value
                        buff[elemId] = React.createElement(data[element].element, b)
                        editArea(buff.map(e => {
                            return e
                        }))
                    }}/>
                </div>
            )
            break;
        case 'picker':

            value = areaElements[elemId].props[e]
            if (value != undefined)
                if (value.type != undefined) {
                    value = lcFirst(value.type.displayName)
                }

            if (value === undefined) {
                switch (e) {
                    case 'color': case 'accentColor':
                        value = "primary2"
                        break;
                    case 'size':
                        value = "medium"
                        break;
                    case 'icon':
                        value = 'menukebab'
                        break;
                    case 'shape':
                        value = "rounded"
                        break;
                    default:
                        value = ""
                        break
                }
            }
            let mapValues = []
            for (let i in params.values) {
                if (params.generate)
                    mapValues.push(lcFirst(i))
                else
                    mapValues.push(params.values[i])
            }


            return (
                <div style={{paddingTop: "10px", paddingLeft: "25px", backgroundColor: "#3D4555"}}>
                    <Typography variant={"h3"} style={{

                        paddingBottom: "15px"
                    }}>{params['title']}</Typography>
                    <RadioGroup style={{
                        paddingLeft: "15px",
                    }}
                                name={e.toString() + elemId.toString()} value={value}
                                key={value}
                                onChange={(x) => {

                                    var buff = areaElements
                                    var b = Object.assign({}, buff[elemId].props)

                                    if (params.generate) {
                                        b[e] = params['values'][x]
                                    } else {
                                        b[e] = x
                                    }

                                    buff[elemId] = React.createElement(data[element].element, b)
                                    editArea(buff.map(e => {
                                        return e
                                    }))
                                }}
                    >
                        {mapValues.map((x) => {
                            var color = "primary2"
                            switch (e) {
                                case 'color':
                                    color = x
                                    break;

                            }
                            if (params.generate) {
                                return (<RadioButton name={e.toString() + elemId.toString()}
                                                     key={x} color={color} value={x}>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        {params['values'][x]}
                                        <div style={{marginLeft: "5px"}}>{x}</div>
                                    </div>
                                </RadioButton>)
                            } else
                                return (<RadioButton name={e.toString() + elemId.toString()}
                                                     key={x} color={color} value={x}>{x}</RadioButton>)
                        })}
                    </RadioGroup>
                </div>
            )

            break;
        case 'arrayText':


            return (
                <ArrayText element={element} data={data} editArea={editArea}
                           editStateForUpdate={editStateForUpdate} params={params}
                           areaElements={areaElements} e={e} elemId={elemId}/>
            )
            break;
    }
}

export function stylesSwitch(e, element, data, areaElements, elemId, i, editArea, editStateForUpdate) {
    var params = data[element]['style'][e]
    switch (params['type']) {

        case 'select':
            let values = params['values']
            let options = []
            for (i in values) {
                options.push({value: values[i], key: values[i]})
            }

            val = ""
            styles = areaElements[elemId].props.style
            if (styles != undefined) {
                if (e in styles)
                    val = styles[e].replace("px", "")
            }


            return (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Select value={val} style={{paddingTop: "10px"}} options={options}
                            label={params['title']}
                            onChange={(text) => {
                                let buff = areaElements
                                let b = Object.assign({}, buff[elemId].props)

                                var st = b.style
                                if (st == undefined) {
                                    st = {}
                                    st[e] = text.toString().replaceAll(" ", "") + 'px'
                                } else {

                                    st[e] = text.toString().replaceAll(" ", "") + 'px'

                                }

                                b.style = st

                                buff[elemId] = React.createElement(data[element].element, b)
                                editArea(buff.map(e => {
                                    return e
                                }))
                            }}
                    />
                </div>
            )
            break;

        case 'amount':
            var val = ""
            var styles = areaElements[elemId].props.style
            if (styles != undefined) {
                if (e in styles)
                    val = styles[e].replace("px", "")
            }

            return (
                <div style={{paddingTop: "10px", display: "flex", justifyContent: "center"}}>
                    <InputAmount value={val}
                                 label={params['title']} onChange={(text) => {
                        var buff = areaElements
                        var b = Object.assign({}, buff[elemId].props)

                        var st = b.style
                        if (st == undefined) {
                            st = {}
                            st[e] = text.toString().replaceAll(" ", "") + 'px'
                        } else {

                            st[e] = text.target.value.toString().replaceAll(" ", "") + 'px'

                        }

                        b.style = st

                        buff[elemId] = React.createElement(data[element].element, b)
                        editArea(buff.map(e => {
                            return e
                        }))
                    }}/>
                </div>
            )
            break;
        case 'text':
            var val = ""
            var styles = areaElements[elemId].props.style
            if (styles != undefined) {
                if (e in styles)
                    val = styles[e].replace("px", "")
            }

            return (
                <div style={{paddingTop: "10px", display: "flex", justifyContent: "center"}}>
                    <InputText value={val}
                               label={params['title']} onChange={(text) => {
                        var buff = areaElements
                        var b = Object.assign({}, buff[elemId].props)

                        var st = b.style
                        if (st == undefined) {
                            st = {}
                            st[e] = text.toString().replaceAll(" ", "")
                        } else {

                            st[e] = text.target.value.toString()

                        }

                        b.style = st

                        buff[elemId] = React.createElement(data[element].element, b)
                        editArea(buff.map(e => {
                            return e
                        }))
                    }}/>
                </div>
            )
            break;
        case 'picker':

            let value = undefined
            try{
                value=areaElements[elemId].props.style[e]
            }catch (e){}


            if (value == undefined) {
                switch (e) {
                    case 'color':
                        value = "primary2"
                        break;
                    case 'size':
                        value = "medium"
                        break;
                }
            }
            return (
                <div style={{paddingTop: "10px", paddingLeft: "25px"}}>
                    <Typography
                        variant={"h3"}
                        style={{

                        paddingBottom: "15px"
                    }}>{params['title']}</Typography>
                    <RadioGroup style={{paddingLeft: "15px"}}
                                name={e.toString() + elemId.toString()} value={value}
                                onChange={(x) => {
                                    var buff = areaElements
                                    var b = Object.assign({}, buff[elemId].props)

                                    var st = b.style
                                    if (st == undefined) {
                                        st = {}
                                        st[e] = x.toString().replaceAll(" ", "")
                                    } else {
                                        st[e] = x.toString()
                                    }
                                    b.style = st
                                    buff[elemId] = React.createElement(data[element].element, b)
                                    editArea(buff.map(e => {
                                        return e
                                    }))
                                }}
                    >
                        {params.values.map((x) => {
                            var color = "primary2"
                            switch (e) {
                                case 'color':
                                    color = x
                                    break;

                            }
                            return <RadioButton color={color} value={x}>{x}</RadioButton>
                        })}
                    </RadioGroup>
                </div>
            )

            break;

    }
}