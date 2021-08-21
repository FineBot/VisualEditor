import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import styles from './field.module.css'
import React, {useEffect} from "react";
import {Button} from "@design-system-rt/rtk-ui-kit";
import colors from "../data/colors";

var onDown = false
var viewFloatingMenuStatus = false

export default function Field(props) {

    var {state, areaElements, editState, editArea, currentScale, editCurrentScale} = props
    useEffect(() => {
        if (!onDown) {
            onDown = !onDown
            document.getElementById("FieldComponent").addEventListener("mousedown", (e) => {
                if ((e.button == 0 || e.button == 1) && viewFloatingMenuStatus) {
                    viewFloatingMenuStatus = false
                    props.showMenu(false)
                }
            })
        }
    })

    return (
        <div className={styles.parent}
             theme={props.theme}
             id={"FieldComponent"}>
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
                                {areaElements.map((e, i) => {
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
                                                    editState({enable: true})
                                                    editArea(areaElements.map((f, ii) => {
                                                        if (i === ii) {
                                                            document.removeEventListener('mousemove', onMouseMove);
                                                            ball.onmouseup = null;
                                                        } else {
                                                            return f
                                                        }
                                                    }))
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
                                                    if (!viewFloatingMenuStatus) {
                                                        props.setElement(i)
                                                        props.showMenu(true)
                                                        viewFloatingMenuStatus = true
                                                    }
                                                    // alert("openMenu")
                                                    return false
                                                }

                                                ball.style.position = 'absolute';
                                                ball.style.zIndex = 1000;

                                                var currentLeft = Number(ball.style.left.replace("px", ""))
                                                var currentTop = Number(ball.style.top.replace("px", ""))


                                                function moveAt(pageX, pageY) {
                                                    var d = document.getElementById("areas")

                                                    let top = currentTop + (pageY - currentY) * (1 / currentScale)
                                                    let left = currentLeft + (pageX - currentX) * (1 / currentScale)

                                                    if (d.clientHeight + d.offsetTop - ball.clientHeight > top && top > d.offsetTop) {
                                                        ball.style.top = top - top % 4 + 'px';
                                                    }
                                                    if (left > d.offsetLeft && left < d.offsetLeft + d.clientWidth - ball.clientWidth) {
                                                        ball.style.left = left - left % 4 + 'px';
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
                        </TransformComponent>
                    )
                }}
            </TransformWrapper>
        </div>
    )
}