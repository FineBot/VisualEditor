import {
    AddLarge,
    Attachment,
    AttachmentLink,
    Button,
    Chat,
    Checkbox,
    Chip,
    Dislike,
    FunctionButton,
    IconButton,
    Image,
    InputAmount,
    InputEmail,
    InputText,
    Like,
    Link,
    LinkNative,
    Lock,
    Mail,
    MenuKebab,
    Microphone,
    Notification,
    NotificationNew, Photo,
    RadioButton,
    Select,
    Stepper,
    Switch,
    TabsClassicGroup,
    TagItem, Translation,
    Typography
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
    'attachmentlink': <AttachmentLink/>,
    'chat': <Chat/>,
    'dislike': <Dislike/>,
    'Image': <Image/>,
    'like': <Like/>,
    'link': <Link/>,
    'lock': <Lock/>,
    'mail': <Mail/>,
    'microphone': <Microphone/>,
    'notification': <Notification/>,
    'notificationNew': <NotificationNew/>,
    'photo': <Photo/>,
    'translation': <Translation/>,

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


    let maxHeight=screenWidth - paddings * 2
    if(maxHeight>600)
        maxHeight=600

    return (
        {
            "Typography": {
                'element': Typography,
                'style': {
                    'width': {
                    'type': 'picker',
                    'title': 'Ширина',
                    'values': [
                        '100px',
                        '200px',
                        '300px',
                        (maxHeight).toString()+'px',
                    ]
                },
                'textAlign': {
                    'type': 'picker',
                    'title': 'Ширина (px)',
                    'values': [
                        'left',
                        'center',
                        'right'
                    ]
                }
                },
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
                },
                'style':{
                    'width': {
                        'type': 'picker',
                        'title': 'Ширина',
                        'values': [
                            '100px',
                            '200px',
                            '300px',
                            (maxHeight).toString()+'px',
                        ]
                    },
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
                        'title': 'Ширина',
                        'values': [
                            '100px',
                            '200px',
                            '300px',
                            (maxHeight).toString()+'px',

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