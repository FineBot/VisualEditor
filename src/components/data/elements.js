import {
    AddLarge,
    Button,
    Checkbox,
    Chip,
    FunctionButton,
    IconButton,
    InputAmount,
    InputEmail,
    InputText, Internet,
    MenuKebab,
    RadioButton,
    Select,
    Stepper,
    Sticker,
    Switch, TabsClassicGroup, TabsClassicItem,
    TagItem, Typography
} from "@design-system-rt/rtk-ui-kit";

const Icon = (props) => {
    return (
        props.children
    )
}

export const elements = ({
    "Кнопки": {
        "Button": {element: Button, initProps: {initName: "Button", children: "Button"}},
        "FunctionButton": {
            element: FunctionButton,
            initProps: {
                initName: "FunctionButton",
                children: "FunctionButton",
                icon: <MenuKebab/>,
                iconPosition: "left",
                color: "primary2"
            }
        },
        "IconButton": {
            element: IconButton,
            initProps: {initName: "IconButton", icon: <MenuKebab/>, color: "primary2", size: "medium"}
        },


    },
    "Поля ввода": {
        "Select": {
            element: Select,
            initProps: {
                initName: "Select",
                options: [{"value": "React", "key": "react"}, {"value": "Vue", "key": "vue"}, {
                    "value": "Angular",
                    "key": "angular"
                }],
                label: "Label"
            }
        },

        "InputAmount": {
            element: InputAmount,
            initProps: {
                initName: "InputAmount",
                label: "112",
                icon: <MenuKebab/>,
                value: null,
                color: "primary2",
                key: "Label",
                name: "InputAmount"
            }
        },
        "InputEmail": {element: InputEmail, initProps: {initName: "InputEmail", label: "Email", icon: <MenuKebab/>}},
        "InputText": {element: InputText, initProps: {initName: "InputText", label: "Text", icon: <MenuKebab/>}}
    },
    "Контроллы": {
        "Checkbox": {
            element: Checkbox,
            initProps: {initName: "Checkbox", children: "Чекбокс", name: "Checkbox", color: "primary2"}
        },
        "Chip": {
            element: Chip,
            initProps: {initName: "Chip", amount: 13, children: "Карта", color: "primary2", shape: "rounded"}
        },
        "RadioButton": {
            element: RadioButton,
            initProps: {initName: "RadioButton", children: "Radio Button", value: "radio", color: "primary2"}
        },
        "Stepper": {element: Stepper, initProps: {initName: "Stepper", color: "primary2", size: "medium"}},
        "Switch": {element: Switch, initProps: {initName: "Switch", text: "Switch"}},
        "TagItem": {element: TagItem, initProps: {initName: 'TagItem', children: "Тэг",}},
        "Tabs": {
            element: TabsClassicGroup, initProps: {

                initName: 'Tabs',
                optionProps: [{icon: "internet", label: "Интернет"}],
                children: [<TabsClassicItem icon={<Internet/>} index={0} label={"Интернет"}/>],
            }
        }

    },
    "Другое": {
        "Icon": {element: Icon, initProps: {initName: 'Icon', children: <AddLarge/>, iconText: "addlarge"}},
        "Typography": {
            element: Typography,
            initProps: {
                initName: 'Typography',
                children: "Текст",
                variant:"h2",
                color:"main",
                spacingBottom:"Нет",
                spacing:"Нет",
                spacingTop:"Нет"
            }
        }
    }


})