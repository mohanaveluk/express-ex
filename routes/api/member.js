const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');


//Get all members
router.get('/', (req, res) => res.json(members));

//Get single members
router.get('/:id', (req, res) => {
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

//Create member
router.post('/', (req, res) => {
  //res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status:'active'
  };

  if(!newMember.name || !newMember.email)
  {
    return res.status(400).json({msg:'Please enter name and email'});
  }

  members.push(newMember);
  //res.json(members);
  res.redirect('/');

});

//Update Member
router.put('/:id', (req, res) => {
  //res.send(req.params.id);
  var found = members.some(member => member.id === parseInt((req.params.id)));

  if(found){
    const updMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id))
      {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({msg:'Member has updated', member});
      }
    });
  }
  else
  {
    res.status(400).json({msg:`member not found for id ${req.params.id}`});
  }
});

//Delete a  member
router.delete('/:id', (req, res) => {
  //res.send(req.params.id);
  var found = members.some(member => member.id === parseInt((req.params.id)));

  if(found){
      res.json({msg: 'Member has deleted', 
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  }
  else
  {
    res.status(400).json({msg:`member not found for id ${req.params.id}`});
  }
});

module.exports = router;

//api route comment been added
