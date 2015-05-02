var _ = require('underscore')
var path = require('path')
var express = require('express')
var app = module.parent.exports.app

_.each([
  'html', 'css', 'images', 'js', 'plugin'
], function(dir){
  app.use('/' + dir, express.static(path.resolve(
    __dirname, '..', dir
  )))
})

_.each([
  'index.html', 'main.html'
], function(file){
  app.get('/' + file, function(req, res){
    res.sendFile(path.resolve(
      __dirname, '..', file
    ))
  })
})

app.get('/', function(req, res){
  res.sendFile(path.resolve(
    __dirname, '..', 'index.html'
  ))
})