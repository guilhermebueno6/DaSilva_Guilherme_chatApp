var express = require('express');
var app = express();
//import the socket.io
const io = require('socket.io')();
// instantiate the socket.io library right away with the () method -> makes it run 

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is all of our socket.io messaging functionality

//atach socket.io 
io.attach(server);

io.on('connection', function(socket) {
    console.log('user connected');

    //listen for a disconnection
    socket.on('disconnect', function() {
        console.log('a user disconnected');
    })
})