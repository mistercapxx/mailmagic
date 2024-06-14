// const http = require("node:http");
// const url = require('url');

// const PORT = 3050;

// const server = http.createServer((req, res) => {
//     console.log('Получил запрос');
//     const parsedUrl = url.parse(req.url, true);
//     const pathname = parsedUrl.pathname;
//     console.log(parsedUrl);
//     console.log(pathname);
//     if (pathname === '/api/routers/email') {
//         res.setHeader('Content-Type', 'application/json');
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Установка заголовка Access-Control-Allow-Origin
//         if (req.method === 'OPTIONS') {
//             // Если метод запроса OPTIONS, то отправляем заголовки для предварительного запроса
//             res.setHeader('Access-Control-Allow-Methods', 'GET');
//             res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//             res.writeHead(200);
//             res.end();
//         } else {
//             // Если это не OPTIONS, то отправляем данные
//             res.statusCode = 200;
//             res.end(JSON.stringify({ email: 'vasya' }));
//         }
//     } else {
//         res.statusCode = 404;
//         res.end('Not Found');
//     }
// });

// server.listen(PORT, () => console.log(`Сервер запущен! Порт http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');

const PORT = 3050;
const app = express();

app.use(cors());

app.get('/api/routers/email', (req, res) => {
    console.log('Получил запрос');
    res.setHeader('Content-Type', 'application/json');
    res.send('vasya');
});


app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен! Порт http://localhost:${PORT}`);
});