var app = require('../app');
var debug = require('debug')('serveur:server');
var http = require('http');
var fs = require('fs')

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
var mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'dy',
    password: '1234',
    database: 'xwork'
})
var io = require("socket.io").listen(server)
io.sockets.on("connection", function (socket, pseudo) {
    console.log("un user c'est conneccte")
    
})
module.exports = io