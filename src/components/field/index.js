import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import styles from './field.module.css'
import React, {useEffect} from "react";
import {Button, ThemeProvider, Typography} from "@design-system-rt/rtk-ui-kit";
import colors from "../data/colors";
import {checkIndent} from "../checkPosition";

var onDown = false

export default function Field(props) {

    var {state, areaElements, editState, editArea, currentScale, editCurrentScale, positions, editPositions} = props
    useEffect(() => {
        if (!onDown) {
            onDown = !onDown
            document.getElementById("FieldComponent").addEventListener("mousedown", (e) => {
                if ((e.button == 0 || e.button == 1)) {
                    props.showMenu(false)
                }
            })
        }
    })

    return (
        <div className={styles.parent}
             theme={props.theme}
             id={"FieldComponent"}>
            {state.viewElemPrompt?(
                <div style={{position:"absolute",alignItems:"center",zIndex:999,height:"30px",justifyContent:"center",display:"flex",backgroundColor:"#2F9AFF"}}>
                    <ThemeProvider themeName={"dark"}>
                        <div style={{}}>
                            <Typography style={{width:window.innerWidth-320,textAlign:"center"}} variant={"h4"}>Для отображения настроек нажмите правой кнопкой мыши по элементу</Typography>
                        </div>
                    </ThemeProvider>
                </div>
            ):(null)}
            <TransformWrapper
                defaultScale={currentScale}
                wheel={{step: 7}}

                onZoomChange={(e) => {
                    editCurrentScale(e.scale)
                    currentScale = e.scale
                }}
                options={{
                    limitToWrapper: true,
                    minScale: 0.6,
                    maxScale: 10,
                    disabled: !state.enable,
                }}>
                {({setTransform}) => {
                    window.addEventListener("load", () => setTimeout(() => {
                        setTransform(0, 0, currentScale, 1)
                    }, 100))
                    return (
                        <TransformComponent>
                            <div className={styles.area}

                                 theme={props.theme}
                                 style={{width: state.w, height: state.h}}
                                 onDragOver={(k, e) => props.onDragOver(k, e, true)}
                                 onDragLeave={(k, e) => props.onDragLeave(k, e)}
                                 id={"areas"}>
                                <div id={"clearArea"}
                                     style={{width: 'inherit', height: 'inherit'}}>
                                    {areaElements.map((e, i) => {
                                        if (!(i in positions)) {
                                            setTimeout(() => {
                                                var ball = document.getElementById(i + 'elem')
                                                editPositions(i, {
                                                    x: Number(ball.style.left.replace("px", "")),
                                                    y: Number(ball.style.top.replace("px", "")),
                                                    x1: Number(ball.style.left.replace("px", "")) + ball.offsetWidth,
                                                    y1: Number(ball.style.top.replace("px", "")) + ball.offsetHeight
                                                })
                                            }, 100)
                                        }

                                        return (
                                            <div
                                                id={i + 'elem'}
                                                onDragOver={null}
                                                onDragLeave={null}
                                                className={styles.childrenList}
                                                style={{position: "absolute"}}
                                                draggable={false}

                                                onMouseDown={(event) => {

                                                    var currentX = event.pageX
                                                    var currentY = event.pageY
                                                    editState({enable: false})
                                                    event.preventDefault()
                                                    var ball = document.getElementById(i + 'elem')
                                                    if (event.button == 1) {
                                                        return
                                                    } else if (event.button == 0) {

                                                        document.removeEventListener('mousemove', onMouseMove);
                                                        ball.onmouseup = null;
                                                    } else if (event.button == 2) {

                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        document.removeEventListener('mousemove', onMouseMove);
                                                        document.removeEventListener('mouseup', mouseUp);
                                                        var left = event.clientX
                                                        props.setElement(i)
                                                        props.showMenu(true)
                                                        editState({enable: true})

                                                        // alert("openMenu")
                                                        return false
                                                    }

                                                    ball.style.position = 'absolute';
                                                    ball.style.zIndex = 1000;

                                                    var currentLeft = Number(ball.style.left.replace("px", ""))
                                                    var currentTop = Number(ball.style.top.replace("px", ""))




                                                    function moveAt(pageX, pageY) {
                                                        console.log(document.getElementById("areas").offsetTop)
                                                        var d = document.getElementById("areas")

                                                        let top = currentTop + (pageY - currentY) * (1 / currentScale)
                                                        let left = currentLeft + (pageX - currentX) * (1 / currentScale)

                                                        if (props.checkTop(d, ball, top)) {

                                                            var positionsBuff = JSON.parse(JSON.stringify(positions))
                                                            positionsBuff[i].y = top - top % 4
                                                            positionsBuff[i].y1 = positionsBuff[i].y + ball.offsetHeight
                                                            let checkFunc = checkIndent(positionsBuff, i, false)
                                                            if (checkFunc[0]) {
                                                                ball.style.top = top - top % 4 + 'px';

                                                                var buff = positions[i]

                                                                buff.y = top - top % 4
                                                                buff.y1 = buff.y + ball.offsetHeight

                                                                editPositions(i, buff)
                                                                if (checkFunc[1] >= 0) {
                                                                    ball.style.top = checkFunc[1] + 'px';

                                                                    var buff = positions[i]
                                                                    buff.y = checkFunc[1]
                                                                    buff.y1 = buff.y + ball.offsetHeight
                                                                    editPositions(i, buff)
                                                                }
                                                            }
                                                        }
                                                        if (props.checkLeft(d, ball, left)) {
                                                            var positionsBuff = JSON.parse(JSON.stringify(positions))
                                                            positionsBuff[i].x = left - left % 4
                                                            positionsBuff[i].x1 = positionsBuff[i].x + ball.offsetWidth

                                                            console.log(left)
                                                            console.log("")

                                                            let checkFunc = checkIndent(positionsBuff, i)
                                                            if (checkFunc[0]) {
                                                                ball.style.left = left - left % 4 + 'px';

                                                                var buff = positions[i]

                                                                buff.x = left - left % 4
                                                                buff.x1 = buff.x + ball.offsetWidth

                                                                editPositions(i, buff)
                                                                if (checkFunc[1] >= 0) {
                                                                    ball.style.left = checkFunc[1] + 'px';

                                                                    var buff = positions[i]

                                                                    buff.x = checkFunc[1]
                                                                    buff.x1 = buff.x + ball.offsetWidth

                                                                    editPositions(i, buff)
                                                                }
                                                            }

                                                        }
                                                    }

                                                    function onMouseMove(event) {
                                                        moveAt(event.pageX, event.pageY);
                                                    }

                                                    function mouseUp(event) {
                                                        document.removeEventListener('mousemove', onMouseMove);
                                                        document.removeEventListener('mouseup', mouseUp);
                                                        editState({enable: true})

                                                    }

                                                    document.addEventListener('mousemove', onMouseMove);
                                                    document.addEventListener('mouseup', mouseUp);
                                                }}>
                                                {e}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </TransformComponent>
                    )
                }}
            </TransformWrapper>
        </div>
    )
}