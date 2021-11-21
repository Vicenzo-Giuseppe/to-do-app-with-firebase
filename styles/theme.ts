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
                marginBottom: 4,
                fontWeight: 400,
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
    heading: "Montserrat",
    body: "Roboto",
}

const colors = {

}

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    styles,
    colors,
    fonts,
    components,
})

export default theme