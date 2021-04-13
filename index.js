// index.js 
// 백엔드 시작점
const express = require('express') // 다운받은 express 모듈 가져옴 
const app = express() // 모듈의 함수를 통해 새 express 앱 생성
const port = 5000 // 몇 번이든 상관 없음
// 이 위치를 listen으로 연결했을 때 해당 위치로 가면 앱 실행

app.get('/', (req, res) => {
  res.send('Hello World!')
}) // root dir에 가면 해당 글귀 출력

app.listen(port, () => { // 해당 포트에서 앱 실행, 해당 앱이 5000을 listen하면 콘솔 출력 
// 브라우저를 통해 localhost::5000\에 접속하면, 위의 글귀를 볼 수 있음
  console.log(`Example app listening at http://localhost:${port}`)
})