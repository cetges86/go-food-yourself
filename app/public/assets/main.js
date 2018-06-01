$(document).ready(function () {
  $('.parallax').parallax();

  //  parallax initilization with Jquery


  $.get("/api/ingredients", function (data) {

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
      if (category === "Spices/Seasoning/Condiments") {
        $('#seasoning').append(`
        <option value="${data[i].id}">${data[i].name}</option>`);
      };

    }
    $('select').formSelect();
  });

  $('.submit').on('click', function (event) {
    event.preventDefault();
    $('select').formSelect();
    let dairy = $('#dairy').val()
    let protein = $('#ing').val()
    let seasoning = $('#seasoning').val()
    let grains = $('#grains').val()
    let produce = $('#produce').val()

    let ings = [dairy.concat(protein).concat(seasoning).concat(grains).concat(produce)];
    console.log(ings)

    const reqObj = {
      id: ings
    }

    $.get("/search/", reqObj).
      then(function (res) {
        console.log(res)

        for (let i = 0; i < res.length; i++) {
          if (res[i].Ingredients.length != 0) {
            $('#results').append("<h1> Recipe Name: " + res[i].name + "</h1>")
            $('#results').append("<h4> Number of Ingredients you have: " + res[i].Ingredients.length + "</h4>")

          }
        }
      })

  })

  $('#post').on('click', function (event) {
    event.preventDefault();
    $('select').formSelect();

    $.get("/api/ingredients", function (data) {
      let ingredients = data;
    })

    let dairy = $('#dairy').val()
    let protein = $('#ing').val()
    let seasoning = $('#seasoning').val()
    let grains = $('#grains').val()
    let produce = $('#produce').val()

    let ings = [dairy.concat(protein).concat(seasoning).concat(grains).concat(produce)];
    console.log(ings)

    let name = $('#name').val();
    let numberOfIng = $('#numberOfIng').val();
    let link = $('#link').val();

    ingArray = [];
    ings.forEach(ing => {
      let recipe_ing = {
        name: ing.name,
        category: ing.category,
        important: ing.important
      }

      ingArray.push(recipe_ing);

    });

    const reqObj = {
      name: name,
      numberOfIng: numberOfIng,
      link: link,
      Ingredients: ingArray
    }

    console.log(reqObj);

    $.post("/api/recipe", reqObj)
      .then(function(res) {
        console.log(res);
      })



  })
});