const express 	= require('express');
const hbs 		= require('hbs');
const fs 		= require('fs');

const port	= process.env.PORT || 3100;
var app 	= express();

//--Setting Partials along with middleware directory// 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//---MiddleWare for Testing//
app.use((request, response, next) => {
	var now = Date().toString();
	var log = (`${now} . ${request.method}, ${request.url}`);
	
	fs.appendFile('Server.log', log + '\n' , (err) => {
		if(err){
			console.log('Unable to Append File');
		}
	} );

	next();

});

hbs.registerHelper('getDate', () => {
	var date = new Date().getFullYear() + ' New';
	return date;
});


app.get('/', (request, response) =>{
response.render('home.hbs', {
	pageTitle: "Home Page",
	welcomeMessage:"Hello User, Welcome to Home Page"
});
});

app.get('/about', (request, response) =>{
response.render('about.hbs', {
	pageTitle: 'About Page'
});

});
app.get('/Error_page', (request, response)=>{
	response.send({
		errorMessage: "This is Error Page"
	})
});

app.listen(port, () => {
	console.log(`Server is listening at ${port}`);
});