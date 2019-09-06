const express = require('express');
const path = require('path');
const members = require('./members');
const logger = require('./middleware/logger');
const app = express();




//Init middleware for logger
app.use(logger);
//Get all members
app.get('/api/members', (req, res) => res.json(members));

//Get single members
app.get('/api/member/:id', (req, res) => {
  //res.send(req.params.id);
  var found = members.some(member => member.id === parseInt((req.params.id)));

  if(found){
    res.json(members.filter(member => member.id == parseInt(req.params.id)));
  }
  else
  {
    res.status(400).json({msg:`member not found for id ${req.params.id}`});
  }
});

app.get('/', (req, res) => {
    res.send('<h1>Hello express</h1>');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

console.log('Express is working');