const http = require("node:http")
const url = require('url')

//routers
const getEmail = require('./routers/email')

const PORT = 3050

let server = http.createServer((req, res) => {
    console.log('Получил запрос')
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname;
    console.log(parsedUrl)
    console.log(pathname)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ email: 'vasya' }));
})

server.listen(PORT, () => console.log(`Сервер запущен! Порт http://localhost:${PORT}`))
