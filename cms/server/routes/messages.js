var express = require('express');
var router = express.Router();

var Messages = require('../models/message');

function getMessages(res){
  Message.find()
    .exec(function(err, messages){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        message: "success",
        obj: messages
      });
    });
}

function saveMessage(res, mes) {
  var response = res;
  Message.save(function (err, mes) {
    response.setHeader('Content-Type', "application/json");
    if(err){
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
    getMessages(response);
  });
}

function deleteMessage(res, mes) {
  var response = res;
  Contact.remove(function (err, messages) {
    if(err) {
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
    getMessages(response);
  })
}

router.get('/', function (req, res, next) {
  getMessages(res);
})

router.post('/', function (req, res, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  saveMessage(res, message);
});

router.patch('/:id', function (req, res, next) {
  Message.findOne({id: req.params.id}, function (err, messsage) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message not found'}
      });
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message);
  });

});

router.delete('/:id', function (req, res, next) {
  var query = {id: req.params.id};

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'No message Found!',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {MessageId: req.params.id}
      });
    }

    deleteMessage(res, message);
  });
});
