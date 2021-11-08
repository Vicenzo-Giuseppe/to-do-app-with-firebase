import { Link, Box } from '@chakra-ui/layout';
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2'



const Logo = () => {
    return (
        <Link href='/' pointer='false'>
            <Box bgGradient="linear(to-r, teal.500, green.500)">
                <UseAnimations animation={loading2} speed={1.25} size={75} />
            </Box>
        </Link>
    )
}

export default Logo



