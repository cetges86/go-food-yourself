// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
  });

  app.get("/recipe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/assets/newrecipe.html"));
  });

  app.get("/app/public/assets/css/style.css", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/css/" + "style.css");
  });

  app.get("/app/public/assets/css/animate.css", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/css/" + "animate.css");
  });

  app.get("/app/public/assets/images/img_0366.jpg", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/images/" + "img_0366.jpg");
  });
  
  app.get("/app/public/assets/main.js", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/" + "main.js");
  });
  app.get("/app/public/assets/js/jquery.waypoints.js", function (req, res) {
    res.sendFile(process.cwd() + "/app/public/assets/js/" + "jquery.waypoints.js");
  });

};
