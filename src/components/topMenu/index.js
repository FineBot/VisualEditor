import exportToHtml, {createImgZip} from "../exportToHtml";
import {
    Button,
    Checkbox,
    Desktop,
    IconButton,
    Mobile, RatingFill,
    Select,
    Switch,
    ThemeProvider, ToastNotificationsProvider, Typography
} from "@design-system-rt/rtk-ui-kit";
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import colors from "../data/colors";
import {useState} from "react";
let mobile=false

var isDark=false

function Toasts(props) {
    return null;
}

export default function TopMenu(props) {
    const {darkTheme} = props
    const [icon,setIcon]=useState(<Mobile/>)

    return (
        <ThemeProvider themeName={"dark"}>

        <div style={{display:"flex",
            backgroundColor: "#1D2533",
        }}>
            <div style={{display:"flex",alignItems:"center",marginLeft:"20px",width:"100%"}}>
                <svg width="25" height="40" viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.248 40H3.86727C3.44457 40 3.03344 39.858 2.6966 39.5957C1.84397 38.9321 1.67691 37.6848 2.32348 36.8099L8.60844 30.4297C8.60859 30.4297 11.8218 33.6198 18.248 40Z" fill="#FF4F12"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 36.8V12.2528C0.75 10.8072 1.30322 9.4176 2.29399 8.3744L10.25 0L24.5 14.4L2.53204 36.6128C2.16257 36.9848 1.95484 37.4904 1.95484 38.0176C1.95484 39.1128 2.83319 40 3.91667 40C2.1678 40 0.75 38.5672 0.75 36.8Z" fill="#7700FF"></path></svg>
                <Typography variant={"h3"} style={{marginLeft:"10px"}}>Дизайн-система Ростелекома</Typography>
                <IconButton style={{marginRight:"5px",marginLeft:"40px"}} size={"small"} icon={icon} onClick={()=>{
                    if(mobile){
                        mobile=false
                        setIcon(<Mobile/>)
                        props.editState({w:1920,h:1080})
                    }else{


                        if(window.confirm("При переходе на другую версию отображения все элементы будут удалены.\n\nПродолжить?")){
                            props.clearPositions()
                            props.editArea([])
                            mobile=true
                            setIcon(<Desktop/>)
                            props.editState({w:375,h:812})
                        }
                    }
                }}>Мобильная версия</IconButton>
                <Typography style={{marginRight:"20px"}} variant={"h4"}>{icon.type.displayName}</Typography>
                <Switch text={"Темная тема"} onChange={(e) => {
                    isDark=e
                    darkTheme(e)
                }}/>
            </div>
            <div style={{
                width: "100%",
                height: "64px",
                backgroundColor: "#1D2533",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>


                    <Button style={{marginLeft: "15px"}} size={"small"}
                            onClick={()=>{
                                var theme="light"
                                if(isDark)
                                    theme="dark"
                                document.getElementById("clearArea").style.backgroundColor=colors(theme).mainColor
                                htmlToImage.toBlob(document.getElementById('clearArea'))
                                    .then(function (blob) {
                                        // window.saveAs(blob, 'photo.png');
                                        var reader = new FileReader();
                                        reader.readAsDataURL(blob);
                                        reader.onloadend = function() {
                                            let base64data = reader.result;
                                            createImgZip(base64data,mobile)
                                        }
                                        document.getElementById("clearArea").style.backgroundColor="transparent"
                                    });
                            }}>Создать mockup</Button>

                    <Button style={{marginRight: "15px", marginLeft: "15px"}} size={"small"} onClick={()=>exportToHtml(darkTheme,isDark)}>Рендер в HTML</Button>

            </div>
        </div>
        </ThemeProvider>

    )
}