$(document).ready(function () {

  $.get("/api/ingredients", function (data) {

    console.log(data);
    //TRAVIS CHECK THIS OUT!
    for (var i = 0; i < data.length; i++) {
      category = data[i].category;
      if (category === "Protein") {
        $('#ing').append(`
          <option value="${i+1}">${data[i].name}</option>`);
      };
    }
    $('select').formSelect();
  });

  $('.submit').on('click', function (event) {
    event.preventDefault();

    let ings = [{ name: "Cheese" }, { name: "Pasta Sauce" }, { name: "Rice" }];

    console.log(ings)
    $.get("/search/", ings).
      then(function (res) {
        console.log(res)
        $('#results').append("<h1> " + res[0].name + "</h1>")
        $('#results').append("<h1> " + res[1].name + "</h1>")
        $('#results').append("<h1> " + res[2].name + "</h1>")
      })

  })

});