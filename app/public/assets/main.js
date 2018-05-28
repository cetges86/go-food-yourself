$(document).ready(function(){
  $('select').formSelect();

  $('.submit').on('click',function(event){
    event.preventDefault();

    let ings = [{name:"Cheese"}, {name:"Bread"}, {name:"Butter"}];
  
    console.log(ings)
    $.get("/search/", ings).
    then(function(res){
      console.log(res)
      $('#results').append("<h1> " + res[0].name + "</h1>")
    })

  })
});