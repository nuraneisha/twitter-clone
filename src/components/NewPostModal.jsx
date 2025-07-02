import { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider"

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const handleSave = () => {
        dispatch(savePost({ userId, postContent, file }));
        handleClose();
        setPostContent("");
        setFile(null);
    };

    const handleFilesChange = (event) => {
        setFile(event.target.files[0]);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="postContent">
                        <Form.Control as="textarea" rows={3} placeholder="Whats's happening" onChange={(event) => setPostContent(event.target.value)}></Form.Control>
                        <br />
                        <Form.Control type="file" onChange={handleFilesChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>Tweet</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}