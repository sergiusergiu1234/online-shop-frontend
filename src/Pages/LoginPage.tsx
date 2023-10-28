import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../Styles/Login.css';
import InputGroup from "react-bootstrap/esm/InputGroup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

const LOGIN_URL = '/users/signin';

const LoginPage = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
 

    useEffect(() => {
        if (userRef.current) userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const accessToken = response?.data?.token; 
            let roles = response?.data?.role;
            //save login response to local storage 
            await  window.sessionStorage.setItem("accessToken", accessToken);
            await  window.sessionStorage.setItem("roles", roles);
            await  window.sessionStorage.setItem("user", user);
            
            if (roles) {
                roles = roles.split(',');
              }
            console.log(response.data)

            setAuth({ user, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, {replace: true});

            const token = window.sessionStorage.getItem("accessToken");;
            fetch('https://slope-emporium-app-b7686b574df7.herokuapp.com/favorites',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
          
            .catch(error => console.log(error));

        } catch (err:any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            
        }
    }

    return (
       
        <div className="login-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
        </p>
    
        <Form onSubmit={handleSubmit} className="inputs">
        <h1 className="title">Sign In</h1>
            <InputGroup className="mb-3">
                <InputGroup.Text className="basic-addon">@</InputGroup.Text>
                <Form.Control
                className="username-field"
                placeholder="Username"
                type="text"
                id="username"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                <Form.Control
                placeholder="*********"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                />
            </InputGroup>

            <Button variant="success" type="submit">Sign In</Button>
            <p>
                        Don't have an account? <br />
                        <a className="signup-ref" href="/Register">Sign Up</a>
                    </p>
                    </Form>
                    <div className='ribbon'></div>
                </div>
    );
};
export default LoginPage;
