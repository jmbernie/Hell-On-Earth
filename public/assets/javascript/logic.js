$(document).ready(function(){

// Page transitions
$(document).ready(function(){
    $("#leaderboards-button").click(function(){
        $("#about-page").hide();
        $("#home-page").hide();
        $("#leaderboards-page").show();
      });
    $("#about-button").click(function(){
        $("#leaderboards-page").hide();
        $("#home-page").hide();
        $("#about-page").show();
      });
    $("#home-button").click(function(){
        $("#leaderboards-page").hide();
        $("#about-page").hide();
        $("#home-page").show();
      });
    });
  });

  window.onload = function() {
    $("#leaderboards-page").hide();
    $("#about-page").hide();
    $("#home-page").show();
  };

  
