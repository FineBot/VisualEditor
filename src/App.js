import './App.css';
import {useEffect, useState} from "react";
import React, {Component} from "react";
import {Button, ThemeProvider} from "@design-system-rt/rtk-ui-kit";
import Field from './components/field'
import LeftMenu from "./components/leftMenu";
import FloatingMenu from "./components/floatingMenu"
import * as ReactDOMServer from "react-dom/server";
import TopMenu from "./components/topMenu";

var viewFloatingMenuStatus = false
var isArea = false
var theme = "dark"

function onDragStart(e, card) {

}

function onDragEnd(e, card, editCards, cardList, state) {
    if (isArea) {
        var f = cardList.concat(React.createElement(card.element, card.initProps))
        editCards(f.map(e => {
            return e
        }))

        setTimeout(() => {
            document.getElementById((cardList.length).toString() + 'elem').style.position = "absolute"
            var k = document.getElementsByClassName("react-transform-element")[0].style.transform.match(/(\d*\.*\d*px)/gm)
            var left = Math.ceil((Math.abs(k[0].replace("px", "")) + e.clientX - 320) / currentScale - e.target.offsetWidth / 4)
            var top = Math.ceil((Math.abs(k[1].replace("px", "")) + e.clientY - 50) / currentScale - e.target.offsetHeight / 2)
            document.getElementById((cardList.length).toString() + 'elem').style.left = (left + left % state.m).toString() + "px"
            document.getElementById((cardList.length).toString() + 'elem').style.top = ((top + top % state.m)).toString() + "px"

        }, 10)
    }
}

function onDragOver(e, card, isArea1 = false) {
    isArea = isArea1
    e.target.style.borderColor = "blue"
}

function onDragLeave(e, card) {
    e.target.style.borderColor = "cornflowerblue"
}

var currentScale = 1
var activeElement = 0

function App() {

    window.onload = () => {
        document.getElementsByClassName("react-transform-component")[0].style.width = (window.innerWidth - 330).toString() + "px"
        document.getElementsByClassName("react-transform-component")[0].style.height = (window.innerHeight - 50).toString() + "px"

    }

    const [areaElements, editArea] = useState([])


    const [state, setState] = useState({
        w: 3000,
        h: 3000,
        m: 4,
        enable: true,
        showFloatingMenuAnimation: false,
        theme: "light"
    })

    const editState = (list) => {
        setState({...state, ...list})
    }

    const [elProps, setElProps] = useState({})

    const editElProps = (list) => {
        setState({...state, ...list})
    }

    const showMenu = (show) => {
        if (show) {
            if (!viewFloatingMenuStatus) {
                viewFloatingMenuStatus = true
                console.log("show")
                editState({showFloatingMenuAnimation: true})
            }
        } else {
            if (viewFloatingMenuStatus) {
                console.log("hide")
                editState({showFloatingMenuAnimation: false,theme})
                setTimeout(() => {
                    viewFloatingMenuStatus = false
                }, 250)
            }
        }

    }

    return (
        <ThemeProvider themeName={state.theme} id="provider">
            <TopMenu darkTheme={(e = true) => {
                if (e) {
                    editState({theme: "dark"})
                    theme = "dark"
                } else {
                    editState({theme: "light"})
                    theme = "light"

                }

            }}/>
            <div style={{display: "flex"}}>
                <LeftMenu
                    theme={state.theme}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    editArea={editArea}
                    areaElements={areaElements}
                    state={state}/>
                <Field
                    theme={state.theme}

                    onDragOver={onDragOver}
                    state={state}
                    areaElements={areaElements}
                    editState={editState}
                    editArea={editArea}
                    onDragLeave={onDragLeave}
                    currentScale={currentScale}
                    editCurrentScale={(e) => currentScale = e}
                    showMenu={showMenu}
                    editElProps={editElProps}
                    elProps={elProps}
                    setElement={(e) => activeElement = e}/>
                {viewFloatingMenuStatus ? (<FloatingMenu
                    theme={state.theme}

                    show={state.showFloatingMenuAnimation} elemId={activeElement}
                    areaElements={areaElements}
                    editArea={editArea}/>) : (null)}
            </div>
        </ThemeProvider>
    );
}

export default App;
