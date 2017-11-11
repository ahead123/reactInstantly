const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const SERVER = {
	app: express(),
	port: process.env.PORT || 3000,
	static: function(req, res) {
		res.sendFile('/build/index.html');
	}
};

// Webserver
SERVER.app.use(express.static(path.join(__dirname, 'build')));
SERVER.app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});



SERVER.app.get('/*', SERVER.static);

// Start server
SERVER.app.listen(SERVER.port, () => {
	console.log(`Port ${SERVER.port} is lit fam 🔥 🔥 🔥`);
});
