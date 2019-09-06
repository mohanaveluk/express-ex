const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');
const app = express();




//Init middleware for logger
app.use(logger);

//Body perser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Member API routes
app.use('/api/members', require('./routes/api/member'));

app.get('/', (req, res) => {
    res.send('<h1>Hello express</h1>');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

console.log('Express is working');