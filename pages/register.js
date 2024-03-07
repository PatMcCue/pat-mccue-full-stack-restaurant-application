import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { registerUser } from '../src/components/Auth';
import AppContext from '../src/Providers/Context';

const Register = () => {
    const [data, setData] = useState({ email: '', username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false); // Track form submission
    const appContext = useContext(AppContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (data.username && data.email && data.password) {
            setLoading(true);
            registerUser(data.username, data.email, data.password)
                .then((res) => {
                    appContext.setUser(res.data.user);
                    setLoading(false);
                    console.log(`Registered user: ${JSON.stringify(res.data)}`);
                })
                .catch((error) => {
                    console.log(`Error in registration: ${error}`);
                    setLoading(false);
                });
        }
    };

    return (
        <Container>
            <Row>
                <Col sm="12" md={{ size: 5, offset: 3 }}>
                    <div className="paper">
                        <div className="header">
                            <img src="http://localhost:1337/uploads/5a60a9d26a764e7cba1099d8b157b5e9.png" />
                        </div>
                        <section className="wrapper">
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username:</Label>
                                    <Input
                                        onChange={handleInputChange}
                                        value={data.username}
                                        type="text"
                                        name="username"
                                        style={{ height: 50, fontSize: '1.2em' }}
                                        required
                                    />
                                    {submitted && !data.username && (
                                        <small style={{ color: 'red' }}>Please enter your username.</small>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email:</Label>
                                    <Input
                                        onChange={handleInputChange}
                                        value={data.email}
                                        type="email"
                                        name="email"
                                        style={{ height: 50, fontSize: '1.2em' }}
                                        required
                                    />
                                    {submitted && !data.email && (
                                        <small style={{ color: 'red' }}>Please enter your email.</small>
                                    )}
                                </FormGroup>
                                <FormGroup style={{ marginBottom: 30 }}>
                                    <Label>Password:</Label>
                                    <Input
                                        onChange={handleInputChange}
                                        value={data.password}
                                        type="password"
                                        name="password"
                                        style={{ height: 50, fontSize: '1.2em' }}
                                        required
                                    />
                                    {submitted && !data.password && (
                                        <small style={{ color: 'red' }}>Please enter your password.</small>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <span>
                                        <a href="#"><small>Forgot Password?</small></a>
                                    </span>
                                    <Button
                                        style={{ float: 'right', width: 120, backgroundColor: '#7A9D54' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Submit'}
                                    </Button>
                                </FormGroup>
                            </Form>
                        </section>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
