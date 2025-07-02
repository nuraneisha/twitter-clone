import { useState, useContext } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { likePost, removeLikesFromPost, deletePost } from "../features/posts/postsSlice"
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
    const { content, id: postId, imageUrl } = post;
    const [likes, setLikes] = useState([]);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
    const pic = "https://media.istockphoto.com/id/158630429/photo/beautiful-woman-in-retro-style.jpg?s=612x612&w=0&k=20&c=wmZlpe9RyT3kx2S_F2BiRiAwQ59oUvhWmKqylnT88_8=";

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdatemodal = () => setShowUpdateModal(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost({ userId, postId }));
        }

    }

    const isLiked = likes.includes(userId);
    const handleLike = () => { isLiked ? removeFromLikes() : addToLikes() }
    const addToLikes = () => {

        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    }
    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikesFromPost({ userId, postId }));
    }
    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src={pic} roundedCircle style={{ width: 30, height: 30 }} />
            </Col>

            <Col>
                <strong>Aneisha</strong>
                <span> @aneisha.kadir · Jun 25</span>
                <p>{content}</p>
                <Image src={imageUrl} style={{ width: 150 }} />
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-trash" onClick={handleDelete}></i>
                    </Button>
                    <UpdatePostModal show={showUpdateModal} handleClose={handleCloseUpdatemodal} postId={postId} originalPostContent={content} />
                </div>
            </Col>
        </Row>
    )
}

