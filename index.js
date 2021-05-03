// index.js 
// 백엔드 시작점
const express = require('express'); // 다운받은 express 모듈 가져옴 
const app = express(); // 모듈의 함수를 통해 새 express 앱 생성
const port = 5000; // 몇 번이든 상관 없음
// 이 위치를 listen으로 연결했을 때 해당 위치로 가면 앱 실행

const bodyParser = require("body-parser");
const { User } = require("./models/User"); // user model 가져오기

// body parser에 옵션 주기
// application/x-www-form-urlencoded -> 이렇게 생긴 데이터를 분석하여 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true})); 
// application/json -> 이러한 타입을 분석하여 가져올 수 있게 해줌
app.use(bodyParser.json()); 

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
        err 
      });
    // 성공했을 때, status(200)은 성공했다라는 표시
    return res.status(200).json({
      success: true
    })
  }); 
})

app.listen(port, () => { // 해당 포트에서 앱 실행, 해당 앱이 5000을 listen하면 콘솔 출력 
// 브라우저를 통해 localhost::5000\에 접속하면, 위의 글귀를 볼 수 있음
  console.log(`Example app listening at http://localhost:${port}`);
});