import { extendTheme, ThemeConfig, } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('#F1E9E4', '#202023')(props)
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 30,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            color: mode('#3d7aed', '#ff63c3')(props),
            textUnderlineOffset: 3,
        })
    },
    Text: {
        baseStyle: (props: any) => ({
            color: '#65656F'
        })
    }
}

const fonts = {
    text: "Montserrat"
}

const colors = {
    greenForest: '#1A5653',
    greenTeal: '#107869',
    greenLime: '#5CD85A',
    darkGray: '#202023',
    lightGray: '#65656F'
}

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

const theme = extendTheme({
    config,
    styles,
    colors,
    fonts,
    components,
})

export default theme