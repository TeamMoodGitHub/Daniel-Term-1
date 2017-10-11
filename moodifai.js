// Add some jquery
// ----------------------------------------------
var $ = require('jquery');
// And some instafeed
// ----------------------------------------------
var Instafeed = require("instafeed.js");

// Require the client
// ----------------------------------------------
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
// ----------------------------------------------
const app = new Clarifai.App({
  apiKey: 'e296f73260094de3bfc3f26bb4661b7b'
});

// Get user input
// ----------------------------------------------
var button = document.getElementById("theButton");

// imageUrl = button.form.valueId.value;

$(document).ready(function() {
  $('#theButton').click(function() {

    // Define the input URL
    imageUrl = $('#formValueId').val();

    // Print the input
    console.log(imageUrl);
    // $('<div>'+imageUrl+'</div>').appendTo($('.results-card'));

    // Card states
    $('.results-card').removeClass('hidden').removeClass('slide-up');
    $('.color-palette').removeClass('hidden').removeClass('slide-up');
    $('.input').addClass('display-none');
    $('<img src="'+imageUrl+'"/>').appendTo($('.results-image'));

    // Try to run predict on the input
    app.models.predict("processing", [imageUrl]).then(
      function(response) {
        var concepts = response.outputs[0].data.concepts;

        // Loop render the results
        for ( i = 0; i < concepts.length; i++ ) {
          console.log(concepts[i].name);
          console.log(concepts[i].value);
          if ( concepts[i].value * 100 > .01 ) {
            $('<div class="result"><span class="result-name">'+concepts[i].name+': </span>'+concepts[i].value * 100+'</div>').appendTo($('.results'));
          } else {
            return false;
          }
        }
      },
      function(err) {
        // there was an error
      }
    );

    // Predict with colors model too
    app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", [imageUrl]).then(
      function(response) {
        console.log(response);
        var colors = response.outputs[0].data.colors;

        // Loop render the results
        for ( i = 0; i < colors.length; i++ ) {
          var colorHex = colors[i].w3c.hex;
          var colorName = colors[i].w3c.name;

          $('<div class="color-tile" style="background-color:'+colorHex+';">'+colorName+': '+colorHex+'</div>').appendTo($('.color-palette'));
        }
      },
      function(err) {
        // there was an error
      }
    );

  });
});

// https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/22159398_296986807447180_3520779404873564160_n.jpg