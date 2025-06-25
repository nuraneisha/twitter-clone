import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState(0);
    const pic = "https://media.istockphoto.com/id/158630429/photo/beautiful-woman-in-retro-style.jpg?s=612x612&w=0&k=20&c=wmZlpe9RyT3kx2S_F2BiRiAwQ59oUvhWmKqylnT88_8=";

    useEffect(() => {
        fetch(`https://342a0a97-00b6-4ff9-9328-ee91ee8b96a4-00-2aa1gf71runrt.sisko.replit.dev/likes/post/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data.length))
            .catch((error) => console.error("Error:", error));
    }, [postId]);

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
                    <Button variant="light">
                        <i className="bi bi-heart"> {likes}</i>
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

