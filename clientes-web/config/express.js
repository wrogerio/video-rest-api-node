// Requires
const express = require('express');
const config = require('config');
const path = require('path');
const router = require('../src/routes/routes');

module.exports = () => {
	// setup App
	const app = express();
	app.set('port', process.env.PORT || config.get('server.port'));

	// middlewares
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(express.json({ type: 'application/json' }));

	// Routes
	app.use(router);

	// static routes
	app.use('/estilos', express.static(path.join(__dirname, '../src/assets/css')));
	app.use('/scripts', express.static(path.join(__dirname, '../src/assets/js')));
	app.use('/imagens', express.static(path.join(__dirname, '../src/assets/img')));
    app.use('/lib', express.static(path.join(__dirname, '../src/assets/lib')));

	// view engine
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '../src/views'));

	// return
	return app;
};
