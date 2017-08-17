// Require the client
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'e296f73260094de3bfc3f26bb4661b7b'
});

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'http://www.lifewithcats.tv/wp-content/uploads/2014/12/23BBF15800000578-0-image-m-45_1417705550165.jpg').then(
  function(response) {
    var concepts = response.outputs[0].data.concepts;

    for ( i = 0; i < concepts.length; i++ ) {
      console.log(concepts[i].name);
      console.log(concepts[i].value);
    }
  },

  function(err) {
    console.error(err);
  }

);

// Search index
app.inputs.create([
  {url: "https://samples.clarifai.com/metro-north.jpg"},
  {url: "https://samples.clarifai.com/wedding.jpg"},
  {url: "http://www.lifewithcats.tv/wp-content/uploads/2014/12/23BBF15800000578-0-image-m-45_1417705550165.jpg"},
  {url: "http://i.dailymail.co.uk/i/pix/2014/12/12/2400148900000578-2871954-Internet_sensation_The_green_moggy_has_become_hugely_popular_wit-a-41_1418413395813.jpg"},
  {base64: "G7p3m95uAl..."}
]).then(
  function(response) {
    // do something with response
  },
  function(err) {
    // there was an error
  }
);

// Search by concept
app.inputs.search({ concept: {name: 'cat'} }).then(
  function(response) {

    for ( i = 0; i < response.hits.length; i++ ) {
      var imageUrl = response.hits[i].input.data.image.url;
      console.log(imageUrl);
    }

  },

  function(err) {
    console.log("Error");
  }

);