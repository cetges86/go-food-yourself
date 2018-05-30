$(document).ready(function () {

  $.get("/api/ingredients", function (data) {

    console.log(data);
    
    for (var i = 0; i < data.length; i++) {
      category = data[i].category;
      if (category === "Protein") {
        $('#ing').append(`
          <option value="${i+1}">${data[i].name}</option>`);
      };

      if (category === "Dairy") {
        $('#dairy').append(`
        <option value="${i+1}">${data[i].name}</option>`);
      };
      if (category === "Produce") {
        $('#produce').append(`
        <option value="${i+1}">${data[i].name}</option>`);
      };
      if (category === "Grains") {
        $('#grains').append(`
        <option value="${i+1}">${data[i].name}</option>`);
      };
      if (category === "Spices/Seasoning/Condiments") {
        $('#seasoning').append(`
        <option value="${i+1}">${data[i].name}</option>`);
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

    $.get("/search/", ings).
      then(function (res) {
        console.log(res)
        $('#results').append("<h1> " + res[0].name + "</h1>")
        $('#results').append("<h1> " + res[1].name + "</h1>")
        $('#results').append("<h1> " + res[2].name + "</h1>")
      })

  })

});