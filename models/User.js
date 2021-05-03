// User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // 암호화에 이용
const saltRounds = 10;

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
});

userSchema.pre("save", function(next) {
    let user = this; // userSchema 가리킴

    if (user.isModified("password")) { // 비밀번호가 변경될 때만 실행
        // 비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else { // 비밀번호가 변경되지 않을 때는 그냥 save 함수로 값 넘기기
        // 이 부분이 없으면 save 함수로 넘어가지 못함, 계속 pre 함수에서 머묾
        next();
    }
});

// 스키마를 모델로 감싸기
const User = mongoose.model("User", userSchema);

// 모델을 다른 파일에서 사용 가능하도록
module.exports = { User };