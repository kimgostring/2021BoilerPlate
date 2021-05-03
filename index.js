// index.js 
// 백엔드 시작점
const express = require('express'); // 다운받은 express 모듈 가져옴 
const app = express(); // 모듈의 함수를 통해 새 express 앱 생성
const port = 5000; // 몇 번이든 상관 없음
// 이 위치를 listen으로 연결했을 때 해당 위치로 가면 앱 실행

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User"); // user model 가져오기

// body parser에 옵션 주기
// application/x-www-form-urlencoded -> 이렇게 생긴 데이터를 분석하여 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true})); 
// application/json -> 이러한 타입을 분석하여 가져올 수 있게 해줌
app.use(bodyParser.json()); 
app.use(cookieParser());

const config = require('./config/key'); // key.js 파일 추가
const mongoose = require('mongoose');
mongoose.connect(config.mongoPri.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // error 안 뜨게 해 주는 구문
}).then(() => console.log('MongoDB Connected...')) // 연결 잘 됐는지 확인
  .catch(err => console.log(err)); // 연결 안 된 이유 확인

// 저번에 만든 아주 간단한 라우트
app.get('/', (req, res) => {
  res.send('Hello World! 저장하면 자동으로 서버가 꺼졌다 켜짐');
}); // root dir에 가면 해당 글귀 출력

// 회원가입을 위한 라우트
app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어줌
  // 1. user model 가져와 인스턴스 만들기
  // body parser가 req.body 안에 정보 들어있을 수 있게 해줌, cilent의 정보를 req.body로 받아옴
  const user = new User(req.body); // req.body 안에 json 형식의 정보 들어있음
  // 2. mongoDB에 저장
  user.save((err) => { // mongoDB의 메소드
    if (err) // 에러 있을 때, client에 err 있다고 json 형식으로 전달
      return res.json({ 
        success: false, 
        err: err
      });
    // 성공했을 때, status(200)은 성공했다라는 표시
    return res.status(200).json({
      success: true
    })
  }); 
})

// 로그인을 위한 라우트
app.post('/login', (req, res) => {
  // 1. 요청된 email을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if(!userInfo) return res.json({
      loginSuccess: false,
      message: "제공된 이메일에 해당하는 유저가 없습니다. "
    })

    // 2. 요청한 email이 있다면, 비밀번호가 같은지 확인
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      // 비밀번호 틀린 경우
      if (!isMatch) return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다. "
      });

      // 비밀번호 맞은 경우
      // 3. 비밀번호가 일치하면, 유저를 위한 token 생성
      userInfo.genToken((err, userInfo) => {
        if (err) return res.status(400).send(err); // 400, 오류 있음 클라이언트에 전달

        // token을 받아옴, 여러 곳에 저장 가능, 각기 장단점 존재 => 쿠키, 로컬 스토리지, 세션...
        // 가장 안전한지에 대해서는 논란 많음, 여기서는 쿠키에다 저장하도록 함
        // 쿠키에다 하려면 쿠키파서 라이브러리 설치해야 함
        res.cookie("x_auth", userInfo.token) // 이름이 x_auth, 내용이 토큰인 쿠키 저장됨
        .status(200)
        .json({ 
          loginSuccess: true,
          userId: userInfo._id
        });
      });
    });
  });
});

app.listen(port, () => { // 해당 포트에서 앱 실행, 해당 앱이 5000을 listen하면 콘솔 출력 
// 브라우저를 통해 localhost::5000\에 접속하면, 위의 글귀를 볼 수 있음
  console.log(`Example app listening at http://localhost:${port}`);
});