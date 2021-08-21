import exportToHtml from "../exportToHtml";
import {
    Button,
    Checkbox,
    Desktop,
    IconButton,
    Mobile, RatingFill,
    Select,
    Switch,
    ThemeProvider, ToastNotificationsProvider
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
        <div style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#1D2533",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        }}>
           <ThemeProvider themeName={"dark"}>

               <Switch text={"Темная тема"} onChange={(e) => {
                   isDark=e
                   darkTheme(e)
               }}/>
               <Button style={{marginLeft: "15px"}} size={"small"}
                       onClick={()=>{
                           var theme="light"
                           if(isDark)
                               theme="dark"
                           document.getElementById("clearArea").style.backgroundColor=colors(theme).mainColor
                           htmlToImage.toBlob(document.getElementById('clearArea'))
                               .then(function (blob) {
                                   window.saveAs(blob, 'photo.png');
                                   document.getElementById("clearArea").style.backgroundColor="transparent"
                               });
                       }}>Создать картинку</Button>

               <Button style={{marginRight: "15px", marginLeft: "15px"}} size={"small"} onClick={()=>exportToHtml(darkTheme,isDark)}>Скачать архив</Button>
               <IconButton style={{marginRight:"15px"}} size={"small"} icon={icon} onClick={()=>{
                    if(mobile){
                        mobile=false
                        setIcon(<Mobile/>)
                        props.editState({w:1920,h:1080})
                    }else{
                        let stop = false
                        for (let j in props.areaElements){
                            if(props.areaElements[j]!=undefined){
                                stop=true
                                break
                            }
                        }
                        if(stop){
                            alert("Переход на мобильную версию недоступен, пока у Вас на экране есть хотя бы один компонент.\n\nПожалуйста, удалите все компоненты, либо перезагрузите страницу, чтобы редактировать мобильную версию.")
                        }else{
                            mobile=true
                            setIcon(<Desktop/>)
                            props.editState({w:375,h:812})
                        }
                    }
               }}>Мобильная версия</IconButton>
           </ThemeProvider>
        </div>
    )
}