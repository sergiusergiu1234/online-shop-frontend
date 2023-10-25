import { useRef, useState, useEffect } from "react"
import '../Styles/Register.css';
import axios from "../api/axios";

//validate user input fields
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const REGISTER_URL = 'users/signup';
const NAME_REGEX= /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/ 
const MOBILE_REGEX = /^0\d{9}$/


const Register = () => {
 
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('');               //edited by user input field
    const [validName, setValidName] = useState(false);  //name validates or not
    const [userFocus, setUserFocus] = useState(false);  //we have focus on the input field or not

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFOcus,setFirstNameFocus]=useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFOcus,setLastNameFocus]=useState(false);

    const [phoneNumber,setPhoneNumber] = useState('');
    const [validPhoneNumber,setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current)
            userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(()=>{
        const result = NAME_REGEX.test(firstName);
        console.log(result)
        console.log(firstName)
        setValidFirstName(result);
    },[firstName])

    useEffect(()=>{
        const result = NAME_REGEX.test(lastName);
        console.log(result)
        console.log(lastName)
        setValidLastName(result);
    },[firstName])

    useEffect(()=>{
        const result = MOBILE_REGEX.test(phoneNumber);
        console.log(result)
        console.log(phoneNumber)
        setValidPhoneNumber(result);
    },[lastName])


    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])      //every time user changes user/pwd/matchpwd, it means that user has read the error message and we delete it

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({username: user, password: pwd, email: email,firstName,lastName,phoneNumber}),{
                    headers : { 'Content-Type': 'application/json'}
                }
            );
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear input fields

        }catch (err:any) {
            if(!err?.response){
                setErrMsg('No server response');
            }else if(err.response?.status === 409 ){
                setErrMsg('Username Taken');
            }else{
                setErrMsg('Registration Failed!')
            }
          
        }
    }

    return (
        <div className="page">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/LoginPage">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="section">
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                    >
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.currentTarget.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            className={
                                userFocus && user && !validName ? "instructions" : "offscreen"
                            }
                        >
                            Username must be 4 to 24 characters.
                            <br />
                            It must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => {
                                setEmailFocus(true);
                            }}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p
                            className={
                                emailFocus && email && !validEmail
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            Invalid email!
                        </p>


                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            onFocus={() => {
                                setFirstNameFocus(true);
                            }}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        

                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            onFocus={() => {
                                setLastNameFocus(true);
                            }}
                            onBlur={() => setLastNameFocus(false)}
                        />
                      
                      <label htmlFor="phoneNumber">Phone number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            onFocus={() => {
                                setPhoneNumberFocus(true);
                            }}
                            onBlur={() => setPhoneNumberFocus(false)}
                        />
                      

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                        >
                            Password must be 8 to 24 characters.
                            <br />
                            It must include at least one uppercase and 
                            <br/>
                             lowercase letter, a
                            number and a special character.
                            <br />
                            Allowed special characters: ! @ # $ %
                        </p>
                        <label htmlFor="confirm_password">Confirm password:</label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            className={
                                matchFocus && !validMatch ? "instructions" : "offscreen"
                            }
                        >
                            Passwords don't match!
                        </p>
                        <button
                            disabled={!validName || !validPwd || !validMatch ? true : false}
                        >
                            Sign up
                        </button>
                        <p>
                            Already registered?<br></br>
                            <a href="/LoginPage">Sign In </a>
                        </p>
                    </form>
                </section>
            )}
        </div>
    );
}

export default Register;

