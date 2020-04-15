const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
console.log(process.env.URL);
app.use(cors({
    origin: process.env.URL
}));

app.get('/', (req, res) => {
    res.send({
        test: 'hello'
    })
});

io.on('connection', (socket) => {
    socket.on('create_game', slug => {
        console.log(`Creating game: ${slug}`);
        socket.join(slug);
    });

    socket.on('join_game', data => {
        socket.join(data.slug);
        io.to(data.slug).emit('user_joined', data.name);
    });
    socket.on('leave_game', data => {
        io.to(data.slug).emit('user_left', data.name);
    });

    socket.on('number_called', data => {
        io.to(data.slug).emit('number_called', data.ball);
    })
})

http.listen(4444, '0.0.0.0');
