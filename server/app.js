require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

const emailService = require('./mailer');

app.use(express.json());

app.use(cors({
    origin: process.env.URL || 'http://localhost:4200'
}));

app.post('/created-game', (req, res) => {
    emailService.sendGameCreated(req.body.email, req.body.slug).then(() => {
        res.send({
            gameUrl: `${process.env.URL}/game/${req.body.slug}`,
            controlUrl: `${process.env.URL}/control/${req.body.slug}`,
        });
    }).catch((e) => {
        console.log(e);
    });
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
    });

    socket.on('new_game', data => {
        io.to(data.previous).emit('new_game', data.new);
    })
})

http.listen(4444, '0.0.0.0');
