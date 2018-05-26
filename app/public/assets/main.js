$(document).ready(function(){
  $('select').formSelect();

  $('.submit').on('click',function(event){
    event.preventDefault();

    let ings = [{name:"Cheese"}, {name:"Bread"}, {name:"Butter"}];
  

    $.get("/", ings).
    done(function(data){
      console.log(data)
      $('#results').html("<p> " + data + "</p>")
    })

  })
});