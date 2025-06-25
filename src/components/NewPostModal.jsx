import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");

    const handleSave = () => {
        const token = localStorage.getItem("authToken");
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.id;

        const data = {
            title: "Post Item",
            content: postContent,
            user_id: userId,
        };
        axios.post(`https://342a0a97-00b6-4ff9-9328-ee91ee8b96a4-00-2aa1gf71runrt.sisko.replit.dev/posts`, data)
            .then((response) => {
                console.log("Success", response.data);
                handleClose();
            }).catch((error) => {
                console.error("Error", error)
            })
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