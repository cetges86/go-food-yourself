var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const db = require("./app/models");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, "/app/views/layouts/"),
  partialsDir: path.join(__dirname, "/app/views/partials/")
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "/app/views"));
// app.set('partials', path.join(__dirname, "/app/views/partials"))

// Import routes and give the server access to them.
require("./app/routes/apiroutes")(app);
require("./app/routes/htmlroutes")(app);

// Start our server so that it can begin listening to client requests.

db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
})
