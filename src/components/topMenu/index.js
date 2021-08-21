import {Switch, ThemeProvider} from "@design-system-rt/rtk-ui-kit";
var isDark=false
export default function TopMenu(props) {
    const {darkTheme} = props
    return (
        <div style={{
            width: "100vw",
            height: "50px",
            backgroundColor: "gray",
            display: "flex",
            alignItems: "center",
        }}>
            <Switch style={{marginLeft:"20px"}} text={"Темная тема"} onChange={(e) => {
                isDark=e
                darkTheme(e)
            }}/>

        </div>
    )
}