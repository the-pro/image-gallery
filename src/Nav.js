import { Center } from "@chakra-ui/layout"
import { Link } from "react-router-dom"
export default function Nav() {
    return (
        <div className="nav">
            <Center bg="teal.500" h="100px" color="white" width="100%" fontSize="3em">
                <Link to="/">Image Gallery</Link>
            </Center>
        </div>
    )
}