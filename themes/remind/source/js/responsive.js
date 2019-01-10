$(document).ready(function(){
  $(document).on('click', 'nav i.fa-bars', function(event){
    $('nav ul').toggleClass('visible');
    if ($('nav ul').hasClass('visible')) {
      $('document').not('nav ul').one('click', function(event){
        event.stopPropagation();
        $('nav ul').removeClass('visible');
      })
    }
  })
})