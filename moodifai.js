// Require the client
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'e296f73260094de3bfc3f26bb4661b7b'
});

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
  function(response) {
    for ( i = 0; i < response.outputs[0].data.concepts.length; i++ ) {
      console.log(response.outputs[0].data.concepts[i].name);
    }
  },

  function(err) {
    console.error(err);
  }
);

// Search
app.inputs.create([
  {url: "https://samples.clarifai.com/metro-north.jpg"},
  {url: "https://samples.clarifai.com/wedding.jpg"},
  {base64: "G7p3m95uAl..."}
]).then(
  function(response) {
    console.log(response);
  },
  function(err) {
    console.error(err);
  }
);