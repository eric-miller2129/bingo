const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send({
        test: 'hello'
    })
})

app.listen(1234);
