const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');
const app = express();




//Init middleware for logger
app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Body perser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Home page route
app.get('/', (req, res)=> res.render('index', {title: 'Member App', members}));


//Member API routes
app.use('/api/members', require('./routes/api/member'));

app.get('/', (req, res) => {
    res.send('<h1>Hello express</h1>');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

console.log('Express is working');