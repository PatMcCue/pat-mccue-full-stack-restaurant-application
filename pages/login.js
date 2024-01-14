import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { login } from '../src/components/Auth';
import { useApp } from '../src/Providers/Context';

function Login() {
    const [data, updateData] = useState({ identifier: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const { setUser, isAuthenticated, setIsAuthenticated } = useApp();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/'); // redirect if you're already logged in
        }
    }, []);

    function onChange(event) {
        updateData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        setLoading(true);
        login(data.identifier, data.password)
            .then((res) => {
                // set authed User in global context to update header/app state
                setUser(res.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response.data);
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
                            {Object.entries(error).length !== 0 &&
                                error.constructor === Object &&
                                error.message.map((error) => {
                                    return (
                                        <div
                                            key={error.messages[0].id}
                                            style={{ marginBottom: 10 }}
                                        >
                                            <small style={{ color: 'red' }}>
                                                {error.messages[0].message}
                                            </small>
                                        </div>
                                    );
                                })}
                            <Form>
                                <fieldset disabled={loading}>
                                    <FormGroup>
                                        <Label>Email:</Label>
                                        <Input
                                            onChange={(event) => onChange(event)}
                                            name="identifier"
                                            style={{ height: 50, fontSize: '1.2em' }}
                                        />
                                    </FormGroup>
                                    <FormGroup style={{ marginBottom: 30 }}>
                                        <Label>Password:</Label>
                                        <Input
                                            onChange={(event) => onChange(event)}
                                            type="password"
                                            name="password"
                                            style={{ height: 50, fontSize: '1.2em' }}
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
