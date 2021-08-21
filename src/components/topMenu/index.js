import exportToHtml from "../exportToHtml";
import {Switch, ThemeProvider} from "@design-system-rt/rtk-ui-kit";
var isDark=false
export default function TopMenu(props) {
    const {darkTheme} = props
    return (
        <div style={{
            width: "100%",
            height: "50px",
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        }}>
            <Switch text={"Темная тема"} onChange={(e) => {
                isDark=e
                darkTheme(e)
            }}/>
            <button style={{marginRight: "20px", marginLeft: "15px"}} onClick={()=>exportToHtml(darkTheme,isDark)}>Скачать архив</button>
        </div>
    )
}