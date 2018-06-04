$(document).ready(function () {
  
  let ingredients = [];
  $('.parallax').parallax();
  $('#newIng').hide();
  $('#headline').hide();
  $('#dropdowns').css("opacity", 0)
  $('.submit').css("opacity", 0)

  $('#addIng').on('click', function (event) {
    event.preventDefault();
    $('#newIng').show(1000);
  })

  $("#dropdowns").waypoint(function () {
    $('#dropdowns').addClass('bounceInUp');
    $('#dropdowns').css("opacity", 1);
  },
    { offset: '65%' });

  $(".submit").waypoint(function () {
    $('.submit').addClass('lightSpeedIn');
    $('.submit').css("opacity", 1)
  },
    { offset: '60%' });

  $('#submitIng').on('click', function (event) {
    let ingName = $('#ingName').val();
    let ingCategory = $('#ingCategory').val();

    let newIng = {
      name: ingName,
      category: ingCategory
    }

    $.post("/api/ingredients", newIng)
      .then(function (res) {
        console.log(res);
        $('#message').append(`<p>Ingredient Added!</p>
            `)
      })
  })

  $.get("/api/ingredients", function (data) {
    ingredients = data;
    console.log(data);

    for (var i = 0; i < data.length; i++) {
      category = data[i].category;
      if (category === "Protein") {
        $('#ing').append(`
          <option value="${data[i].id}">${data[i].name}</option>`);
      };

      if (category === "Dairy") {
        $('#dairy').append(`
        <option value="${data[i].id}">${data[i].name}</option>`);
      };
      if (category === "Produce") {
        $('#produce').append(`
        <option value="${data[i].id}">${data[i].name}</option>`);
      };
      if (category === "Grains") {
        $('#grains').append(`
        <option value="${data[i].id}">${data[i].name}</option>`);
      };
      if (category === "Sauces/Condiments/Seasonings") {
        $('#seasoning').append(`
        <option value="${data[i].id}">${data[i].name}</option>`);
      };

    }
    $('select').formSelect();
  });

  // Submit click event
  $('.submit').on('click', function (event) {
    event.preventDefault();
    $('select').formSelect();

    let dairy = $('#dairy').val()
    let protein = $('#ing').val()
    let seasoning = $('#seasoning').val()
    let grains = $('#grains').val()
    let produce = $('#produce').val()

    // Store all potential ingredients in ings array
    let ings = [dairy.concat(protein).concat(seasoning).concat(grains).concat(produce)];
    console.log(ings)


    const reqObj = {
      id: ings
    }

    console.log(JSON.stringify(reqObj));

    $.get("/search", reqObj).
      then(function (res) {
        console.log(res)

        $('#dropdowns').hide(2000);
        $('#headline').show(1000);

        // Search through recipes database and display results
        for (let i = 0; i < res.length; i++) {
          if (res[i].Ingredients.length != 0) {
            let percent = ((res[i].Ingredients.length / res[i].numberOfIng) * 100).toFixed(2);
            
            $('#results').append("<h3> Recipe Name: " + res[i].name + "</h3>")
            $('#results').append("<h4> Number of Ingredients you have: " + res[i].Ingredients.length + "</h4>")
            $('#results').append(`<h6>  ${percent}% Complete! </h6>`)
            for (let j = 0; j < res[i].Ingredients.length; j++) {
              $('#results').append("<h6> Matched Ingredient: " + res[i].Ingredients[j].name + "</h6>")
            }
            $('#results').append(`<h6>Full Recipe <a href="${res[i].link}">Link </a></h6>`)

          }
        }

      })

  })

  // Post a recipe
  $('#post').on('click', function (event) {
    event.preventDefault();
    $('select').formSelect();

    let dairy = $('#dairy').val()
    let protein = $('#ing').val()
    let seasoning = $('#seasoning').val()
    let grains = $('#grains').val()
    let produce = $('#produce').val()

    let ings = dairy.concat(protein).concat(seasoning).concat(grains).concat(produce);
    console.log("ing " + ings)

    let name = $('#name').val();
    let numberOfIng = $('#numberOfIng').val();
    let link = $('#link').val();

    ingArray = [];
    buildIngArray = (ings) => {
      for (i = 0; i < ings.length; i++) {
        console.log(ings);
        if (i == 0) {
          let recipe_ing = {
            name: ingredients[ings[i] - 21].name,
            category: ingredients[ings[i] - 21].category
          }

          ingArray.push(recipe_ing);
          console.log("ing " + JSON.stringify(ingArray))

        } else {
          let recipe_ing = {
            name: ingredients[ings[i] - 21].name,
            category: ingredients[ings[i] - 21].category
          }

          ingArray.push(recipe_ing);
          console.log("ing " + JSON.stringify(ingArray))
        }


      }
    }

    buildIngArray(ings)

    submitRecipe = (ingArray) => {
      const reqObj = {
        name: name,
        numberOfIng: numberOfIng,
        link: link,
        Ingredients: ingArray
      }

      console.log("post obj" + JSON.stringify(reqObj));

      $.post("/api/recipe", reqObj)
        .then(function (res) {
          console.log(res);
        })

    }
    submitRecipe(ingArray);

  });
});

