$(document).ready(function(){
  $(document).on('click', 'nav i.fa-bars', function(event){
    $('nav ul').toggleClass('visible');
  })
})