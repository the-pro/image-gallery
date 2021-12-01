import { Box, Center } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
export default function Collection(props) {
  const { store } = props;
  const collections = store.getState();
  return (
    <div className="collections">
      <div>
        <div className="collection">
          <Link to="create">
            <div style={{ display: "inline" }}>
              <Center
                bg="grey"
                h="200px"
                color="white"
                width="200px"
                margin="5px"
                borderRadius="lg"
                fontSize="2em"
                float="left"
              >
                +<br />
                Add new collection
              </Center>
            </div>
            </Link>
            {collections.map((val) => {
              return (
                <div style={{ display: "inline" }}>
                  <Link to={`show/${val.id}`}>
                  <Center
                    bg="grey"
                    h="200px"
                    color="black"
                    width="200px"
                    margin="5px"
                    borderRadius="lg"
                    fontSize="2em"
                    backgroundImage={val.selected[0]}
                    opacity="75%"
                    // overflow="hidden"
                    // style={{ display: "inline-block" }}
                    float="left"
                  >
                    {val.name}
                  </Center>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
