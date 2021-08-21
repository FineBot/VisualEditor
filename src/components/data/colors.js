
export default function colors(theme){
    switch (theme){
        case 'dark':
            return({
                mainColor:"#1D2533"
            })
            break;
        default:
            return({
                mainColor:"#FFFFFF"
            })
            break
    }
}