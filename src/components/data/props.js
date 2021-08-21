import {
    AddLarge,
    Attachment,
    Button,
    Chat,
    Checkbox,
    Chip,
    FunctionButton,
    IconButton,
    InputAmount, InputEmail, InputText, LinkNative, MenuKebab,
    RadioButton,
    Select,
    Stepper,
    Switch, TabsClassicGroup,
    TagItem, Typography
} from "@design-system-rt/rtk-ui-kit";
import {useEffect} from "react";

let color = {
    'type': 'picker',
    'title': 'Цвет',
    'values': [
        'primary1',
        'primary2',
        'secondary1',
        'secondary2',
    ]
}

let colorInfo = {
    'type': 'picker',
    'title': 'Цвет',
    'values': [
        'succsess',
        'info',
        'error',
        'warning',
    ]
}

let shape = {
    'type': 'picker',
    'title': 'Форма',
    'values': [
        'geometric',
        'rounded',
        'circular'
    ]
}

let size = {
    'type': 'picker',
    'title': 'Размер',
    'values': [
        'medium',
        'small',
        'large'
    ]
}

let children = {
    'type': 'text',
    'title': 'Текст'
}


export const icons = {
    'addLarge': <AddLarge/>,
    'linknative': <LinkNative/>,
    'attachment': <Attachment/>,
    'menukebab': <MenuKebab/>,
    'Chat': <Chat/>,
    'menu5Kebab': <MenuKebab/>,
    'menu6Kebab': <MenuKebab/>,
    'men7uKe8bab': <MenuKebab/>,
    'menu4Keb7ab': <MenuKebab/>,
    'menu3Kebab': <MenuKebab/>,
    'men5uKebab': <MenuKebab/>,
    'men1uKe2bab': <MenuKebab/>,
    'menuKe2bab': <MenuKebab/>,
    'me2nuKebab': <MenuKebab/>,
    'menu2Kebab': <MenuKebab/>,
    'menu3Ke2bab': <MenuKebab/>,
    'menu4Kebab': <MenuKebab/>,
    'men7uKebab': <MenuKebab/>,
}

let icon = {
    'type': 'select',
    'title': 'Иконка',
    'generate': true,
    'values': icons
}

const Icon = (props) => {
    return (
        props.children
    )
}

export function dataConst() {
    let screenWidth = 0
    let paddings = 32
    screenWidth = (document.getElementById("clearArea").offsetWidth)
    if (screenWidth < 400 && screenWidth > 350)
        paddings = 16

    return (
        {
            "Typography": {
                'element': Typography,
                "props": {
                    "children": children,
                    "color": {
                        'type': 'select',
                        'title': 'Цвет',
                        'values': [
                            'info',
                            'warning',
                            'error',
                            'success',
                            'main',
                            'description',
                            'caption',
                            'disabled',
                            'primary1',
                            'primary2',
                            'secondary1',
                            'secondary2',

                        ]
                    },
                    "variant": {
                        'type': "select",
                        'title': "Вариант",
                        'values': [
                            "mega",
                            'h1',
                            'h2',
                            'h3',
                            'h4',
                            'bodyL',
                            'bodyM',
                            'caption',
                            'description',
                            'accentS',
                            'accentM',
                            'accentL'

                        ]
                    },
                    'spacingBottom': {
                        'type': 'select',
                        'title': 'Отступ снизу',
                        'values': [
                            'Нет',
                            's',
                            'm',
                            'l',
                            'xl',
                            'xs',
                            'xxl',
                            'xxxl'
                        ]
                    },
                    'spacingTop': {
                        'type': 'select',
                        'title': 'Отступ сверху',
                        'values': [
                            'Нет',
                            's',
                            'm',
                            'l',
                            'xl',
                            'xs',
                            'xxl',
                            'xxxl'
                        ]
                    },
                    'spacing': {
                        'type': 'select',
                        'title': 'Отступы от стенок',
                        'values': [
                            'Нет', 's', 'm', 'l', 'xl'
                        ]
                    }
                }
            },
            'Icon': {
                'element': Icon,
                'props': {
                    'children': icon

                }
            },
            'Tabs': {
                'element': TabsClassicGroup,

                'props': {
                    'size': {
                        'type': 'picker',
                        'title': 'Размер',
                        'values': [
                            'medium',
                            'small',
                        ]
                    },
                    'accentColor': color,
                    'children': {
                        'type': 'tabsConstructor'
                    }
                }
            },

            'Button': {
                'element': Button,
                'props': {
                    'children': children,
                    'color': color,
                    'size': size
                },
                'style': {
                    'width': {
                        'type': 'picker',
                        'title': 'Ширина (px)',
                        'values': [
                            screenWidth - paddings * 2 - 1,
                            '100',
                            '200',
                            '300',
                        ]
                    }
                }
            },
            'Select': {
                'element': Select,
                'props': {
                    'label': {
                        'type': 'text',
                        'title': 'Текст'
                    },
                    'color': color,
                    'shape': shape,
                    'options': {
                        'type': 'arrayText',
                        'title': 'Параметры',
                    }
                }
            },
            'Switch': {
                'element': Switch,
                'props': {
                    'text': {
                        'type': 'text',
                        'title': 'Текст'
                    },
                    'color': color,

                }
            },
            'Chip': {
                element: Chip,
                'props': {
                    'amount': {
                        'type': 'text',
                        'title': 'Индекс'
                    },
                    'children': children,
                    'color': color,
                    'shape': shape


                }
            },
            'Checkbox': {
                element: Checkbox,
                'props': {
                    'children': children,
                    'color': color,
                    'shape': shape
                }
            },
            'RadioButton': { //TODO не реагирает на нажатие, странно
                element: RadioButton,
                'props': {
                    'children': children,
                    'value': {
                        'type': 'text',
                        'title': 'Значение'
                    },
                    'color': color
                }
            },
            'IconButton': {
                element: IconButton,
                'props': {
                    'icon': icon,
                    'color': color,
                    'size': size,
                    'shape': shape
                }
            },
            'Stepper': {
                element: Stepper,
                'props': {
                    'color': color,
                    'size': {
                        'type': 'picker',
                        'title': 'Размер',
                        'values': [
                            'medium',
                            'small'
                        ]
                    },
                    'shape': shape
                }
            },
            'TagItem': {
                element: TagItem,
                'props': {
                    'children': children,
                    'size': {
                        'type': 'picker',
                        'title': 'Размер',
                        'values': [
                            'medium',
                            'small'
                        ]
                    },
                    'shape': shape
                }
            },
            'InputAmount': {
                element: InputAmount,
                'props': {
                    'label': {
                        'type': 'amount',
                        'title': 'Цифры'
                    },
                    'icon': icon,
                    'color': color,
                    'shape': shape
                }
            },
            'FunctionButton': {
                element: FunctionButton,
                'props': {
                    'children': children,
                    'icon': icon,
                    'color': color

                }
            },
            'InputEmail': {
                element: InputEmail,
                'props': {
                    'label': {
                        'type': 'text',
                        'title': 'Текст'
                    },
                    'icon': icon,
                    'color': color,
                    'shape': shape
                }
            },
            'InputText': {
                element: InputText,
                'props': {
                    'label': {
                        'type': 'text',
                        'title': 'Текст'
                    },
                    'icon': icon,
                    'color': color,
                    'shape': shape
                }
            },

        }
    )

}