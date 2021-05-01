// User.js
const mongoose = require("mongoose");

// 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // John ahn@naver.com -> 중간의 space 없애줌
        unique: 1 // 같은 이메일 사용 불가
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자, 일반 유저... 등의 권한
        type: Number, // 숫자값에 따라 일반 유저, 관리자 등 지정
        default: 0
    },
    image: String,
    token: { // 유효성 관리
        type: String 
    }, 
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

// 스키마를 모델로 감싸기
const User = mongoose.model("User", userSchema);

// 모델을 다른 파일에서 사용 가능하도록
module.exports = { User };