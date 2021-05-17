import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPW, setConfirmPW] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPWHandler = (event) => {
        setConfirmPW(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
    
        if (Password !== ConfirmPW) {
            return alert("비밀번호가 일치하지 않습니다. ");
        }
        
        let body = {
            email: Email,
            name: Name,
            password: Password
        };

        dispatch(registerUser(body)) 
            .then(res => { 
                if(res.payload.success) {
                    props.history.push('/login');
                } else {
                    alert("Error");
                }
            }); 
    };
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" onChange={onEmailHandler} /> 
                <label>Name</label>
                <input type="text" onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" onChange={onConfirmPWHandler} />
                <br />

                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterPage
