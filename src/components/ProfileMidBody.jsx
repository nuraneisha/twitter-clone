import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsByUser } from "../features/posts/postsSlice";


export default function ProfileMidBody() {

    const url = "https://images.unsplash.com/photo-1583144568008-76743354fa5a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D";
    const pic = "https://media.istockphoto.com/id/158630429/photo/beautiful-woman-in-retro-style.jpg?s=612x612&w=0&k=20&c=wmZlpe9RyT3kx2S_F2BiRiAwQ59oUvhWmKqylnT88_8=";

    const dispatch = useDispatch();
    const posts = useSelector(store => store.posts.posts);
    const loading = useSelector(store => store.posts.loading);


    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            console.log(token);
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            dispatch(fetchPostsByUser(userId));
        }

    }, [dispatch])
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
            {/* //from store.posts.loading */}
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {posts.length > 0 ? posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} postId={post.id} />
            )) : <p>No posts yet</p>}



        </Col>
    )
}