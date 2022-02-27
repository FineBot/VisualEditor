import './App.css';
import '@design-system-rt/rtk-fonts';
import {useEffect, useState} from "react";
import React, {Component} from "react";
import {Button, ThemeProvider, Typography} from "@design-system-rt/rtk-ui-kit";
import Field from './components/field'
import LeftMenu from "./components/leftMenu";
import FloatingMenu from "./components/floatingMenu"
import * as ReactDOMServer from "react-dom/server";
import exportToHtml from "./components/exportToHtml";
import TopMenu from "./components/topMenu";

var viewFloatingMenuStatus = false
var isArea = false
var theme = "light"
let positions = {}


const checkTop=function (d,ball,top){
    let screenWidth=(document.getElementById("clearArea").offsetWidth)
    let paddings=32
    if(screenWidth<400 && screenWidth>350)
        paddings=16

    return (d.clientHeight + d.offsetTop - ball.clientHeight-paddings+4 > top && top > d.offsetTop+paddings)
}
const checkLeft=function (d,ball,left){
    let screenWidth=(document.getElementById("clearArea").offsetWidth)
    let paddings=32
    if(screenWidth<400 && screenWidth>350)
        paddings=16

    return (left > d.offsetLeft+paddings && left < d.offsetLeft + d.clientWidth - ball.clientWidth-paddings+4)
}

function onDragStart(e, card) {

}

function onDragEnd(e, card, editCards, cardList, state, editState) {
    if (isArea) {
        var f = cardList.concat(React.createElement(card.element, card.initProps))
        editCards(f.map(e => {
            return e
        }))

        setTimeout(() => {
            document.getElementById((cardList.length).toString() + 'elem').style.position = "absolute"
            var k = document.getElementsByClassName("react-transform-element")[0].style.transform.match(/(\-*\d*\.*\d*px)/gm)
            var leftBuff=-Number((k[0].replace("px", "")))
            var topBuff=-Number((k[1].replace("px", "")))





            var left = (leftBuff/currentScale+Math.ceil(( + e.clientX - 250) / currentScale) - e.target.offsetWidth / 4)
            var top = (topBuff/currentScale+Math.ceil(( + e.clientY - 64) / currentScale) - e.target.offsetHeight / 2)



            var d = document.getElementById("areas")
            var ball = document.getElementById((cardList.length).toString() + 'elem')

            if(checkTop(d,ball,top) && checkLeft(d,ball,left)){

            }else{
                // alert("Нельзя добавить элемент за пределы области.")
                left=0
                top=0
            }

            document.getElementById((cardList.length).toString() + 'elem').style.left = (left + left % state.m).toString() + "px"
            document.getElementById((cardList.length).toString() + 'elem').style.top = ((top + top % state.m)).toString() + "px"

            let buff = localStorage.getItem("viewElemPromptWas")
            if(!state.viewElemPromptWas && buff==null){
                editState({viewElemPromptWas:true,viewElemPrompt:true})

                setTimeout(()=>{
                    editState({viewElemPrompt:false})
                    localStorage.setItem("viewElemPromptWas","true")

                },7000)
            }



        }, 10)
    }
}

function onDragOver(e, card, isArea1 = false) {
    isArea = isArea1
    // e.target.style.borderColor = "blue"

}

function onDragLeave(e, card) {
    // e.target.style.borderColor = "cornflowerblue"
}

var currentScale = 1
var activeElement = 0

function App() {



    window.onload = () => {

        document.getElementsByClassName("react-transform-component")[0].style.width = (window.innerWidth - 250).toString() + "px"
        document.getElementsByClassName("react-transform-component")[0].style.height = (window.innerHeight - 64).toString() + "px"
    }

    const [areaElements, editArea] = useState([])


    const [state, setState] = useState({
        w: 1920,
        h: 1080,
        m: 4,
        enable: true,
        showFloatingMenuAnimation: false,
        viewFloatingMenuStatus:false,
        theme: "light",
        viewElemPrompt:false,
        viewElemPromptWas:false,
    })







    const editState = (list) => {
        setState(prevState => {
            return {...prevState, ...list};
        });
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
                editState({showFloatingMenuAnimation: true,theme:theme,viewFloatingMenuStatus:true})
            }
        } else {
            if (viewFloatingMenuStatus) {
                console.log("hide")
                editState({showFloatingMenuAnimation: false,theme:theme,viewFloatingMenuStatus:true})
                setTimeout(() => {
                    viewFloatingMenuStatus = false
                    editState({viewFloatingMenuStatus:false,theme,showFloatingMenuAnimation:false})
                }, 250)
            }
        }

    }

    const deleteElement=()=>{
        showMenu(false)

        setTimeout(()=>{
            editState({enable: true})
            editArea(areaElements.map((f, ii) => {
                if (activeElement === ii) {
                } else {
                    return f
                }
            }))
        },250)
    }


    return (
        <ThemeProvider themeName={state.theme} id="provider">

            <TopMenu
                state={state}
                editState={editState}
                editArea={editArea}
                areaElements={areaElements}
                clearPositions={()=>positions={}}

                darkTheme={(e = true) => {
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
                    onDragEnd={(k,e,editArea,areaElements,state)=>{
                        onDragEnd(k,e,editArea,areaElements,state,editState)
                    }}
                    editArea={editArea}
                    areaElements={areaElements}
                    state={state}/>
                <Field
                    theme={state.theme}
                    positions={positions}
                    editPositions={(i,data)=>positions[i]=data}
                    onDragOver={onDragOver}
                    state={state}
                    areaElements={areaElements}
                    editState={editState}
                    checkLeft={checkLeft}
                    editArea={editArea}
                    checkTop={checkTop}
                    onDragLeave={onDragLeave}
                    currentScale={currentScale}
                    editCurrentScale={(e) => currentScale = e}
                    showMenu={showMenu}
                    editElProps={editElProps}
                    elProps={elProps}
                    setElement={(e) => activeElement = e}/>
                {state.viewFloatingMenuStatus ? (<FloatingMenu
                    theme={state.theme}
                    deleteElement={deleteElement}
                    editPositions={(data)=>{
                        positions=data
                        console.log(positions)
                    }}
                    positions={positions}
                    editStateForUpdate={function (){
                        editState({showFloatingMenuAnimation:true})
                    }}
                    show={state.showFloatingMenuAnimation} elemId={activeElement}
                    areaElements={areaElements}
                    editArea={editArea}/>) : (null)}
            </div>
        </ThemeProvider>
    );
}

export default App;
