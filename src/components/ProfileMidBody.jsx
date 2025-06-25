import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function ProfileMidBody() {

    const url = "https://images.unsplash.com/photo-1583144568008-76743354fa5a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D";
    const pic = "https://media.istockphoto.com/id/158630429/photo/beautiful-woman-in-retro-style.jpg?s=612x612&w=0&k=20&c=wmZlpe9RyT3kx2S_F2BiRiAwQ59oUvhWmKqylnT88_8=";

    const [posts, setPosts] = useState([]);

    const fetchPosts = (userId) => {
        fetch(
            `https://18f9ab16-97ff-40fe-9a9e-a435a7b211c0-00-yxbuau6ywrug.pike.replit.dev/posts/user/${userId}`
        ).then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error:", error))
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId)
        }

    }, [])
    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    height: 150,
                    position: "absolute",
                    top: "300px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                    objectFit: "cover",
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Aneisha
            </p>

            <p style={{ marginBottom: "2px" }}>@aneisha.kadir</p>

            <p>I help people switch careers to be a software developer at sigmaschool.co</p>

            <p>Entrepreneur</p>

            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.length > 0 ? posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} postId={post.id} />
            )) : <p>No posts yet</p>}



        </Col>
    )
}