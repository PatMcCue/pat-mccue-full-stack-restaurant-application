import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { login } from '../src/components/Auth';
import { useApp } from '../src/Providers/Context';

function Login() {
    const [data, updateData] = useState({ identifier: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setUser, isAuthenticated, setIsAuthenticated } = useApp();

    const handleChange = (event) => {
        updateData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        setLoading(true);
        login(data.identifier, data.password)
            .then((res) => {
                setUser(res.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch((error) => {
                setErrors(error.response.data);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Row>
                <Col sm="12" md={{ size: 5, offset: 3 }}>
                    <div className="paper">
                        <div className="header"></div>
                        <section className="wrapper">
                            {Object.keys(errors).length > 0 &&
                                Object.values(errors).map((error) => (
                                    <div key={error.id} style={{ marginBottom: '10px' }}>
                                        <small style={{ color: 'red' }}>{error.message}</small>
                                    </div>
                                ))}
                            <Form>
                                <fieldset disabled={loading}>
                                    <FormGroup>
                                        <Label>Email:</Label>
                                        <Input
                                            type="email"
                                            onChange={handleChange}
                                            name="identifier"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup style={{ marginBottom: 30 }}>
                                        <Label>Password:</Label>
                                        <Input
                                            onChange={handleChange}
                                            type="password"
                                            name="password"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <span>
                                            <a href="">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </span>
                                        <Button
                                            style={{
                                                float: 'right',
                                                width: 120,
                                                backgroundColor: '#7A9D54',
                                            }}
                                            onClick={handleSubmit}
                                        >
                                            {loading ? 'Loading... ' : 'Sign In'}
                                        </Button>
                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </section>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
