const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 4000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	
	
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
	
	next();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});
	
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on the port ${PORT}`);
});
