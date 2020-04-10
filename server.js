const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/', (req, res) => {
    res.send({
        test: 'hello'
    })
});

io.on('connection', (socket) => {
    socket.on('join_game', slug => {
        console.log(slug);
        socket.join(slug);
    });

    socket.on('send_message', data => {
        socket.in(data.slug).emit('message', 'test message!');
    })
})

http.listen(4444, '0.0.0.0');
