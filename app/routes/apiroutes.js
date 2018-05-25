// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const express = require('express')

// Requiring our Todo model
var db = require("../models");
const router = express.Router();
const app = express();

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the todos
  app.get("/api/ingredients", function (req, res) {
    // Write code here to retrieve all of the todos from the database and res.json them
    // back to the user
    db.Ingredients.findAll().then(function (results) {
      res.json(results);
    })
  });

  app.get("/api/recipe", function (req, res) {
    // Write code here to retrieve all of the todos from the database and res.json them
    // back to the user
    db.Recipe.findAll({include: [{model: db.Ingredients }]}).then(function (results) {
      res.json(results);
    })
  });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/recipe", function (req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user

    console.log(req.body);
    const ingredients = req.body.Ingredients;
    db.Recipe.create(req.body, {include: {model: db.Ingredients}}).then(function (recipe) {
      // const addIngredients = ingredients.map(ing => recipe.addIngredients(ing));
      // return Promise.all(addIngredients)
      //   .then(() => res.json(recipe));
      res.json(recipe);
    })
    .catch(err => {
      console.log(err);
    });

  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/recipe/:id", function (req, res) {

    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.end();
    })
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/recipe", function (req, res) {
    db.Recipe.update({
        //needs to be changed for recipe data
      text: req.body.text,
      complete: req.body.complete
    }, {
        where: { id: req.body.id }
      }).then(() => {
        res.end();
      })
  });
};
