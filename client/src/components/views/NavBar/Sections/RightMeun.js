import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

function RightMeun(props) {
    const [IsLogined, setIsLogined] = useState(false);

    useEffect(() => {
        Axios.get('/api/users/auth')
        .then(res => {
            if (res.data.isAuth) {
                setIsLogined(true);
            }
        });
    }, []);

    const loginAndOutHandler = () => {
        if (IsLogined) { // 로그인되어 있는 경우, 로그아웃 버튼
            Axios.get('/api/users/logout')
            .then(res => {
                if (res.data.success) {
                    setIsLogined(false);
                    props.history.push("/");
                } else {
                    alert("Error");
                }
            });
        } else { // 로그인되지 않은 경우, 로그인 버튼
            props.history.push('/login');
        }
    };

    const registerHandler = () => {
        props.history.push('/register');
    }

    return (
        <div style={{ float: 'right', marginTop: '20px' }}>
            <Button shape="round" style={{ margin: '0 5px' }} onClick={loginAndOutHandler}>
                { IsLogined ? "Logout" : "Login" }
            </Button>
            { !IsLogined && 
                <Button shape="round" style={{ margin: '0 5px' }} onClick={registerHandler}>Register</Button>
            }
        </div>
    )
}

export default withRouter(RightMeun)
