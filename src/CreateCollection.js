import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { CreateNewCollection } from "./actions";
import { useNavigate } from "react-router-dom";
// import {  AlertDescription } from "@chakra-ui/modal";
import { Alert,AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";

export default function CreateCollection(props) {
  const { store } = props;
  const [images, setImages] = useState(null);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  async function getImages() {
    let imgs = [];
    for (let i = 0; i < 30; i++) {
      try {
        let img = await fetch("https://picsum.photos/200");
        img = await img.blob();
        const urlCreator = window.URL || window.webkitURL;
        const blobUrl = urlCreator.createObjectURL(img);
        imgs.push(blobUrl);
      } catch (e) {}
    }
    setImages(imgs);
  }

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDesc(e) {
    setDesc(e.target.value);
  }

  function handleSubmit(e) {
    if(name === '' || desc === '' || selected.length === 0) {
      setError(true)
      return
    }
    e.preventDefault();
    store.dispatch(
      CreateNewCollection({
        name,
        desc,
        selected,
        id: uuidv4(),
      })
    );

    navigate("/");
  }

  function handleImages(e) {
    if (selected.includes(e.target.src)) {
      setSelected(selected.filter((val) => val !== e.target.src));
    } else {
      setSelected([...selected, e.target.src]);
    }
  }
  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className="collections">
      <Box width="97vw" border="1px" padding="1vw" borderRadius="lg">
        <h3>Create a Collection</h3>
      {  error?<Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Forms fields are empty!</AlertTitle>
          <AlertDescription>
            Make sure you select atleast one image for the collection
          </AlertDescription>
          {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
        : null
        }
        <FormControl id="name" isRequired>
          <FormLabel>Collection Name</FormLabel>
          <Input placeholder="Collection Name" onInput={handleName} />
        </FormControl>
        <FormControl id="name" isRequired>
          <FormLabel>Collection Description</FormLabel>
          <Textarea placeholder="Collection Description" onInput={handleDesc} />
        </FormControl>
        Select Images from below:
        <br />
        <div>
          {images ? (
            images.map((val) => {
              return (
                <img
                  src={val}
                  width="200px"
                  height="200px"
                  style={{ display: "inline-block", marginLeft: "3px",opacity: selected.includes(val)? "100%": "50%" }}
                  onClick={handleImages}
                  alt="random"
                />
              );
            })
          ) : (
            <Spinner color="red.500" />
          )}
        </div>
        <Button colorScheme="teal" size="lg" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}
