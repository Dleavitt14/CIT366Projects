var express = require('express');
var router = express.Router();

var Documents = require('../models/document');

function getDocuments(res){
  Document.find()
    .exec(function(err, documents){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        document: "success",
        obj: documents
      });
    });
}

function saveDocument(res, doc) {
  var response = res;
  Document.save(function (err, doc) {
    response.setHeader('Content-Type', "application/json");
    if(err){
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
    getDocuments(response);
  });
}

function deleteDocument(res, doc) {
  var response = res;
  Contact.remove(function (err, documents) {
    if(err) {
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
    getDocuments(response);
  })
}

router.get('/', function (req, res, next) {
  getDocuments(res);
})

router.post('/', function (req, res, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  saveDocument(res, document);
});

router.patch('/:id', function (req, res, next) {
  Document.findOne({id: req.params.id}, function (err, document) {
    if (err || !document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {document: 'Document not found'}
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  });

});

router.delete('/:id', function (req, res, next) {
  var query = {id: req.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {documentId: req.params.id}
      });
    }

    deleteDocument(res, document);
  });
});
