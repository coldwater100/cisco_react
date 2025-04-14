import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

export const LoginForm = () => {
    const { setIsLoggedIn, setUsername } = useAuth(); // 전역 상태 업데이트 함수
    const [localUsername, setLocalUsername] = useState(""); // 사용자 입력값
    const [password, setPassword] = useState(""); // 비밀번호 입력값
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!localUsername.trim() || !password.trim()) {
            setMessage("모든 필드를 입력하세요.");
            setVariant("danger");
            return;
        }

        try {
            // Firestore에서 해당 사용자 정보 가져오기
            const q = query(
                collection(db, "users"),
                where("username", "==", localUsername)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // 사용자가 존재할 경우
                const userDoc = querySnapshot.docs[0].data();
                const storedHashedPassword = userDoc.hashedPassword;

                // bcrypt로 비밀번호 비교
                const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);

                if (isPasswordCorrect) {
                    setMessage("로그인 성공!");
                    setVariant("success");
                    setIsLoggedIn(true);
                    setUsername(localUsername); // 전역 상태 업데이트
                    setLocalUsername("");
                    setPassword("");
                    navigate("/");
                } else {
                    setMessage("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
                    setVariant("danger");
                }
            } else {
                setMessage("사용자를 찾을 수 없습니다.");
                setVariant("danger");
            }
        } catch (error) {
            setMessage("서버 연결 실패. 다시 시도해주세요.");
            setVariant("danger");
        }
    };

    return (
        <Container fluid className="body-area bg-success">
            <Container style={{ maxWidth: "600px" }}>
                <Container className="fs-2 mb-2">로그인</Container>
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
                                value={localUsername} // 사용자 입력값
                                onChange={(e) => setLocalUsername(e.target.value)}
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
                            로그인
                        </Button>
                    </Form>
                </Container>
            </Container>
        </Container>
    );    
}