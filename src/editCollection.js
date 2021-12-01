import { Heading } from "@chakra-ui/layout";
import { useParams, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { EditCollection, RemoveCollection } from "./actions";
import { Alert,AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Spinner } from "@chakra-ui/spinner";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
export default function EditComponent(props) {
  const { store } = props;
  const { id } = useParams();
  const collections = store.getState();
  const collection = collections.filter((val) => val.id === id)[0] || {
    name: "Not Available",
    desc: "",
    selected: [],
    id: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(collection.name);
  const [desc, setDesc] = useState(collection.desc);
  const [addPhotosOpen, setAddPhotos] = useState(false);
  const [selected, setSelected] = useState([]);
  const [remove, setRemove] = useState([]);
  const [error,setError] = useState(false);
  const [images, setImages] = useState(null);
  const navigate = useNavigate();
  function onClose() {
    setIsOpen(false);
    setAddPhotos(false);
    setName(collection.name);
    setDesc(collection.desc);
    setError(false)
  }

  function handleImages(e) {
    if (selected.includes(e.target.src)) {
      setSelected(selected.filter((val) => val !== e.target.src));
    } else {
      setSelected([...selected, e.target.src]);
    }
  }

  function handleRemoveImages(e) {
    if (remove.includes(e.target.src)) {
      setRemove(remove.filter((val) => val !== e.target.src));
    } else {
      setRemove([...remove, e.target.src]);
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    if(name === "" || desc === "") {
        setError(true)
        return
    }
    store.dispatch(
      EditCollection({
        ...collection,
        name,
        desc,
        selected: [...collection.selected, ...selected],
      })
    );
    setIsOpen(false);
    setAddPhotos(false);
    setSelected([]);
  }

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

  function handleRemove(e) {
    e.preventDefault();
    store.dispatch(RemoveCollection(collection));
    navigate("/");
  }

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDesc(e) {
    setDesc(e.target.value);
  }

  function openAddPhotos() {
    setAddPhotos(true);
    getImages();
  }

  function removeImages() {
    store.dispatch(
      EditCollection({
        ...collection,
        selected: [...collection.selected].filter(
          (val) => !remove.includes(val)
        ),
      })
    );
    setRemove([]);
  }
  return (
    <div class="edit">
      {collection.id !== "" ? (
        <div>
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit the collection</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {/* <Lorem count={2} /> */}
                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Forms fields are empty!</AlertTitle>
                    <AlertDescription>
                      Form fields cannot be empty
                    </AlertDescription>
                    {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
                  </Alert>
                ) : null}
                <Input
                  placeholder="Collection Name"
                  value={name}
                  onInput={handleName}
                />
                <br />
                <br />
                <Textarea
                  placeholder="Collection Description"
                  value={desc}
                  onInput={handleDesc}
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={handleEdit}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            closeOnOverlayClick={false}
            isOpen={addPhotosOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add photos</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                {/* <Lorem count={2} /> */}
                {images ? (
                  images.map((val) => {
                    return (
                      <img
                        src={val}
                        alt="random"
                        width="100px"
                        height="100px"
                        style={{
                          display: "inline-block",
                          marginLeft: "3px",
                          opacity: selected.includes(val) ? "100%" : "50%",
                        }}
                        onClick={handleImages}
                      />
                    );
                  })
                ) : (
                  <Spinner color="red.500" />
                )}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="teal" mr={3} onClick={handleEdit}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <div class="start">
            <div>
              <Heading>
                {collection.name}
                <span
                  style={{
                    fontSize: "0.3em",
                    alignContent: "top",
                    cursor: "pointer",
                  }}
                  onClick={(e) => setIsOpen(true)}
                >
                  <EditIcon />
                </span>
              </Heading>
              <Text fontSize="xl">{collection.desc}</Text>
            </div>
          </div>
          <div className="start">
            <div>
              {collection.selected.map((val) => {
                return (
                  <img
                    src={val}
                    alt="random"
                    style={{
                      display: "inline-block",
                      marginLeft: "3px",
                      opacity: remove.includes(val) ? "50%" : "100%",
                    }}
                    onClick={handleRemoveImages}
                  />
                );
              })}
              <br />
              <div className="start">
                <Button bg="teal.500" onClick={openAddPhotos}>
                  Add photos
                </Button>
                <Button bg="orange.500" ml={3} onClick={removeImages}>
                  Remove selected
                </Button>
                <Button bg="red.500" ml={3} onClick={handleRemove}>
                  Remove Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>No such Collection available</h3>
      )}
    </div>
  );
}
