var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

function getContacts(res){
  Contact.find()
    .populate('group')
    .exec(function(err, contacts){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        contact: "success",
        obj: contacts
      });
    });
}

function saveContact(res, con) {

  if (con.group && con.group.length > 0) {
    for (let groupContact of con.group) {
      groupContact = groupContact._id;
    }
  }

  var response = res;
  Contact.save(function (err, con) {
      response.setHeader('Content-Type', "application/json");
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      getContacts(response);
    });
}

function deleteContact(res, con) {
  var response = res;
  Contact.remove(function (err, contacts) {
      if(err) {
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      getContacts(response);
    })
}

router.get('/', function (req, res, next) {
  getContacts(res);
})

router.post('/', function (req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imgUrl: req.body.imgUrl,
    group: req.body.group
  });
  saveContact(res, contact);
});

router.patch('/:id', function (req, res, next) {
  Contact.findOne({id: req.params.id}, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imgUrl = req.body.imgUrl;

    saveContact(res, contact);
  });

});

router.delete('/:id', function (req, res, next) {
  var query = {id: req.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contactId: req.params.id}
      });
    }

    deleteContact(res, contact);
  });
});
