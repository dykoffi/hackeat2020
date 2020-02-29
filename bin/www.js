var app = require('../app');
var debug = require('debug')('serveur:server');
var http = require('http');
var fetch = require('node-fetch')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '9999');
app.set('port', port);

/**nb g
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
var io = require("socket.io").listen(server)
io.sockets.on("connection", function (socket, pseudo) {
    console.log("un user c'est connecte")
    socket.on("check", (jour, per, id) => {
        fetch(`https://technohack20.herokuapp.com/api/eat/check/participant/${jour}/${per}/${id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err)
                socket.emit("checkBad")
            })
            .then(json => {

                console.log(json)
                if (json.participant) {
                    if (json.can_eat) {
                        socket.emit("checkOk", json)
                    } else {
                        socket.emit("checkOkcant", json)
                    }
                } else {
                    socket.emit("checkBad")
                }
            });
    })

    socket.on("valider", (jour, per, id) => {
        fetch(`https://technohack20.herokuapp.com/api/eat/register/participant/${jour}/${per}/${id}`)
            .then(res => res.json())
            .catch(err => {
                console.log(err)
            })
            .then(json => {
                fetch(`https://technohack20.herokuapp.com/api/eat/check/participant/${jour}/${per}/${id}`)
                    .then(res => res.json())
                    .catch(err => {
                        console.log(err)
                        socket.emit("checkBad")
                    })
                    .then(data => {
                        if (json.success) {
                            if (data.participant) {
                                if (data.can_eat) {
                                    socket.emit("checkOk", data)
                                } else {
                                    socket.emit("checkOkcant", data)
                                }
                            } else {
                                socket.emit("checkBad")
                            }
                            socket.emit("validOk", json.message)
                        } else {
                            socket.emit("validBad", json.message)
                        }
                    });

            });
    })
})

module.exports = io
