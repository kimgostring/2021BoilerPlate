import React, {useEffect} from 'react';
import axios from "axios";

function LandingPage() {
    // LandingPage에 들어오자 마자 실행됨
    useEffect(() => {
        // get request server에 보냄 (port 3000으로)
        axios.get("/api/hello")
        // 요청을 통해 server로부터 받아온 response를 console에 출력
        .then(res => console.log(res.data));
    }, []);
    
    return (
        <div>
            LandingPage
        </div>
    );
}

export default LandingPage
