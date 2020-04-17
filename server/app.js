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

let playersCount = [];
let hostsConnected = [];

io.on('connection', (socket) => {

    socket.on('create_game', slug => {
        socket.join(slug);

        playersCount[slug] = 0;
        io.to(slug).emit('player_count', playersCount[slug]);

        hostsConnected[slug] = true;
        io.to(slug).emit('host_connection', hostsConnected[slug]);

        console.log(hostsConnected);
    });

    socket.on('initial_join', slug => {
        socket.join(slug);

        if(!hostsConnected[slug]) {
            hostsConnected[slug] = false;
        }
        io.to(slug).emit('host_connection', hostsConnected[slug]);
    });

    socket.on('join_game', data => {
        socket.join(data.slug);
        io.to(data.slug).emit('user_joined', data.name);

        console.log(playersCount);
        playersCount[data.slug]++;
        io.to(data.slug).emit('player_count', playersCount[data.slug]);

        if(!hostsConnected[data.slug]) {
            hostsConnected[data.slug] = false;
        }
        io.to(data.slug).emit('host_connection', hostsConnected[data.slug]);
    });

    socket.on('leave_game', data => {
        io.to(data.slug).emit('user_left', data.name);

        if(playersCount[data.slug] > 0) {
            playersCount[data.slug]--;
        }
        io.to(data.slug).emit('player_count', playersCount[data.slug]);
    });

    socket.on('number_called', data => {
        io.to(data.slug).emit('number_called', data.ball);
    });

    socket.on('new_game', data => {
        io.to(data.previous).emit('new_game', data.new);
    });

    socket.on('host_left', slug => {
        io.to(slug).emit('clear_room', slug);
        // io.of('/').in(slug).clients((e, socketIds) => {
        //     socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(slug));
        // });
        hostsConnected[slug] = false;
        playersCount[slug] = 0;
        io.to(slug).emit('host_connection', hostsConnected[slug]);
    });
})

http.listen(4444, '0.0.0.0');
