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
    db.Recipe.findAll({ include: [{ model: db.Ingredients }] }).then(function (results) {
      res.json(results);
    })
  });

  app.get("/search", function (req, res) {
    //req.body is our object with our form data, stored in ingredients array
    //let ings = (Object.keys(req.query));

    console.log(req.query)

    // ings.forEach(function (name) {
    //   const query = db.Ingredients.findAll({
    //     where: {
    //       name: name
    //     },
    //   }).then(function (results) {
    //console.log(results[0].dataValues.id)
    for (let i = 0; i < req.query.id.length; i++) {
      const query =
        db.Recipe.findAll({
          include: [{
            model: db.Ingredients,
            through: {
              attributes: ['ingredient_id'],
              where: { recipe_id: req.query.id[i] }
            },
          }]
        }).then((recipes) => {

          console.log("final recipes array " + JSON.stringify(recipes));
          console.log("----------------");
          res.json(recipes);
          return recipes;
        })
    }
  });


  //   });

  // });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/recipe", function (req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user

    console.log(req.body);
    const ingredients = req.body.Ingredients;
    console.log(ingredients)

    
    let recipe_ing = []
    
    ingredients.forEach(ing => {
      db.Ingredients.findOrCreate({ where: { name: ing.name, category: ing.category, important:ing.important } })
      .then((ingredients) => {
        console.log("promise results: " + JSON.stringify(ingredients));
        recipe_ing.push(ingredients)
        createRecipe(ingredients);
      })
      .catch((err) => {
        console.log(err)
      })
    });
    
    const recipe_components = {
      name: req.body.name,
      numberOfIng: req.body.numberOfIng,
      link: req.body.link,
      Ingredients: recipe_ing
    }
    //**working sequelize query to create recipe**
    createRecipe = () => 
    
    db.Recipe.create(recipe_components,
      { include: { model: db.Ingredients } }
    )
      .then(function (recipe) {
        res.json(recipe);

      }).catch(err => {
        console.log(err);
      });

    //**TEST STUFF */
    // ingredients.forEach(ing => {
    //   db.Ingredients.find({ where: { name: ing.name } }).on('success', function (recipe) {
    //     db.Recipe.find({ where: { id: req.body.id } }).on('success', function (addIng) {
    //       recipe.setIngredients([addIng]);
    //     });
    //   });
    // });
    //});
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
