import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState([]);
    const pic = "https://media.istockphoto.com/id/158630429/photo/beautiful-woman-in-retro-style.jpg?s=612x612&w=0&k=20&c=wmZlpe9RyT3kx2S_F2BiRiAwQ59oUvhWmKqylnT88_8=";
    const BASE_URL = "https://342a0a97-00b6-4ff9-9328-ee91ee8b96a4-00-2aa1gf71runrt.sisko.replit.dev"
    //decode to get Userid
    const token = localStorage.getItem("authToken");
    const decode = jwtDecode(token);
    const userId = decode.id;

    useEffect(() => {
        fetch(`${BASE_URL}/likes/post/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data))
            .catch((error) => console.error("Error:", error));
    }, [postId]);

    const isLiked = likes.some((like) => like.user_id === userId);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        axios.post(`${BASE_URL}/likes`,
            {
                user_id: userId,
                post_id: postId,
            }
        )
            .then((response) => {
                setLikes([...likes, { ...response.data, likes_id: response.data.id }])
            })
            .catch((error) => console.error("Error:", error))
    }

    const removeFromLikes = () => {
        const like = likes.find((like) => like.user_id === userId);
        if (like) {
            axios.put(`${BASE_URL}/likes/${userId}/${postId}`)//include userid and postid in the url
                .then(() => {
                    //update the state to reflect the removal of the like
                    setLikes(likes.filter((likeItem) => likeItem.user_id !== userId));
                })
                .catch((error) => console.error("Error:", error));
        }
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
                </div>
            </Col>
        </Row>
    )
}

