import {Button,InputText,Select,Switch} from "@design-system-rt/rtk-ui-kit";

export const elements = ([
    {name:"Button",element:Button, initProps:{propsNumber:0, initName:"button",children:"Button"}},
    {name:"Select",element:Select, initProps:{propsNumber:1, initName:"select",options:[{"value": "React","key": "react"},{"value": "Vue","key": "vue"},{"value": "Angular","key": "angular"}],label:"Label"}},
    {name:"Switch",element:Switch, initProps:{propsNumber:2, initName:"switch",text:"Автообновление"}},
])