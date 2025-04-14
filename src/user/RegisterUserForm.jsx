import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";


export const RegisterUserForm = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");

    const { isLoggedIn, isAuthLoaded } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthLoaded && isLoggedIn === false) {
            navigate("/");
        }
    }, [isLoggedIn, isAuthLoaded, navigate]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!username.trim() || !name.trim() || !password.trim()) {
            setMessage("모든 필드를 입력하세요.");
            setVariant("danger");
            return;
        }

        try {
            // Firestore에서 username이 이미 존재하는지 확인
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // 이미 존재하는 username이 있을 경우
                setMessage("이 사용자 ID는 이미 사용 중입니다.");
                setVariant("danger");
                return;
            }

            // 비밀번호 해싱
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 새로운 사용자 등록
            await addDoc(collection(db, "users"), {
                username,
                name,
                hashedPassword,
                join_date: serverTimestamp(),
                update_date: serverTimestamp(),
            });

            setMessage(`등록 성공! 사용자: ${username}`);
            setVariant("success");
            setUsername("");
            setName("");
            setPassword("");
        } catch (error) {
            setMessage("등록 실패. 다시 시도해주세요.");
            setVariant("danger");
        }
    };

    return (
        <Container fluid className="body-area">
            <Container style={{ maxWidth: "600px" }}>
                <Container className="fs-2 mb-2">새 사용자 등록</Container>
                <Container className="fs-4 mb-4">
                    {message && <Alert variant={variant}>{message}</Alert>}
                </Container>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>사용자 ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="사용자 ID 입력"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이름 입력"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            등록
                        </Button>
                    </Form>
                </Container>
            </Container>
        </Container>
    );
};
