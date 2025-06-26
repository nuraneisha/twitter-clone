import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(savePost(postContent));
        handleClose();
        setPostContent("");
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="postContent">
                        <Form.Control as="textarea" rows={3} placeholder="Whats's happening" onChange={(event) => setPostContent(event.target.value)}></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>Tweet</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}