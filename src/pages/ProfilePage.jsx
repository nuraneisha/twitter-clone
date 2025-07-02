import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileMidBody from "../components/ProfileMidBody";
import ProfileSideBar from "../components/ProfileSideBar";


export default function ProfilePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser }
        = useContext(AuthContext);
    // Check for authToken immediately upon component mount and whenever authToken changes

    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])


    const handleLogout = () => {
        auth.signOut(); // Clear token from localStorage
    };

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    );
}