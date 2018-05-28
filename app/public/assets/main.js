$(document).ready(function(){
  $('select').formSelect();

  $('.submit').on('click',function(event){
    event.preventDefault();

    let ings = [{name:"Cheese"}, {name:"Pasta Sauce"}, {name:"Rice"}];
  
    console.log(ings)
    $.get("/search/", ings).
    then(function(res){
      console.log(res)
      $('#results').append("<h1> " + res[0].name + "</h1>")
      $('#results').append("<h1> " + res[1].name + "</h1>")
      $('#results').append("<h1> " + res[2].name + "</h1>")
    })

  })
});